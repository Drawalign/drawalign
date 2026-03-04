# Strapi + Next.js Page Builder Boilerplate

Boilerplate for building a website with a Strapi headless CMS and a Next.js App Router frontend. Pages are composed of configurable blocks managed from the Strapi admin.

## Stack

- **CMS**: Strapi 5 (SQLite in dev, PostgreSQL-compatible in prod)
- **Frontend**: Next.js 16 (App Router, TypeScript, Tailwind CSS 4)
- **UI components**: Shadcn/ui (Radix UI + Tailwind)
- **Available blocks**: Hero, Text, CTA, Image, Accordion, Cards

---

## Getting Started

### Prerequisites

- Node.js >= 20

### 1. Start Strapi

```bash
cd strapi
npm install
npm run dev
```

The Strapi admin is available at [http://localhost:1337/admin](http://localhost:1337/admin).

### 2. Start the frontend

```bash
cd frontend
pnpm install
pnpm dev
```

The frontend is available at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_STRAPI_URL` | URL of the Strapi instance | `http://localhost:1337` |
| `REVALIDATE_SECRET` | Shared secret for cache revalidation webhook | `a-strong-secret` |
| `STRAPI_API_TOKEN` | Strapi API token (optional — required if the Public role has restricted access) | `abc123` |
| `PREVIEW_SECRET` | Shared secret for Strapi Draft Mode preview (must match `strapi/.env`) | `a-strong-secret` |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the frontend (used for sitemap.xml and robots.txt) | `https://my-site.com` |

### Strapi (`strapi/.env`)

| Variable | Description | Example |
|---|---|---|
| `PREVIEW_SECRET` | Shared secret for Draft Mode preview (must match `frontend/.env`) | `a-strong-secret` |
| `FRONTEND_URL` | URL of the frontend (used for the preview button in the admin) | `http://localhost:3000` |

---

## Cache Revalidation

The frontend caches Strapi responses indefinitely and invalidates them on demand via a webhook. This ensures optimal performance while keeping content fresh as soon as it is published.

### Configure the webhook in Strapi

1. Go to **Settings → Webhooks → Add new webhook**
2. Fill in the fields:

| Field | Value |
|---|---|
| Name | `Frontend revalidation` |
| URL | `http://localhost:3000/api/revalidate?secret=<REVALIDATE_SECRET>` |
| Events | `entry.publish`, `entry.update`, `entry.delete` |

> In production, replace the URL with your deployed frontend URL and use a strong secret.

### How it works

- All requests to Strapi are tagged with `strapi-content`
- On every Strapi publish event, the webhook calls `POST /api/revalidate`
- Next.js invalidates the tag and regenerates pages on next request

---

## Content Preview (Draft Mode)

Editors can preview unpublished drafts directly from the Strapi admin without publishing them. Next.js Draft Mode is used to serve draft content through a secure, short-lived cookie.

### How it works

1. The editor opens a draft page in Strapi and clicks **Open preview**
2. Strapi calls `GET /api/preview?secret=<PREVIEW_SECRET>&slug=<slug>`
3. The route validates the secret, enables `draftMode()` (httpOnly cookie), and redirects to the page
4. Server components detect `draftMode().isEnabled`, fetch with `?status=draft` and `cache: 'no-store'`
5. A yellow banner "Preview mode — Exit preview" floats at the bottom of the page
6. Clicking **Exit preview** calls `GET /api/disable-draft`, clears the cookie, and redirects to `/`

### Configure Strapi

Set these variables in `strapi/.env`:

```
PREVIEW_SECRET=your-shared-secret
FRONTEND_URL=http://localhost:3000
```

The preview button is automatically configured in `strapi/config/admin.ts` — no manual setup required in the Strapi admin UI.

> In production, set `FRONTEND_URL` to your deployed frontend URL and use a strong secret on both sides.

---

## Adding a Block

### 1. Create the component schema in Strapi

Create `strapi/src/components/blocks/my-block.json`:

```json
{
  "collectionName": "components_blocks_my_block",
  "info": { "displayName": "My Block" },
  "attributes": {
    "title": { "type": "string" }
  }
}
```

### 2. Register it in the Page dynamic zone

In `strapi/src/api/page/content-types/page/schema.json`, add `"blocks.my-block"` to the `components` array.

### 3. Declare the TypeScript type

In `frontend/type.ts`, add the block type and include it in the `Block` union.

### 4. Create the React component

Create `frontend/components/blocks/MyBlock.tsx` and add it to the `BlockRenderer`.

---

## Navigation

The navigation is managed from the Strapi admin via the **Global** single type (`Content Manager → Single Types → Global`).

| Field | Description |
|---|---|
| `siteName` | Brand name shown in the nav and footer |
| `navVariant` | Layout: `header` (top bar) or `sidebar` (left column) |
| `navItems` | Repeatable list of `{ label, href }` to compose the menu manually |

If `navItems` is empty, links are auto-generated from all published **Page** entries. As soon as you add at least one item, the auto-generation is disabled and only the configured items are shown. `href` accepts internal paths (`/about`) and external URLs (`https://...`).

### Footer

The footer is configured in the same **Global** entry:

| Field | Description |
|---|---|
| `footer.tagline` | Short description shown below the logo |
| `footer.address` | Physical address (multiline) |
| `footer.logo` | Optional logo image (falls back to `siteName` text) |
| `footer.footerLinks` | Repeatable list of `{ label, href }` — use this for legal links |
| `footer.socialLinks` | Repeatable list of `{ platform, url }` — platforms: `twitter`, `linkedin`, `github`, `instagram`, `facebook`, `youtube` |

If the footer is not configured, a minimal copyright bar (`© {year} {siteName}`) is still rendered.

### Nav variants

- **`header`** — sticky top bar, links on the right, hamburger on mobile
- **`sidebar`** — fixed 256 px left column on desktop, hamburger on mobile

---

## SEO

Each **Page** and the **Global** entry expose a `seo` component with three fields:

| Field | Description |
|---|---|
| `seo.metaTitle` | Overrides the page title in `<title>` and Open Graph |
| `seo.metaDescription` | Meta description and Open Graph description |
| `seo.ogImage` | Open Graph image |

**Fallback order for each page:** page SEO → Global SEO → empty.

The `siteName` from Global is used as the title template: `{page title} | {siteName}`.

`/sitemap.xml` and `/robots.txt` are generated automatically by Next.js using `NEXT_PUBLIC_SITE_URL`.

---

## Dark Mode

Dark mode is driven by the system preference (`prefers-color-scheme: dark`) — no JavaScript toggle required.

Shadcn/ui uses a `.dark` class on `<html>` by default, which requires a theme provider to work. To keep system-based dark mode functional without extra JS, `frontend/app/globals.css` includes both approaches:

```css
/* System preference — works without JS */
@media (prefers-color-scheme: dark) {
  :root { /* dark variables */ }
}

/* Manual toggle — add class="dark" to <html> */
.dark { /* same dark variables */ }
```

If you add a theme toggle in the future, set `class="dark"` on `<html>` and remove the media query block.

---

## Testing

### Unit tests — Vitest + React Testing Library

```bash
cd frontend
pnpm test:run      # run once
pnpm test          # watch mode
```

Covers:
- `lib/strapi.ts` — `getStrapiImageUrl`, `fetchAPI` cache behaviour (normal vs draft)
- `BlockRenderer` — empty array renders nothing
- `NavLinks` — renders items, applies active styles for current route

### E2E tests — Playwright

```bash
cd frontend
pnpm test:e2e          # headless
pnpm test:e2e:ui       # interactive UI mode
```

Requires Strapi and the frontend both running. The `playwright.config.ts` starts `pnpm dev` automatically when not already running.

Covers:
- Homepage renders a `<main>` element
- Unknown slug returns a 404 response

---

## Deployment

### Strapi — Option A: Strapi Cloud (recommended)

The easiest path — Strapi Cloud handles the server, database, and uploads out of the box.

1. Create an account at [cloud.strapi.io](https://cloud.strapi.io)
2. **New project → Import from GitHub** and select this repository
3. Set the **base directory** to `strapi`
4. Add the environment variables from `strapi/.env.example` (generate new secrets — never reuse dev values)
5. Deploy — Strapi Cloud provisions a PostgreSQL database automatically
6. Copy the deployed URL (e.g. `https://my-app.strapiapp.com`) — you will need it for the frontend

### Strapi — Option B: Railway

1. Create a new project at [railway.app](https://railway.app)
2. **Deploy from GitHub repo**, set the root directory to `strapi`
3. Add a **PostgreSQL** service to the project
4. Set the following environment variables on the Strapi service:

```
DATABASE_CLIENT=postgres
DATABASE_URL=${{Postgres.DATABASE_URL}}
DATABASE_SSL=true
```

5. Copy all other variables from `strapi/.env.example` (generate new secrets)
6. Railway will build and deploy Strapi automatically on push

### Frontend — Vercel

1. Push the project to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project → Import**
3. Set the **Root Directory** to `frontend`
4. Set the following environment variables:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_STRAPI_URL` | Your deployed Strapi URL |
| `REVALIDATE_SECRET` | A strong random string (must match Strapi webhook config) |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel URL (e.g. `https://my-site.vercel.app`) |

5. Deploy — Vercel detects Next.js automatically

### Post-deployment checklist

- [ ] **Strapi CORS** — In Strapi admin: Settings → Security → Allowed origins → add your Vercel URL
- [ ] **Webhook** — In Strapi admin: Settings → Webhooks → update the URL to `https://my-site.vercel.app/api/revalidate?secret=<REVALIDATE_SECRET>`
- [ ] **Permissions** — In Strapi admin: Settings → Users & Permissions → Public role → ensure `find` and `findOne` are enabled for `page` and `global`
- [ ] **Content** — Create at least one Page and fill in the Global entry (siteName, navVariant)
- [ ] **`NEXT_PUBLIC_SITE_URL`** — Set to your final domain, then redeploy the frontend so `sitemap.xml` uses the correct URL

---

## Project Structure

```
Strapi_builder/
├── strapi/                        # Strapi CMS
│   ├── config/admin.ts            # Preview button configuration
│   └── src/
│       ├── api/page/              # "Page" collection type
│       ├── api/global/            # "Global" single type (nav, footer, SEO, site name)
│       ├── components/
│       │   ├── blocks/            # Block schemas (hero, text-block, cta, …)
│       │   ├── elements/          # Reusable elements (nav-item, card-item, social-link, …)
│       │   └── shared/            # Shared components (seo, footer)
│       └── admin/app.tsx          # Admin customization
│
└── frontend/                      # Next.js
    ├── app/
    │   ├── [slug]/page.tsx        # Dynamic page route (SSG + ISR)
    │   ├── api/
    │   │   ├── preview/           # Enable Draft Mode (preview entry point)
    │   │   ├── disable-draft/     # Disable Draft Mode (exit preview)
    │   │   └── revalidate/        # Cache revalidation webhook
    │   ├── sitemap.ts             # Dynamic sitemap.xml
    │   └── robots.ts              # robots.txt
    ├── components/
    │   ├── SiteLayout.tsx         # Layout wrapper (fetches Global, picks nav variant)
    │   ├── NavHeader.tsx          # Header nav (server component)
    │   ├── NavSidebar.tsx         # Sidebar nav (server component)
    │   ├── NavLinks.tsx           # Nav links with active state (client component)
    │   ├── NavMobileMenu.tsx      # Hamburger menu (client component)
    │   ├── Footer.tsx             # Footer (server component)
    │   ├── PreviewBanner.tsx      # Draft Mode banner with exit link
    │   ├── BlockRenderer.tsx      # Block router
    │   └── blocks/                # Block components
    ├── __tests__/                 # Vitest unit tests
    ├── e2e/                       # Playwright end-to-end tests
    ├── lib/strapi.ts              # Strapi API client
    └── type.ts                    # TypeScript types
```
