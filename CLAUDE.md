# CLAUDE.md

Expo (SDK 54) + TypeScript (strict) + Supabase mobile app. Uses Bun, Biome (not ESLint), expo-router, NativeWind 4, React Native Reusables (shadcn).

## Commands

```
bun install | bun run start | bun run ios | bun run android | bun run web
bun run lint | bun run lint:fix | bun run format | bunx tsc --noEmit
supabase start | supabase stop | supabase db reset | supabase migration new <name>
```

## Architecture

```
app/                        # Routes only — thin, no logic
features/
  infra/                    # Shared infra (flat files, no barrel)
    supabase.ts
    env.ts                  # Zod-validated env, parsed at startup
  <feature>/
    schemas.ts              # Zod schemas
    types.ts                # TS types (inferred from schemas + others)
    store.ts                # Zustand store (state + actions)
    components/             # One component per file
    index.ts                # Barrel — re-exports public API
supabase/                   # Config + migrations
assets/                     # Images + fonts
```

## Rules

- Import features via barrel: `import { X } from "~/features/meals"` — never internal paths
- Import infra directly: `import { supabase } from "~/features/infra/supabase"`
- `~/*` alias maps to project root (not `@`)
- Biome: tabs, double quotes
- Env vars prefixed `EXPO_PUBLIC_*`, stored in `.env.local`
- Platform-specific: `.ios.tsx` / `.android.tsx` / `.web.ts`
- `app/` routes only compose feature components
- Dependency flow: `app/` → `features/*/components` → `store + schemas + types` → `infra/*`
- Zustand stores: state at top, actions nested under `actions` key
- Export selector hooks per slice: `useUser()`, `useSession()`, `useAuthActions()` — not raw `useStore(s => …)`
