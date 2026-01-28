# Sanity Setup Guide for Vantura Digital

This guide covers the complete setup process to connect your Next.js frontend with the Sanity Headless CMS.

## 1. Project Configuration (Sanity Dashboard)

### A. Access Your Project
1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project: **Vantura Digital** (Project ID: `muexnwt7`)

### B. Add "localhost" to CORS Origins
This allows your local development server to fetch data from Sanity.
1. Click **API** tab.
2. Scroll to **CORS Origins**.
3. Click **Add CORS origin**.
4. Enter: `http://localhost:3000`
5. Check **Allow credentials**.
6. Click **Save**.
7. (*Optional but recommended*) Add your production URL as well (e.g., `https://vanturadigital.com` or Vercel URL).

### C. Create an API Token
This token is needed for the frontend to read draft content (Live Preview) or authenticated data.
1. Still in the **API** tab, scroll to **Tokens**.
2. Click **Add API token**.
3. **Name**: `NextJS Frontend`
4. **Permissions**: Select **Viewer**.
5. Click **Save**.
6. **COPY THE TOKEN** immediately. You will need this for the `.env.local` file.

### D. Setup On-Demand Revalidation (Webhooks)
This ensures your site updates instantly when you publish content in Sanity.
1. Go to **API** > **Webhooks**.
2. Click **Create webhook**.
3. **Name**: `Next.js Revalidation`
4. **Description**: `Triggers revalidation on content changes`
5. **URL**: `https://<YOUR-PRODUCTION-DOMAIN>/api/revalidate` (For local dev, you can skip this or use ngrok, but it's essential for production).
6. **Dataset**: `production`
7. **Trigger on**: Create, Update, Delete.
8. **Filter**: `_type in ["project", "post", "page"]` (or leave blank to trigger on everything).
9. **Secret**: Generate a random secure string (e.g., `vantura-reval-secret-2026`).
10. Click **Save**.
11. Keep this **Secret** safe for `.env.local`.

---

## 2. Local Environment Variables (.env.local)

Open or create `.env.local` in the root of your project and ensure these values are set:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="muexnwt7"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2025-01-27"
NEXT_PUBLIC_SITE_URL="http://localhost:3000" # Change to production URL when deploying

# SECRETS (Do not expose these in NEXT_PUBLIC variables)
SANITY_API_READ_TOKEN="<PASTE_YOUR_VIEWER_TOKEN_HERE>"
REVALIDATION_SECRET="<PASTE_YOUR_WEBHOOK_SECRET_HERE>"
```

---

## 3. Verify Setup

1. **Restart your dev server**:
   ```bash
   npm run dev
   ```
2. **Access the Studio**:
   Go to `http://localhost:3000/studio` (or wherever your Studio route is mounted, typically `/studio` or via separate studio repo).
   *Note: If you are using `next-sanity` with the embedded studio, it's at `/studio`.*

3. **Create Content**:
   - Log in to the Studio.
   - Create a test document.
   - Publish it.

4. **Check Frontend**:
   - Verify the content appears on your site.

---

## 4. Deployment (Vercel)

When deploying to Vercel:
1. Go to **Settings** > **Environment Variables**.
2. Add all the variables from your `.env.local` file.
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `NEXT_PUBLIC_SITE_URL`
   - `SANITY_API_READ_TOKEN`
   - `REVALIDATION_SECRET`
3. Redeploy to ensure variables are picked up.
