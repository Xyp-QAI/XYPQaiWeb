# Fix Google Search: Favicon + Indexing

Use this checklist in **Google Search Console** so the correct favicon shows and all pages get indexed.

---

## 1. Favicon (replace old icon in search results)

Google uses a **cached** favicon. You can’t remove it completely; you can only replace it with the new one.

### In your project (already done)
- Favicon is served at `/xyp-favicon.png` (XYP logo).
- `index.html` has the right `<link rel="icon">` tags with sizes.

### In Google Search Console
1. Open [Google Search Console](https://search.google.com/search-console).
2. Select the property **www.xypquantum.com** (or xypquantum.com if that’s what you use).
3. **URL Inspection** (left sidebar):
   - Enter: `https://www.xypquantum.com/`
   - Click **Request indexing**.
4. Repeat **Request indexing** for:
   - `https://www.xypquantum.com/products`
   - `https://www.xypquantum.com/technology`
   - `https://www.xypquantum.com/about`
   - `https://www.xypquantum.com/contact`
5. Wait **3–7 days**. Google will recrawl and usually update the favicon when it refreshes the homepage.

### If the old icon still appears
- Try in an **incognito** window or another browser to rule out local cache.
- In GSC, use **URL Inspection** on `https://www.xypquantum.com/` and check “View tested page” → “Screenshot” / “More info” to see what Google last saw.
- There is no way to “delete” the favicon from search; only to replace it by having the correct icon on the live site and letting Google recrawl.

---

## 2. Make sure all pages are indexed

### Sitemap
1. In GSC go to **Sitemaps** (under “Indexing”).
2. If the sitemap is not added: enter `https://www.xypquantum.com/sitemap.xml` and submit.
3. If it’s already there: click **Resubmit** or leave it; Google will recrawl.

### Request indexing for each main URL
In **URL Inspection**, request indexing for:

| URL | Page |
|-----|------|
| `https://www.xypquantum.com/` | Home |
| `https://www.xypquantum.com/products` | Products |
| `https://www.xypquantum.com/technology` | Technology |
| `https://www.xypquantum.com/about` | Company / About |
| `https://www.xypquantum.com/contact` | Contact |

Do this once per URL. Don’t spam; a single request per URL is enough.

### Check for issues
1. **Coverage** (Indexing → Pages): see “Why pages aren’t indexed” and fix any real errors (e.g. redirects, blocking).
2. **robots.txt**: In **Settings** → **robots.txt**, use “Test live URL” and confirm it allows crawling (no `Disallow: /` for the main content).
3. **Sitemaps**: Confirm no errors; all 5 URLs should be “Discovered” or “Indexed” over time.

### Optional: same for non‑www
If you have **xypquantum.com** (no www) as a separate property, repeat the same steps there and set the preferred domain (www vs non‑www) in **Settings** so you don’t split signals.

---

## 3. Quick reference

- **Favicon file:** `https://www.xypquantum.com/xyp-favicon.png`
- **Sitemap:** `https://www.xypquantum.com/sitemap.xml`
- **robots:** `https://www.xypquantum.com/robots.txt` (should allow all)

After requesting indexing, give Google **a few days** to recrawl. The favicon in search will update when Google refreshes the homepage; all main pages should move toward “Indexed” if there are no blocking or redirect issues.
