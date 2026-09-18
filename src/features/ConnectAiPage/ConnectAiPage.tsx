'use client';
import { useMemo } from 'react';
import { Button } from 'primereact/button';

import { useAppDispatch } from '@/store/hooks';
import {
  addErrorMessage,
  addSuccessMessage,
} from '@/features/MessagesBar/messagesBarSlice';

function getMcpServerUrl() {
  if (typeof window === 'undefined') {
    return 'https://mywords.pro/mcp';
  }
  return `${window.location.origin}/mcp`;
}

async function copyText(text: string) {
  await navigator.clipboard.writeText(text);
}

const ConnectAiPage = () => {
  const dispatch = useAppDispatch();
  const mcpUrl = useMemo(() => getMcpServerUrl(), []);

  const handleCopy = async (value: string, detail: string) => {
    try {
      await copyText(value);
      dispatch(addSuccessMessage({ detail }));
    } catch {
      dispatch(
        addErrorMessage({
          detail: 'Could not copy. Select and copy manually.',
        }),
      );
    }
  };

  return (
    <div className="flex grow flex-col overflow-y-auto p-5 pb-8">
      <h1 className="mt-0">Connect AI</h1>
      <p className="mb-4 text-sm text-zinc-600">
        Add the MyWords MCP server in ChatGPT, Claude, or Gemini. The assistant
        will open Google sign-in in the browser and then can add words to your
        dictionary.
      </p>

      <h2 className="text-lg">MCP server URL</h2>
      <div className="mb-4 flex items-center gap-2">
        <code className="block flex-1 overflow-x-auto rounded-md bg-zinc-100 px-3 py-2 text-sm">
          {mcpUrl}
        </code>
        <Button
          type="button"
          icon="pi pi-copy"
          rounded
          text
          aria-label="Copy URL"
          onClick={() => handleCopy(mcpUrl, 'URL copied')}
        />
      </div>

      <h2 className="text-lg">ChatGPT</h2>
      <p className="mb-4 text-sm text-zinc-600">
        Settings → Connectors → add a custom connector with this URL. Sign in
        with Google when asked.
      </p>

      <h2 className="text-lg">Claude</h2>
      <p className="mb-4 text-sm text-zinc-600">
        Add a custom connector to this URL. Claude will register itself and
        redirect you to Google login.
      </p>

      <h2 className="text-lg">Gemini</h2>
      <p className="text-sm text-zinc-600">
        Add this MCP server URL. Gemini will use the same Google login as the
        MyWords website.
      </p>
    </div>
  );
};

export default ConnectAiPage;
