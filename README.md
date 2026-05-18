# Expo Supa Wind

Mobile app built with Expo (React Native), TypeScript, and Supabase.

## Setup

```bash
bun install                       # Install dependencies
cp .env.example .env.local  			# Configure environment variables
supabase start                    # Start local Supabase (requires Docker)
bun run start                     # Start Expo dev server
```

## Architecture

```
app/                        # Routes only (Expo Router, file-based)
features/                   # Everything else, by feature
  infra/                    # Shared infrastructure (flat files, no fixed structure)
  <feature>/                # Self-contained vertical slice
    schemas.ts              #   Zod validation schemas
    types.ts                #   TypeScript types
    hooks/                  #   One hook per file
    components/             #   One component per file
    index.ts                #   Re-exports public API
supabase/                   # Config and migrations
assets/                     # Static images and fonts
```

Each feature folder is self-contained. Adding a new feature means adding a new folder — no changes to existing code.

## Commands

| Command             | Description                         |
| ------------------- | ----------------------------------- |
| `bun run start`     | Start Expo dev server               |
| `bun run ios`       | Run on iOS simulator                |
| `bun run android`   | Run on Android emulator             |
| `bun run web`       | Run web version                     |
| `bun run lint`      | Check linting and formatting        |
| `bun run lint:fix`  | Auto-fix lint and format issues     |
| `bunx tsc --noEmit` | Type-check                          |
| `supabase start`    | Start local Supabase                |
| `supabase db reset` | Reset database and rerun migrations |

## Troubleshooting

### Supabase + Colima: `failed to start docker container`

If `supabase start` fails with:

```
failed to start docker container: Error response from daemon: error while creating mount source path
'.../.colima/default/docker.sock': mkdir ...docker.sock: operation not supported
```

This is a known Colima issue with `virtiofs` mounts ([colima#997](https://github.com/abiosoft/colima/issues/997)). Fix by using `sshfs` with write access:

```bash
colima stop
colima delete
colima start --vm-type vz --mount-type sshfs --mount "~:w"
supabase start
```

If you see a follow-up `chown ... permission denied` error, the `--mount "~:w"` flag is the key part — it grants the VM write access to your home directory.
