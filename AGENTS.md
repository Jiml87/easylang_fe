<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# frontend application easylang_fe (MyWords)

Spaced-repetition frontend: users add a word/phrase and review it on days 1, 3, 7, and 30. Product site: https://mywords.pro. Package manager is Yarn. Node >= 20.9.

## Commands

```bash
yarn dev
yarn lint
yarn format
yarn typecheck
yarn build
```

Do not add npm/pnpm lockfiles. Do not commit unless asked.

## Product constraints

- Add Word (`/myapp/add-word`) must stay fast. Do not add blocking work, large client bundles, or extra round-trips on that page.
- Always check the mobile layout. Primary UI is a phone-sized PWA.

## Layout

- `src/app/` — App Router pages. Keep them thin wrappers; put UI in `src/features/`.
- `src/features/` — page features, colocated slices and CSS.
- `src/components/` — shared UI.
- `src/api/` — axios instance and RTK Query APIs. Browser calls `/api/...`; Next rewrites to `API_HOST`.
- `src/store/` — Redux store. Use `useAppDispatch` / `useAppSelector` from `src/store/hooks.ts`.
- `src/config/routes.ts` — path constants. Use these instead of hardcoded strings.
- `src/proxy.ts` — Next.js request proxy (not `middleware.ts`). Matcher is `/myapp/:path*`; it sets `x-current-path`.
- Auth redirects live in `src/app/actions.ts` (`getAuthInfo`). `/myapp/*` is private.

## Stack conventions

- TypeScript, path alias `@/*` → `src/*`.
- PrimeReact for most controls, Tailwind for layout. Merge classes with `twMerge`. NextUI is already in the project; do not add another UI kit.
- Forms: `react-final-form` plus existing fields in `src/components/Form*`.
- Mutations: RTK `createAsyncThunk` + axios, then toast via `addSuccessMessage` / `addErrorMessage` from `messagesBarSlice`. List reads for dictionary tabs: RTK Query in `src/api/queries/wordQueries.ts`.
- Client pages that need hooks/state: `'use client'`. Server actions stay in `src/app/actions.ts`.

## Code style

- Match neighboring files. Do not add libraries unless asked.
- Do not add comments to code.
- Biome: single quotes, semicolons, trailing commas, 2-space indent.
- After UI changes, exercise the flow in the browser (desktop and a mobile viewport). A screenshot is not enough.
