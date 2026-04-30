# AGENTS.md

## Project Purpose

This project is a pure frontend, Vercel-friendly static website for foreigners who need help understanding and planning health checks in China.

The business focus is **foreigners' China health check consultation**, especially:

- China visa / residence permit medical checks
- Work visa and foreign teacher health check planning
- International student health check guidance
- Private full body checkups for self-pay visitors
- English report support, report translation, and follow-up routing

The site should not look like a broad medical tourism agency or a doctor marketplace. It should feel like a clear, trustworthy, professional consultation landing site.

## Target Users

Strong-demand users from research:

- Foreign teachers and work visa applicants
- International students
- Expat employees already in China
- Short-term self-pay visitors who want a full body checkup
- 40+ US / European users comparing preventive screening costs

Core cities for now:

- Guangzhou
- Shenzhen
- Shanghai

Do not expand to many cities unless explicitly requested. Do not reintroduce city filtering as the main UX.

## Core Pain Points

The website should repeatedly answer these pains in plain English:

- Official visa / residence health checks are often confused with private full body checkups.
- Overseas health reports may still be rejected or require China re-check / verification.
- Foreigners need English communication support for booking, registration, payment, report pickup, and follow-up.
- Users want transparent options before paying for a package.
- Many reports are Chinese-only and need translation or organization.
- Abnormal flags need a next-step route, but the service must not diagnose.

## Positioning

Use this positioning:

> We help foreigners understand the right China health check path before booking, then support consultation, appointment planning, English communication, report organization, and follow-up routing.

Avoid these claims:

- Do not promise visa approval or residence permit approval.
- Do not claim to provide diagnosis or treatment.
- Do not overpromise "cheap China medical care".
- Do not imply official government affiliation.
- Do not position as a heavy medical tourism or surgery coordination service.

Required disclaimer theme:

> Information and coordination only. Not medical advice, diagnosis, treatment, or a guarantee of visa or residence outcomes.

## Current UX Strategy

The site is not a service/person marketplace.

Do not build:

- Choose-a-companion flow
- Doctor/escort person profiles as the main product
- Service filters
- City filters
- Complex dashboards

Build and preserve:

- SEO landing page
- Clear services explanation
- Consultation form
- News/guides for SEO
- Lightweight static pages
- Mobile-first layout

Primary conversion action:

- User leaves information through the consultation form or opens Email / WhatsApp.

Consultation form should collect:

- Name
- Target city: Guangzhou, Shenzhen, Shanghai
- User profile
- Checkup purpose
- Arrival or target date
- Email / WhatsApp
- Question

Do not request sensitive medical records in the first contact.

## News / SEO Architecture

News articles are maintained from one static data source:

- `src/data/news.js`

Avoid one article per Vue file. Add articles to the static news database instead.

The build script:

- `scripts/generate-static-seo.mjs`

Generates crawlable static HTML after Vite build:

- `/news/index.html`
- `/news/<slug>/index.html`
- `/services/index.html`
- `/sitemap.xml`
- `/robots.txt`

Build command:

```bash
npm run build
```

The current `package.json` build script runs:

```bash
vite build && node scripts/generate-static-seo.mjs
```

For production, set:

```bash
VITE_SITE_URL=https://your-domain.com
```

If not set, sitemap uses `https://example.com`.

## SEO Keyword Themes

Use natural, non-spammy phrasing around:

- China health check for foreigners
- China visa medical check
- China residence permit health check
- China work visa medical exam
- foreign teacher medical check China
- international student health check China
- full body checkup China foreigners
- Guangzhou health check foreigners
- Shenzhen full body checkup foreigners
- Shanghai health check foreigners
- China medical report translation
- English report health check China

Good article topics:

- Visa medical check vs private full body checkup
- Overseas report acceptance / re-check risk
- Guangzhou health check checklist
- Shenzhen full body checkup planning
- Shanghai residence health check timing
- English reports and report translation
- What to ask before buying an executive checkup package
- What to do after abnormal health check flags

## Visual Direction

The current visual system is:

- Deep medical green: `#0F5F4C`
- Dark ink green: `#17342D`
- Warm gold: `#D8B76A`
- Soft off-white: `#F8FAF8`
- Pale green surfaces: `#EEF7F2`

Tone:

- Premium but restrained
- Professional and trustworthy
- International medical coordination
- Not flashy, not generic SaaS, not tourism-brochure style

Current project-native visual assets:

- `src/assets/svg/logo.svg`
- `public/favicon.svg`
- `public/images/banner-home.svg`
- `public/images/banner-services.svg`
- `public/images/banner-news.svg`

These assets are lightweight SVGs and should remain stylistically consistent. If AI-generated raster images become available later, keep the same palette and restrained medical-consultation direction.

## Important Files

- `src/pages/HomePage.vue` - homepage landing page
- `src/pages/CompanionsList.vue` - services/consultation page, despite legacy name
- `src/pages/NewsList.vue` - news index
- `src/pages/NewsArticle.vue` - news article route
- `src/components/ConsultationForm.vue` - main lead capture form
- `src/components/UserStories.vue` - homepage user stories
- `src/components/HeroSection.vue` - homepage hero
- `src/components/Header.vue` - navigation
- `src/data/news.js` - static news database
- `scripts/generate-static-seo.mjs` - static SEO page generator
- `useMockData.js` - legacy-named service content source

The `companions` naming is legacy. It currently represents service/consultation plans, not actual companions.

## Research Source Artifacts

Research outputs live under:

- `doc/foreigners_china_medical_research.xlsx`
- `doc/china_medical_checkup_feasibility_report.docx`
- `doc/research_sources.json`

Research conclusion:

The best initial wedge is:

> Foreigners' China health check / visa medical check navigation plus English consultation, booking support, report translation, and follow-up routing.

Do not pivot to heavy treatment or surgery medical tourism without new explicit direction.

## Technical Notes

Stack:

- Vue 3
- Vite
- vue-router
- vue-i18n
- Tailwind CSS
- Font Awesome icons, imported selectively

Keep bundle small:

- Do not import the whole Font Awesome `fas` pack.
- Use static SVG assets where possible.
- Keep news content in `src/data/news.js`.
- Avoid adding heavy UI libraries or CMS dependencies unless explicitly requested.

Vercel setup:

- Build command: `npm run build`
- Output directory: `dist`

## Development Guidelines

When editing:

- Keep mobile-first layout.
- Keep text readable and conversion-oriented.
- Use concrete user pain points from research.
- Make consultation the main action.
- Maintain disclaimers and privacy-sensitive wording.
- Keep pages crawlable via the static SEO generator.

Before finishing:

- Run `npm run build`.
- Check generated `dist/news/*/index.html`, `dist/services/index.html`, `dist/sitemap.xml`, and `dist/robots.txt`.
- If adding news, confirm sitemap includes the new slug.

