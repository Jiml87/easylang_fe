'use client';

import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputSwitch } from 'primereact/inputswitch';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { TabPanel, TabView } from 'primereact/tabview';
import { twMerge } from 'tailwind-merge';

import {
  AGENT_INSTRUCTIONS_MAX_LENGTH,
  useClearAgentMemoriesMutation,
  useDeleteAgentMemoryMutation,
  useGetAgentMemoriesQuery,
  useGetAgentSettingsQuery,
  useUpdateAgentSettingsMutation,
} from '@/api/queries/chatQueries';
import { LANG_BY_CODE } from '@/constants/langs';
import { selectNativeLanguage } from '@/features/InitProfilePage/userProfileSlice';
import { useAppSelector } from '@/store/hooks';

interface AgentSettingsDialogProps {
  visible: boolean;
  onHide: () => void;
}

const Loader = () => (
  <div className="flex justify-center py-8">
    <ProgressSpinner
      style={{ width: '32px', height: '32px' }}
      strokeWidth="4"
    />
  </div>
);

const InstructionsTab = ({ visible }: { visible: boolean }) => {
  const { data: settings, isLoading } = useGetAgentSettingsQuery(undefined, {
    skip: !visible,
  });
  const [updateSettings, { isLoading: isSaving }] =
    useUpdateAgentSettingsMutation();
  const nativeLanguage = useAppSelector(selectNativeLanguage);
  const [draft, setDraft] = useState('');
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (settings && !initialized) {
      setDraft(settings.instructions ?? '');
      setInitialized(true);
    }
  }, [settings, initialized]);

  if (isLoading) {
    return <Loader />;
  }

  const explanationLanguage = nativeLanguage
    ? LANG_BY_CODE[nativeLanguage]
    : 'English';
  const saved = settings?.instructions ?? '';
  const isDirty = draft.trim() !== saved;

  return (
    <div className="flex flex-col gap-3">
      <p className="m-0 text-sm text-slate-500">
        Tell the assistant how to respond: language of explanations, level,
        tone, format.
      </p>
      <InputTextarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        maxLength={AGENT_INSTRUCTIONS_MAX_LENGTH}
        rows={8}
        autoResize={false}
        placeholder={`For example: explain in ${explanationLanguage}, keep answers short, give two examples for each word.`}
        className="w-full text-base"
      />
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-slate-400">
          {draft.length}/{AGENT_INSTRUCTIONS_MAX_LENGTH}
        </span>
        <Button
          label="Save"
          size="small"
          loading={isSaving}
          disabled={!isDirty}
          onClick={() => updateSettings({ instructions: draft })}
        />
      </div>
    </div>
  );
};

const MemoryTab = ({ visible }: { visible: boolean }) => {
  const { data: settings, isLoading: isSettingsLoading } =
    useGetAgentSettingsQuery(undefined, { skip: !visible });
  const { data: memories = [], isLoading: isMemoriesLoading } =
    useGetAgentMemoriesQuery(undefined, {
      skip: !visible,
      refetchOnMountOrArgChange: true,
    });
  const [updateSettings, { isLoading: isToggling }] =
    useUpdateAgentSettingsMutation();
  const [deleteMemory] = useDeleteAgentMemoryMutation();
  const [clearMemories, { isLoading: isClearing }] =
    useClearAgentMemoriesMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmingClear, setConfirmingClear] = useState(false);

  if (isSettingsLoading || isMemoriesLoading) {
    return <Loader />;
  }

  const memoryEnabled = settings?.memoryEnabled ?? true;

  const handleDelete = async (memoryId: string) => {
    setDeletingId(memoryId);
    try {
      await deleteMemory(memoryId).unwrap();
    } catch {
    } finally {
      setDeletingId(null);
    }
  };

  const handleClear = async () => {
    try {
      await clearMemories().unwrap();
    } catch {
    } finally {
      setConfirmingClear(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-3 py-2.5">
        <span className="flex flex-col">
          <span className="text-sm font-medium text-slate-800">Use memory</span>
          <span className="text-xs text-slate-500">
            The assistant remembers facts about you between chats.
          </span>
        </span>
        <InputSwitch
          className="shrink-0"
          checked={memoryEnabled}
          disabled={isToggling}
          onChange={(event) =>
            updateSettings({ memoryEnabled: Boolean(event.value) })
          }
        />
      </label>

      {memories.length === 0 ? (
        <p className="m-0 py-4 text-center text-sm text-slate-400">
          Nothing remembered yet
        </p>
      ) : (
        <ul className="m-0 flex max-h-72 list-none flex-col gap-1 overflow-y-auto p-0">
          {memories.map((memory) => (
            <li
              key={memory.id}
              className={twMerge(
                'flex items-start justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2',
                deletingId === memory.id && 'opacity-50',
              )}
            >
              <span className="flex min-w-0 flex-col">
                <span className="break-words text-sm text-slate-800">
                  {memory.content}
                </span>
                <span className="text-xs text-slate-400">
                  {memory.category}
                </span>
              </span>
              <button
                type="button"
                aria-label="Delete memory"
                disabled={deletingId === memory.id}
                onClick={() => handleDelete(memory.id)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200/70 hover:text-red-600"
              >
                <i className="pi pi-trash text-xs" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {memories.length > 0 &&
        (confirmingClear ? (
          <div className="flex flex-wrap items-center justify-end gap-2">
            <span className="grow text-sm text-slate-600">
              Delete all memories?
            </span>
            <Button
              label="Cancel"
              size="small"
              text
              onClick={() => setConfirmingClear(false)}
            />
            <Button
              label="Clear"
              size="small"
              severity="danger"
              loading={isClearing}
              onClick={handleClear}
            />
          </div>
        ) : (
          <div className="flex justify-end">
            <Button
              label="Clear memory"
              icon="pi pi-trash"
              size="small"
              severity="danger"
              outlined
              onClick={() => setConfirmingClear(true)}
            />
          </div>
        ))}
    </div>
  );
};

export const AgentSettingsDialog = ({
  visible,
  onHide,
}: AgentSettingsDialogProps) => {
  return (
    <Dialog
      header="Settings"
      visible={visible}
      onHide={onHide}
      draggable={false}
      breakpoints={{ '10000px': '520px', '641px': '95vw' }}
      contentClassName="px-3 sm:px-6"
    >
      <TabView panelContainerClassName="px-0 pb-0">
        <TabPanel header="Instructions">
          <InstructionsTab visible={visible} />
        </TabPanel>
        <TabPanel header="Memory">
          <MemoryTab visible={visible} />
        </TabPanel>
      </TabView>
    </Dialog>
  );
};
