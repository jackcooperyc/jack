# Jack Cooper — Portfolio

Personal portfolio for Jack Cooper, startup founder and full-stack product
builder in Missoula, Montana. Built with the Next.js App Router, TypeScript, and
Tailwind CSS v4. Static-friendly and ready for Vercel.

## Stack

- **Next.js 16** (App Router) — all routes prerender as static HTML
- **TypeScript** (strict)
- **Tailwind CSS v4** (`@tailwindcss/postcss`) with CSS-variable design tokens
- Fonts: Cabinet Grotesk (display) + General Sans (body) via Fontshare,
  JetBrains Mono (technical metadata) via Google Fonts
- No backend, no client data fetching, lean dependency set

## Commands

```bash
npm run dev        # local dev
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint (flat config)
npm run typecheck  # tsc --noEmit
```

## Routes

| Route            | Description                                      |
| ---------------- | ------------------------------------------------ |
| `/`              | Home — leads with selected work, not biography   |
| `/work`          | Work index (all five projects)                   |
| `/work/[slug]`   | Reusable case-study route (SSG per project)      |
| `/about`         | Approach + short bio + contact                   |
| `sitemap.xml`    | Generated from the project list                  |
| `robots.txt`     | Generated                                        |

Person JSON-LD is injected in the root layout. Metadata + Open Graph are set per
route.

## Editing content — the important part

All content is centralized and typed. **Page layouts never need to change to add
or edit a project.**

- `src/data/site.ts` — name, role, nav, email, GitHub, tagline.
- `src/data/projects.ts` — the case studies. Each `Project` is typed.

### Add a new project

1. Append a `Project` object to the `projects` array in `src/data/projects.ts`.
2. Fill the five narrative `sections` in order: **Context, Problem, System,
   Decisions, Current state**. This order is a convention — keep it.
3. Set `status` (`"In development"`, `"Live / in use"`, or `"Prototype"`),
   `year`, `role`, `domain`, and `stack`.
4. Set `frame` to one of `compliance | journal | events | vineyard | generic`
   to pick the abstract interface diagram. Add a new frame in
   `src/components/InterfaceFrame.tsx` if none fit.
5. Optionally add a `systemMap` (array of `{ label, detail }`) for the sidebar
   diagram.
6. Set `featured: true` to surface it on the home page.

The new route (`/work/<slug>`), the work index entry, and the sitemap update
automatically.

### Content rules (keep these)

- **Never fabricate quantified outcomes**, users, or client logos.
- Label in-development work as such (the status pill does this).
- Where implementation details aren't known (e.g. BudBeat, Matchbox), keep
  claims high-level rather than inventing them. The `frame: "generic"` +
  dashed-border system-map placeholder are designed for this case.
- Brand voice: direct, smart, grounded. Avoid hype words (revolutionize,
  game-changing, seamless, robust, cutting-edge, empower).
- `CŪPR.OS` is always written with the Ū (U+016A).

## Design system

Tokens live in `src/app/globals.css` under `@theme` and the `:root` / `.dark`
blocks. One neutral warm-paper palette plus a single earned accent (signal
amber). Light/dark mode via a `.dark` class on `<html>`, set before paint to
avoid flash and toggled by `ThemeToggle`. `prefers-reduced-motion` is respected
globally.

Visuals are drawn diagrams and interface abstractions (`InterfaceFrame`,
`SystemMap`) — no stock photography and no fabricated screenshots.

## Deploy

Static-friendly; deploy to Vercel with no configuration. No environment
variables or backend required for v1.
