# XYP Quantum AI — Website Documentation

Complete step-by-step documentation for **development**, **tech stack**, **deployment**, and **SEO**.  
Live site: **https://www.xypquantum.com**

---

## Table of contents

1. [Development](#1-development)
2. [Tech stack](#2-tech-stack)
3. [Deployment](#3-deployment)
4. [SEO](#4-seo)

---

# 1. Development

## 1.1 Prerequisites

- **Node.js** — v18 or v20 (LTS recommended).  
  Check: `node -v`
- **npm** — v9+.  
  Check: `npm -v`
- **Git** — for cloning and version control.

## 1.2 Clone and install

**Step 1 — Clone the repository**

```bash
git clone https://github.com/Xyp-QAI/XYPQaiWeb.git
cd XYPQaiWeb
```

**Step 2 — Install dependencies**

```bash
npm install
```

This installs all packages listed in `package.json` (React, Vite, Tailwind, Radix, etc.).

**Step 3 — (Optional) Backend for contact form locally**

If you want the contact form to work locally (submit to Google Sheets + email):

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Google Sheet ID, service account JSON path, Resend API key, admin email
cd ..
```

See [Backend / Contact API](#13-backend--contact-api) for `.env` details.

## 1.3 NPM scripts (step-by-step)

| Script | Command | Purpose |
|--------|---------|--------|
| **dev** | `npm run dev` | Start Vite dev server (frontend only). Default: http://localhost:8080 |
| **dev:all** | `npm run dev:all` | Start frontend + backend together (contact form works locally). |
| **dev:backend** | `npm run dev:backend` | Start only the backend server (port 3001). |
| **build** | `npm run build` | Production build. Output: `dist/`. |
| **build:dev** | `npm run build:dev` | Build in development mode (e.g. for debugging). |
| **preview** | `npm run preview` | Serve the `dist/` build locally (test production build). |
| **lint** | `npm run lint` | Run ESLint on the project. |
| **test** | `npm run test` | Run Vitest tests once. |
| **test:watch** | `npm run test:watch` | Run Vitest in watch mode. |

**Typical workflow**

1. **Frontend only:**  
   `npm run dev` → open http://localhost:8080  
   Contact form will POST to backend; in dev it uses `http://localhost:3001` if backend is not running you’ll get network errors for form submit.

2. **Frontend + backend:**  
   `npm run dev:all` → frontend on 8080, backend on 3001.  
   Contact form submits to local backend.

3. **Before deploy:**  
   `npm run build` then `npm run preview` to test the production build.

## 1.4 Project structure

```
quantum-vision-systems/
├── api/                    # Vercel serverless functions (production contact API)
│   ├── contact.js          # POST /api/contact → Google Sheets + Resend email
│   ├── health.js           # Health check
│   └── _email.js           # Shared email logic (Resend)
├── backend/                # Optional Express server (local dev contact form)
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── public/                 # Static assets (served at site root)
│   ├── xyp-favicon.png     # Favicon (XYP logo)
│   ├── favicon.png         # Fallback favicon
│   ├── preview.jpg         # OG/social share image
│   ├── robots.txt
│   ├── sitemap.xml
│   └── placeholder.svg
├── src/
│   ├── assets/             # Images imported in code (e.g. logo, hero, dashboards)
│   ├── components/
│   │   ├── layout/         # Navbar, Footer
│   │   ├── sections/      # Hero, CTA, ProductShowcase, etc.
│   │   ├── ui/            # shadcn-style UI primitives
│   │   ├── SEO.tsx        # Per-page title, description, canonical
│   │   └── NavLink.tsx
│   ├── config/
│   │   └── content.ts      # Central copy + image imports (hero, domains, CTA, etc.)
│   ├── hooks/
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/             # Route pages
│   │   ├── Index.tsx      # Home
│   │   ├── Products.tsx
│   │   ├── Technology.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx            # Routes + providers
│   ├── main.tsx           # Entry
│   └── index.css          # Global + Tailwind
├── docs/                   # Documentation (this file, INDEXING_AND_FAVICON.md)
├── index.html              # HTML shell, meta tags, favicon, OG/Twitter
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── vercel.json             # Build, rewrites, serverless functions
└── components.json         # shadcn/ui config
```

## 1.5 Path alias

- **`@/`** → `src/`  
  Example: `import SEO from "@/components/SEO";`  
  Defined in `vite.config.ts` and `tsconfig.app.json`.

## 1.6 Content and images

- **Copy and images:** `src/config/content.ts`  
  Hero headline, CTAs, domain slider, product showcase, news, etc.  
  To change text or images: edit this file and/or replace files in `src/assets/` (keep same filenames to avoid changing imports).
- **Static assets at root:** `public/`  
  Favicon, preview image, `robots.txt`, `sitemap.xml`.  
  Referenced as `/xyp-favicon.png`, `/preview.jpg`, etc.

## 1.7 Backend / Contact API

**Local (Express in `backend/`)**

- Run: `npm run dev:backend` (or `npm run dev:all`).
- Server: http://localhost:3001.
- Frontend in dev uses `VITE_CONTACT_API_URL` or falls back to `http://localhost:3001` when not in production.

**Backend `.env` (see `backend/.env.example`)**

| Variable | Description |
|----------|-------------|
| `GOOGLE_SHEET_ID` | Google Sheet ID (from the sheet URL). |
| `GOOGLE_SERVICE_ACCOUNT_KEY_FILE` | Path to service account JSON (e.g. `./service-account-key.json`). |
| `PORT` | Server port (default 3001). |
| `RESEND_API_KEY` | Resend API key (https://resend.com). |
| `ADMIN_EMAIL` or `ADMIN_EMAILS` | Email(s) to receive contact notifications. |

**Production (Vercel)**

- Contact form POSTs to **`/api/contact`** (Vercel serverless function in `api/contact.js`).
- No separate backend server; env vars are set in Vercel (see [Deployment](#3-deployment)).

## 1.8 Frontend environment variables

| Variable | When | Purpose |
|----------|------|---------|
| `VITE_CONTACT_API_URL` | Optional (production) | Override API base URL for contact form. If not set, production uses same origin (e.g. `https://www.xypquantum.com`). |
| `PROD` | Set by Vite | `true` in production build. |

Contact page logic:  
`import.meta.env.VITE_CONTACT_API_URL ?? (import.meta.env.PROD ? "" : "http://localhost:3001")`  
So in dev it defaults to local backend; in prod it uses current origin unless you set `VITE_CONTACT_API_URL`.

---

# 2. Tech stack

## 2.1 Core

| Technology | Version / use | Role |
|------------|----------------|------|
| **React** | 18.x | UI library |
| **TypeScript** | 5.x | Typing |
| **Vite** | 5.x | Build tool, dev server, HMR |
| **React Router** | 6.x | Client-side routing |

## 2.2 UI and styling

| Technology | Use |
|------------|-----|
| **Tailwind CSS** | Utility-first CSS; theme in `tailwind.config.ts` (colors, font sizes, animations). |
| **tailwindcss-animate** | Animations (accordion, fade-in-up, etc.). |
| **Radix UI** (via shadcn/ui) | Accessible primitives: Accordion, Dialog, Dropdown, Tabs, Tooltip, etc. |
| **class-variance-authority (cva)** | Variant-based component props. |
| **clsx** + **tailwind-merge** | Class name merging (e.g. in `lib/utils.ts`). |
| **Lucide React** | Icons. |
| **Framer Motion** | Scroll/view animations, transitions. |

## 2.3 Forms and validation

| Technology | Use |
|------------|-----|
| **React Hook Form** | Form state and submission. |
| **Zod** | Schema validation. |
| **@hookform/resolvers** | Zod resolver for React Hook Form. |

## 2.4 Data and state

| Technology | Use |
|------------|-----|
| **TanStack Query (React Query)** | Server state, caching (if used for data fetching). |

## 2.5 SEO and meta

| Technology | Use |
|------------|-----|
| **react-helmet-async** | Per-page `<title>`, `<meta name="description">`, `<link rel="canonical">`. |
| **index.html** | Default title, description, Open Graph, Twitter Card, favicon (single source for OG/Twitter to avoid duplicates). |

## 2.6 Other libraries

| Package | Use |
|---------|-----|
| **next-themes** | Theme (dark/light) if used. |
| **date-fns** | Date formatting. |
| **embla-carousel-react** | Carousels. |
| **recharts** | Charts (if used). |
| **sonner** | Toast notifications. |
| **vaul** | Drawer component. |
| **cmdk** | Command palette. |
| **input-otp** | OTP input. |
| **react-day-picker** | Date picker. |
| **react-resizable-panels** | Resizable layouts. |

## 2.7 Backend / API

| Technology | Use |
|------------|-----|
| **Express** (backend/) | Local contact form server. |
| **Vercel Serverless** (api/) | Production `/api/contact`, `/api/health`. |
| **googleapis** | Google Sheets API (append contact submissions). |
| **Resend** | Transactional email (admin notifications). |

## 2.8 Dev and test

| Technology | Use |
|------------|-----|
| **ESLint** | Linting. |
| **Vitest** | Unit tests. |
| **@testing-library/react** | Component testing. |
| **jsdom** | DOM environment for tests. |

---

# 3. Deployment

## 3.1 Platform: Vercel

The site is built as a **static SPA** and deployed on **Vercel**.  
Contact form is handled by a **serverless function** (`api/contact.js`).

## 3.2 Build configuration (vercel.json)

- **buildCommand:** `npm run build`  
- **outputDirectory:** `dist`  
- **rewrites:** All routes except `/api/*` → `index.html` (SPA fallback).  
- **functions:** `api/contact.js` — memory 1024 MB, max duration 10 s.

So:

- `https://www.xypquantum.com/`, `/products`, `/technology`, etc. → `index.html` (React router handles them).
- `https://www.xypquantum.com/api/contact` → serverless function.

## 3.3 Deploy steps (step-by-step)

**Step 1 — Connect repository**

1. Go to [vercel.com](https://vercel.com) and sign in.
2. **Add New Project** → import the Git repository (e.g. GitHub: `Xyp-QAI/XYPQaiWeb`).
3. Vercel will detect Vite and use **Build Command** and **Output Directory** from `vercel.json` (or you can set them in the UI).

**Step 2 — Environment variables (production)**

In **Project → Settings → Environment Variables**, add:

| Name | Value | Notes |
|------|--------|--------|
| `GOOGLE_SHEET_ID` | Your Google Sheet ID | From the sheet URL. |
| `GOOGLE_SERVICE_ACCOUNT_KEY_JSON` | Full JSON string of service account key | Single line; escape quotes if pasted. Required for `api/contact.js`. |
| `RESEND_API_KEY` | Your Resend API key | From Resend dashboard. |
| `ADMIN_EMAIL` or `ADMIN_EMAILS` | Email(s) for contact notifications | Comma-separated if multiple. |

Optional:

| Name | Value |
|------|--------|
| `VITE_CONTACT_API_URL` | Leave empty to use same origin, or set e.g. `https://www.xypquantum.com` if you need to override. |

**Step 3 — Deploy**

- Push to the connected branch (e.g. `main`).  
- Vercel runs `npm run build` and deploys `dist/` + serverless functions.
- First deploy: Vercel will assign a URL; then you can add a custom domain (e.g. `www.xypquantum.com`).

**Step 4 — Custom domain (if not already set)**

1. **Project → Settings → Domains** → Add `www.xypquantum.com` (and optionally `xypquantum.com` with redirect to www).
2. Add the DNS records Vercel shows (CNAME or A).

## 3.4 Post-deploy checks

1. **Homepage:** `https://www.xypquantum.com/` loads and navigation works.
2. **Static files:**  
   - `https://www.xypquantum.com/sitemap.xml`  
   - `https://www.xypquantum.com/robots.txt`  
   - `https://www.xypquantum.com/xyp-favicon.png`  
   - `https://www.xypquantum.com/preview.jpg`
3. **Contact form:** Submit a test; check Google Sheet row and admin email (Resend).
4. **API health (if you have it):** e.g. `https://www.xypquantum.com/api/health`.

---

# 4. SEO

## 4.1 Overview

- **Canonical domain:** `https://www.xypquantum.com`
- **Favicon:** `/xyp-favicon.png` (and fallback `/favicon.png`).
- **Social image:** `/preview.jpg` (used in Open Graph and Twitter Card).
- **Sitemap:** `/sitemap.xml`.  
- **Crawler access:** `robots.txt` allows all; no blocking of important pages.

## 4.2 index.html (default meta and favicon)

**Step 1 — What’s in the `<head>`**

- **Favicon:**  
  - `<link rel="icon" type="image/png" sizes="48x48" href="/xyp-favicon.png" />`  
  - `<link rel="icon" type="image/png" sizes="32x32" href="/xyp-favicon.png" />`  
  - `<link rel="apple-touch-icon" href="/xyp-favicon.png" />`
- **Canonical:** `<link rel="canonical" href="https://www.xypquantum.com/" />`
- **Title:** `XYP Quantum AI | AI Products & Advanced Technology`
- **Meta description:** One sentence describing the site (AI products, technology, innovation).
- **Open Graph (OG):**  
  - `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:site_name`  
  - All use `property="og:..."`  
  - Image: `https://www.xypquantum.com/preview.jpg`
- **Twitter Card:**  
  - `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`  
  - All use `name="twitter:..."` (no `property` for Twitter).

**Why OG/Twitter only in index.html**

- To avoid duplicate or malformed tags (e.g. `og:temporal:twitter:*` in Facebook Debugger).  
- Per-page OG/Twitter would require server-side rendering or a backend that injects meta per URL.

## 4.3 Per-page SEO (SEO.tsx)

- **Component:** `src/components/SEO.tsx`  
- **Uses:** `react-helmet-async` (Helmet).  
- **Sets per page:**  
  - `<title>`  
  - `<meta name="description" content="..." />`  
  - `<link rel="canonical" href="https://www.xypquantum.com/..." />`  
- **Does not set:** OG or Twitter tags (those stay from index.html to avoid duplicates).

**Props**

| Prop | Type | Purpose |
|------|------|--------|
| `title` | string | e.g. `"AI Products"` → title becomes `"AI Products \| XYP Quantum AI"`. |
| `fullTitle` | string | Full title when no suffix (e.g. `"About XYP Quantum AI"`). |
| `description` | string | Meta description for the page. |
| `path` | string | Path for canonical URL (e.g. `"/products"`). |

**Page usage (examples)**

- **Home:** `fullTitle="XYP Quantum AI | AI Products & Advanced Technology"`, `path="/"`.
- **Products:** `title="AI Products"`, `path="/products"`.
- **Technology:** `title="Technology & Innovation"`, `path="/technology"`.
- **About:** `fullTitle="About XYP Quantum AI"`, `path="/about"`.
- **Contact:** `title="Contact Us"`, `path="/contact"`.

## 4.4 Sitemap (sitemap.xml)

- **Location:** `public/sitemap.xml`  
- **URL:** `https://www.xypquantum.com/sitemap.xml`  
- **Format:** XML urlset; one `<url>` per page with `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`.

**Included URLs**

| URL | Priority |
|-----|----------|
| https://www.xypquantum.com/ | 1.0 |
| https://www.xypquantum.com/products | 0.8 |
| https://www.xypquantum.com/technology | 0.8 |
| https://www.xypquantum.com/about | 0.8 |
| https://www.xypquantum.com/contact | 0.8 |

**Updating the sitemap**

1. Edit `public/sitemap.xml`.
2. Set `<lastmod>` to the current date (YYYY-MM-DD).
3. Add or remove `<url>` blocks as needed.  
After deploy, submit the sitemap URL in Google Search Console (Indexing → Sitemaps).

## 4.5 robots.txt

- **Location:** `public/robots.txt`  
- **URL:** `https://www.xypquantum.com/robots.txt`  
- **Content:**

```text
User-agent: *
Disallow:

Sitemap: https://www.xypquantum.com/sitemap.xml
```

- **Meaning:** Allow all crawlers; no paths disallowed. Sitemap URL is declared so search engines can discover it.

## 4.6 Favicon and preview image

- **Favicon:**  
  - Primary: `public/xyp-favicon.png` (XYP logo).  
  - Referenced in `index.html` with `sizes="48x48"` and `32x32` for better behavior in search and bookmarks.
- **Social preview:**  
  - `public/preview.jpg` — used as `og:image` and `twitter:image` (absolute URL: `https://www.xypquantum.com/preview.jpg`).

## 4.7 Internal linking (for indexing)

- **Navbar:** Links to Products, Technology, Company (About), Contact.
- **Footer:** Links to products, technology, about, contact, support.
- **Homepage body:**  
  - Hero: row of links — Products, Technology, Company, Contact.  
  - CTA: same row of links.  
- **Route:** `/company` redirects to `/about` (in `App.tsx`).  
Sitemap uses `/about`; internal links use both where appropriate.

## 4.8 Google Search Console (step-by-step)

1. **Verify property**  
   Add and verify `https://www.xypquantum.com` (and optionally `xypquantum.com`) in [Search Console](https://search.google.com/search-console).

2. **Submit sitemap**  
   - **Indexing → Sitemaps**  
   - Submit: `https://www.xypquantum.com/sitemap.xml`

3. **Request indexing for main URLs**  
   - **URL Inspection**  
   - Enter each URL → **Request indexing**:  
     - `https://www.xypquantum.com/`  
     - `https://www.xypquantum.com/products`  
     - `https://www.xypquantum.com/technology`  
     - `https://www.xypquantum.com/about`  
     - `https://www.xypquantum.com/contact`

4. **Favicon in search results**  
   - Favicon in search is taken from the live site (and cache).  
   - Ensure `index.html` and `public/xyp-favicon.png` are deployed, then use URL Inspection on the homepage and request indexing.  
   - Update usually appears in a few days to a couple of weeks.  
   - See `docs/INDEXING_AND_FAVICON.md` for more detail.

5. **Monitor**  
   - **Indexing → Pages:** see indexed count and “Why pages aren’t indexed.”  
   - **Settings → robots.txt:** “Test live URL” to confirm crawler access.

## 4.9 Technical SEO (already applied)

- One **H1** per page (Hero or PageHero).
- Sensible **H2/H3** hierarchy in sections.
- **Alt text** on images.
- **Lazy loading** on below-the-fold images (`loading="lazy"`).
- No duplicate OG/Twitter tags (only in index.html).
- Canonical URL per page via SEO component.

---

# Quick reference

| Item | Value |
|------|--------|
| **Live site** | https://www.xypquantum.com |
| **Dev server** | http://localhost:8080 (`npm run dev`) |
| **Backend (local)** | http://localhost:3001 (`npm run dev:backend`) |
| **Build output** | `dist/` |
| **Sitemap** | https://www.xypquantum.com/sitemap.xml |
| **robots** | https://www.xypquantum.com/robots.txt |
| **Favicon** | https://www.xypquantum.com/xyp-favicon.png |
| **Preview image** | https://www.xypquantum.com/preview.jpg |
| **Contact API** | POST `/api/contact` (Vercel serverless) |

For **favicon and indexing troubleshooting**, use **`docs/INDEXING_AND_FAVICON.md`**.
