'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import MainPageHeader from '@/components/MainPageHeader/MainPageHeader';
import { rootPage } from '@/config/routes';

const AUTHORIZE_PATH = '/authorize';

export const McpConsentPage = () => {
  const searchParams = useSearchParams();

  const consentToken = searchParams.get('consent_token');
  const clientId = searchParams.get('client_id');
  const clientName = searchParams.get('client_name')?.trim();
  const redirectUri = searchParams.get('redirect_uri');
  const codeChallenge = searchParams.get('code_challenge');
  const scope = searchParams.get('scope');
  const state = searchParams.get('state');
  const resource = searchParams.get('resource');

  const isRequestValid = Boolean(
    consentToken && clientId && redirectUri && codeChallenge && scope,
  );

  return (
    <div className="flex h-dvh flex-col">
      <MainPageHeader />
      <div className="flex grow items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <h1 className="mb-5 mt-0 text-2xl font-bold">Connect AI assistant</h1>
          {isRequestValid ? (
            <form method="post" action={AUTHORIZE_PATH}>
              <p className="mb-4 text-sm text-zinc-600">
                <span className="font-semibold text-zinc-800">
                  {clientName || 'An application'}
                </span>{' '}
                asks for access to your MyWords account.
              </p>
              <ul className="mb-4 list-disc pl-5 text-sm text-zinc-600">
                <li>Read your native and target languages</li>
                <li>Add words and phrases to your dictionary</li>
              </ul>
              <p className="mb-5 break-all text-xs text-zinc-500">
                After you allow, the browser returns to {redirectUri}
              </p>

              <input type="hidden" name="client_id" value={clientId ?? ''} />
              <input
                type="hidden"
                name="redirect_uri"
                value={redirectUri ?? ''}
              />
              <input type="hidden" name="response_type" value="code" />
              <input
                type="hidden"
                name="code_challenge"
                value={codeChallenge ?? ''}
              />
              <input type="hidden" name="code_challenge_method" value="S256" />
              <input type="hidden" name="scope" value={scope ?? ''} />
              {state ? (
                <input type="hidden" name="state" value={state} />
              ) : null}
              {resource ? (
                <input type="hidden" name="resource" value={resource} />
              ) : null}
              <input
                type="hidden"
                name="consent_token"
                value={consentToken ?? ''}
              />

              <div className="flex gap-3">
                <Button
                  type="submit"
                  name="consent"
                  value="deny"
                  label="Deny"
                  outlined
                  className="w-full justify-center"
                />
                <Button
                  type="submit"
                  name="consent"
                  value="allow"
                  label="Allow"
                  className="w-full justify-center"
                />
              </div>
            </form>
          ) : (
            <div>
              <p className="mb-5 text-sm text-zinc-600">
                This authorization request is missing or has expired. Start the
                connection again from your AI assistant.
              </p>
              <Link
                href={rootPage.path}
                className="text-sm font-semibold underline"
              >
                Go to MyWords
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
