# Cloudflare Pages Deployment Guide

## Quick Setup

### 1. Create a new Cloudflare Pages project
- Go to: https://dash.cloudflare.com
- Workers & Pages → Pages → Create application → Pages
- Connect to GitHub repository: `LegacyArchitectRVA/legacy-portal`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`

### 2. Add Required Environment Variables

In your Cloudflare Pages project Settings → Variables and secrets, add:

| Type | Name | Value | Description |
|------|------|-------|-------------|
| Plaintext | `VITE_CONVEX_URL` | `https://YOUR-DEPLOYMENT.convex.cloud` | Your Convex backend URL |

#### How to get your Convex URL:
1. Go to: https://dashboard.convex.dev
2. Select your project
3. Copy the deployment URL (format: `https://XXX.convex.cloud`)

### 3. Configure Custom Domain (Optional)
- In Cloudflare Pages → Custom domains
- Add: `portal.legacyarchitectrva.com`
- Follow DNS verification steps

### 4. Deploy
- Push to `main` branch, or manually trigger deployment
- Wait 2-5 minutes for build to complete

## Troubleshooting

### Black Screen / "No address provided to ConvexReactClient"
**Cause:** Missing `VITE_CONVEX_URL` environment variable

**Fix:**
1. Go to Cloudflare Pages project → Settings → Variables and secrets
2. Add `VITE_CONVEX_URL` with your Convex deployment URL
3. Redeploy

### 404 on /admin/hubspot
**Cause:** Old deployment still cached

**Fix:**
1. Hard refresh browser (Ctrl + F5)
2. Wait 5-10 minutes for Cloudflare cache to clear
3. Check deployments tab for latest successful build

### Build fails
**Fix:**
1. Check build logs in Cloudflare Pages → Deployments
2. Ensure Node.js version is set to 20 in Cloudflare settings
3. Make sure `npm install` completes successfully

## Project Structure

```
legacy-portal/
├── dist/                  # Built files (upload this to Cloudflare)
│   ├── index.html
│   ├── assets/
│   │   ├── index-*.js
│   │   └── index-*.css
│   └── (images, etc.)
├── src/                  # Source code
├── convex/               # Convex backend functions
├── package.json
└── vite.config.ts
```

## Manual Upload (Alternative)

If GitHub integration isn't working:

1. Run locally:
   ```bash
   cd legacy-portal
   npm install
   npm run build
   ```

2. Upload `dist/` folder to Cloudflare Pages → Deployments → Upload

## Support

For issues with:
- **Convex backend:** Check https://dashboard.convex.dev
- **Cloudflare Pages:** Check https://dash.cloudflare.com
- **Code issues:** Check the repository README.md
