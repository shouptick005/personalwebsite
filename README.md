# Personal website: Md Mahimul Hoque

One-page site for the personal brand: paid ads, tracking and attribution for UAE real estate. No Red Elevators branding (that site's old version is in git history at `Red Elevators/Website/index.html`).

Built with Next.js 16 (App Router), React 19 and TypeScript. The page is fully static (prerendered at build time); only the interactive parts run in the browser.

## Commands

Run these inside this folder:

| Command | What it does |
|---|---|
| `npm install` | Install packages (first time only) |
| `npm run dev` | Local preview with live reload at http://localhost:3000 |
| `npm run build` | Production build. Must finish with no errors before you publish |
| `npm start` | Serve the production build at http://localhost:3000 |
| `npm run lint` | ESLint (Next.js core web vitals + TypeScript rules) |
| `npm run typecheck` | TypeScript check only |

## Settings

Copy `.env.example` to `.env.local`, or set these in your host's dashboard:

- `NEXT_PUBLIC_SITE_URL`: the live address, for example `https://yourdomain.com`. Link previews (`og:image`) need it.
- `NEXT_PUBLIC_GTM_ID`: your Google Tag Manager container ID (`GTM-XXXXXXX`). GTM only loads when this is set.

## Files

| Path | What it is |
|---|---|
| `src/app/layout.tsx` | Page shell: font, SEO metadata, Open Graph, JSON-LD, GTM |
| `src/app/page.tsx` | Puts the sections in order |
| `src/app/globals.css` | All styles and colour tokens (`--black`, `--raised`, `--amber`, ...) |
| `src/components/` | One file per section (see below) |
| `src/lib/site.ts` | Contact details: WhatsApp number, email, LinkedIn |
| `src/lib/tracking.ts` | Typed `dataLayer` events and the `track()` helper |
| `public/assets/` | Images: hero background, portrait, work samples, OG image, favicon |
| `legacy/index.html` | The previous single-file version, kept for reference. Safe to delete |

## Sections (components)

1. `Header`: sticky bar, gains a border once you scroll
2. `Hero` with `TraceBlock`: the "Typical setup / After my fix" trail (ad click, WhatsApp reply, closed deal)
3. `ResultsLedger`: results from real accounts (only numbers already used on LinkedIn and Upwork)
4. `WorkGallery`: 6 post cards, prev/next buttons, click to enlarge
5. `SelfCheck`: 5 questions, shows where the visitor's tracking breaks. The result is passed to the form
6. `ServicesLadder`: teardown, tracking build, ads management, agencies
7. `AboutSection`
8. `TeardownForm`: opens WhatsApp (or email) with the details filled in. Nothing is stored
9. `Footer`

To change copy, edit the text in the matching component. Lists (results, work samples, questions, prices) are arrays at the top of each file.

## Tracking already built in

The page pushes these events to `window.dataLayer`: `whatsapp_click`, `email_click`, `linkedin_click` (each with `link_location`), `teardown_submit` (with `method` and `ad_spend`), `self_check_complete` (with `break_stage` and `yes_count`). Set `NEXT_PUBLIC_GTM_ID`, then send the events to GA4, Meta and Google Ads in GTM.

## Publish

Easiest: import the repo into Vercel (set the root directory to `Personal brand/Website` and add the two settings above). Netlify and Cloudflare Pages also run Next.js. Image optimisation needs a Next.js-capable host, so a plain static host (GitHub Pages) would need `output: "export"` and `images.unoptimized` in `next.config.ts`.
