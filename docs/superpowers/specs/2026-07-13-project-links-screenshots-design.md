# Project links, deployments & screenshots

**Date:** 2026-07-13  
**Status:** Approved for planning  
**Scope:** Wire GitHub + branded Vercel (`*.cupr.app`) links and real in-app UI screenshots for all six portfolio projects below (five existing + Smokeworks Infrastructure).

## Goal

Visitors can open each project's live deployment and GitHub from the portfolio, and see a real product UI when an image exists — without inventing screenshots or breaking the current schematic fallback.

## Decisions (locked)

| Topic | Choice |
| --- | --- |
| Scope | All five existing projects + new Infrastructure entry |
| Live hosts | Branded `*.cupr.app` URLs listed below |
| GitHub | All projects → `https://github.com/jackcooperyc` for now |
| Screenshots | Capture public UIs; Jack supplies auth/special states |
| Visual treatment | **Replace** schematic when `screenshot` is set; schematic otherwise |
| Infrastructure depth | Lighter case study (short narrative, not a deep write-up) |
| Approach | Content-first: extend `Project` data; small shared UI |

## Live URLs

| Project | `liveUrl` |
| --- | --- |
| CŪPR.OS | `https://os-demo.cupr.app` |
| BudBook | `https://budbook.cupr.app` |
| Vineyard Platform | `https://cev.cupr.app` |
| BudBeat | `https://budbeat.cupr.app` |
| Matchbox | `https://matchbox.cupr.app` |
| Cupr Smokeworks Infrastructure | `https://maps.cupr.app` |

## Data model

Extend `Project` in `src/data/projects.ts`:

```ts
githubUrl?: string;
liveUrl?: string; // already exists
screenshot?: { src: string; alt: string };
```

- Pages and components continue to read only from this file.
- Omit `screenshot` when no honest image is available yet (schematic remains).
- Asset paths: `/work/<slug>/ui.webp` (or `.png` if capture requires it), files under `public/work/<slug>/`.

## UI behavior

1. **`InterfaceFrame`** — If `project.screenshot` is set, render that image inside the existing chrome (browser bar + rounded frame). Otherwise keep the current abstract schematic for `frame`.
2. **Caption** — Case-study pages currently say “Schematic interface abstraction — not a product screenshot.” Show that only when the schematic is active.
3. **Link group** — Shared control rendering Live and/or GitHub when URLs exist (labels like “Visit live app ↗” / “GitHub ↗”), matching existing link styles. Use on:
   - `WorkRow` actions
   - Case-study header (replace lone live button)
   - Expandable `CaseNarrative` footer if it already exposes live links
4. **No new card chrome** — Stay within current typography, borders, and accents.

## New project: Cupr Smokeworks Infrastructure

- **Slug:** `cupr-smokeworks-infrastructure`
- **Featured:** `false` (appears on `/work`, not home selected-work strip unless later promoted)
- **Frame:** `generic` until a screenshot lands
- **Focus:** JCS Ecosystem maps at `maps.cupr.app` as the primary live surface
- **Narrative:** Short context → problem → system → decisions → current state; honest, no invented metrics
- Sitemap / `generateStaticParams` pick it up via the existing `projects` array

## Assets & capture workflow

1. Attempt desktop captures of publicly reachable deploys listed above.
2. Prefer in-app UI over marketing-only splash when the app shows real UI without auth.
3. If auth-walled, empty, or inaccurate: leave `screenshot` unset; document for Jack to supply later.
4. Update README “add a project” docs for `liveUrl`, `githubUrl`, and `screenshot`.
5. Keep `scripts/build-preview-html.mjs` / `preview/` in sync for links and screenshot/schematic behavior where it mirrors app content.

## Out of scope

- Per-project public GitHub repos (org profile only for now)
- Multi-image galleries
- Deep Infrastructure case study rewrite
- Changing overall visual identity / theme system
- Fabricating UI imagery

## Success criteria

- Every listed project has `liveUrl` + `githubUrl` in data and visible link affordances where those fields are set.
- Where a screenshot file exists and is referenced, it replaces the schematic on work rows and case studies.
- Missing screenshots degrade cleanly to schematics.
- New Infrastructure project is reachable at `/work/cupr-smokeworks-infrastructure` with maps live link.
- `npm run typecheck` and `npm run build` succeed.
