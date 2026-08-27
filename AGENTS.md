# Repository Guidelines

## Project Structure & Module Organization

This repository is the canonical source for personal Codex and Claude Code configuration. TypeScript utilities live in `src/`: `config.ts` defines paths and link specifications, `setup.ts` installs symbolic links with backups, and `doctor.ts` validates an installation. Global agent instructions are stored in `instructions/`. Each directory under `skills/` is a self-contained skill with a required `SKILL.md`; supporting templates and `agents/openai.yaml` belong beside that skill. Project metadata is in `package.json`, `bun.lock`, and `tsconfig.json`.

## Build, Test, and Development Commands

- `bun install` installs the pinned development dependencies.
- `bun run typecheck` runs strict TypeScript checking without emitting files.
- `bun run setup -- --dry-run` previews link creation and backup actions. Run this before applying configuration changes.
- `bun run setup -- --apply` installs the configured links into the user’s home directory.
- `bun run doctor` checks Bun, repository links, instruction imports, and skill metadata.

There is no build artifact; Bun executes the TypeScript sources directly.

## Coding Style & Naming Conventions

Follow the existing TypeScript style: two-space indentation, double quotes, semicolons, trailing commas, explicit return types for named functions, and `node:` imports. Keep ESM imports explicit, including the `.ts` extension for local modules. Preserve strict compiler guarantees; do not weaken `tsconfig.json` to bypass an error. Name source files and variables in lower camel case. Use kebab-case for skill directories, and make each `SKILL.md` frontmatter `name` exactly match its directory.

## Testing Guidelines

No automated test framework is configured. Treat `bun run typecheck` as the minimum code check. For setup or link changes, run the dry-run first and then `bun run doctor` in a configured environment. Add focused tests if logic becomes complex; use `*.test.ts` names and keep tests close to the relevant source or under a future `tests/` directory.

## Commit & Pull Request Guidelines

The current history uses Conventional Commit-style subjects, for example `chore: centralize agent configuration`. Continue with concise, imperative subjects such as `fix: restore conflicting link after failure`. Pull requests should explain the motivation and user-visible configuration impact, list validation commands run, and link relevant issues. Include terminal output when setup behavior changes; screenshots are unnecessary for CLI-only changes.

## Safety & Configuration Tips

Never commit credentials or machine-specific state. Review `git diff` after managing skills. Because `setup --apply` changes home-directory paths, verify its dry-run output and backup destination before applying it.
