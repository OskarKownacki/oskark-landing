# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml` / `pnpm-workspace.yaml`) — use `pnpm`, not `npm`/`yarn`.

```bash
pnpm dev      # next dev (Turbopack), http://localhost:3000
pnpm build    # next build
pnpm start    # serve production build
pnpm lint     # eslint
```

There is no test suite/framework configured in this repo.

## Project overview

Personal portfolio/landing site ("Campfire") built with Next.js App Router, React 19, and Tailwind v4. It implements a dark-first design system whose emotional concept is a mountain campsite at night; the light theme ("dawn") is the same layout with sunrise/sunset transitions.

## Architecture

### Routes are still being assembled — check before assuming which is "the" homepage

- `app/page.tsx` — still the stock `create-next-app` boilerplate, not yet replaced.
- `app/landing/page.tsx` — the actual Campfire hero (`MountainScene`), in progress.
- `app/mockup/page.tsx` — a living component sheet at `/mockup` for visually checking every design-system primitive (typography, buttons, chips, input, cards, code block) together; update it when adding/changing a component.

### Design tokens flow: CSS custom properties → Tailwind v4 `@theme inline`

`app/globals.css` imports, in order: `app/styles/campfire-colors.css`, `campfire-typography.css`, `campfire-layout.css`, `shadcn-theme.css`, then `tw-animate-css` and `shadcn/tailwind.css`. Tokens (colors, spacing `--space-1…12`, radii, shadows, easing) are defined as CSS vars in those files and re-exposed to Tailwind via `@theme inline` in `globals.css`, which is what makes utilities like `bg-surface`, `text-accent`, `p-c5`, `shadow-glow`, `font-display` work. Anything not mapped as a Tailwind utility is used as an arbitrary value, e.g. `text-[var(--color-text-muted)]`.

**Never hardcode hex colors in components** — always go through a token, otherwise the light theme will drift out of sync with dark.

Fonts (Instrument Serif / Manrope / IBM Plex Mono) are loaded via `next/font/google` in `app/layout.tsx` and exposed as `--font-display-loaded` etc.; `globals.css` points the token names (`--font-display`, `--font-body`, `--font-mono`) at those loaded variables rather than the literal Google Fonts names.

### Theming

Theme is `data-theme="dark" | "light"` on `<html>`, set in `app/layout.tsx` (dark by default). `components/ThemeToggle.tsx` exports the `useTheme()` hook, which reads/writes `localStorage["campfire-theme"]` and syncs `document.documentElement.dataset.theme`.

### `design-handoff/` is a reference package, not app code

It's excluded from `tsconfig.json` and isn't imported by the app. It contains the original design handoff (`design-handoff/README.md`) with the full token spec, component specs (button/card/chip/input/code block states), copy/tone rules, and accessibility contrast requirements, plus an HTML/CSS prototype to compare against. Two exceptions are meant to be used close to verbatim rather than reimplemented: `tokens/*.css` (source of truth for token values) and `next/components/MountainScene.tsx` (hero scene with hand-traced SVG ridgelines). Consult this README before adding or changing any design-system component or token value.

### Path aliases & shadcn

`@/*` maps to the repo root (`tsconfig.json`). `components.json` configures shadcn (style `radix-sera`, base color `neutral`, icon library `lucide`) with aliases `@/components`, `@/components/ui`, `@/lib`, `@/hooks` — `components/ui` and `hooks/` don't exist yet; they're where shadcn-generated primitives would land if added via the `shadcn` CLI. Hand-written design-system components currently live flat in `components/` (`Button.tsx`, `Card.tsx`, `Chip.tsx`, `CodeBlock.tsx`, `Input.tsx`, `MountainScene.tsx`, `ThemeToggle.tsx`).

`lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — use it instead of manual class string concatenation.

### Language

UI copy is in Polish (`<html lang="pl">`). Design-handoff docs are also in Polish. Tone rules (see `design-handoff/README.md` "Copy & tone"): write like talking to someone at the same campfire — first person, short sentences, no corporate/enterprise language.
