# Environment Variables Guide for Andrew McConville Design

This guide explains how to use the environment variable system for managing page metadata in this Vite-based project.

## Table of Contents
- [Overview](#overview)
- [Quick Start](#quick-start)
- [Environment Variable Structure](#environment-variable-structure)
- [Adding a New Page](#adding-a-new-page)
- [Updating Page Metadata](#updating-page-metadata)
- [Available Placeholders](#available-placeholders)
- [Testing Your Changes](#testing-your-changes)
- [Troubleshooting](#troubleshooting)

## Overview

This project uses a custom Vite plugin to inject environment variables into HTML files at build time. This ensures that:
- Meta tags are populated before JavaScript runs (SEO-friendly)
- Social media crawlers can read the metadata
- All pages share a consistent head structure
- Metadata is easily maintainable through a single `.env` file

## Quick Start

### To update page metadata:
1. Open `.env` file
2. Find the relevant variable (e.g., `VITE_HOME_TITLE`)
3. Update the value
4. Run `npm run build`
5. Deploy the `dist` folder

### To preview changes locally:
```bash
npm run dev
```

## Environment Variable Structure

### Global Variables
These apply to all pages unless overridden:

```env
VITE_BASE_URL=https://andrewmcconville.github.io/andrewmcconville-design
VITE_REPO_NAME=andrewmcconville-design
VITE_AUTHOR=Andrew McConville
VITE_TWITTER=@drew_mcconville
VITE_FB_APP_ID=227718953986524
VITE_FB_AUTHOR=https://www.facebook.com/andrew.d.mcconville
```

### Page-Specific Variables
Each page has a prefix mapping:
- `index.html` → `HOME`
- `oven-interface/index.html` → `OVEN`
- `universal-design-q-tip-grip/index.html` → `QTIP`
- `stack-overflow-user-research/index.html` → `STACK`
- `ux-engineering/index.html` → `ACCULYNX`

Pattern: `VITE_{PREFIX}_{PROPERTY}`

Example for home page:
```env
VITE_HOME_TITLE=Andrew McConville Design
VITE_HOME_DESCRIPTION=UX professional with a background in B2B SaaS applications.
VITE_HOME_CANONICAL=
VITE_HOME_OG_IMAGE=assets/about/home-social-media.png
VITE_HOME_PUBLISHED=2018-03-02T18:00:00-05:00
VITE_HOME_SCHEMA_TYPE=Person
```

## Adding a New Page

1. **Create the HTML file** in the appropriate directory:
   ```html
   <!doctype html>
   <html prefix="og: http://ogp.me/ns#" lang="en">
     <head>
       <!-- @include ./src/templates/head.html -->
     </head>
     <body>
       <div id="app"></div>
       <script type="module" src="/src/YourComponent.ts"></script>
     </body>
   </html>
   ```

2. **Add to Vite config** (`vite.config.ts`):
   ```typescript
   build: {
     rollupOptions: {
       input: {
         // ... existing entries
         YourPage: resolve(__dirname, 'your-directory/index.html'),
       }
     }
   }
   ```

3. **Add to plugin mapping** (`vite-plugin-html-env.ts`):
   ```typescript
   const pageMapping: Record<string, string> = {
     // ... existing mappings
     'your-directory/index.html': 'YOUR_PREFIX'
   };
   ```

4. **Add environment variables** to `.env`:
   ```env
   # Your New Page
   VITE_YOUR_PREFIX_TITLE=Your Page Title - Andrew McConville Design
   VITE_YOUR_PREFIX_DESCRIPTION=Description of your page content
   VITE_YOUR_PREFIX_CANONICAL=your-directory/  # Include trailing slash
   VITE_YOUR_PREFIX_OG_IMAGE=assets/your-page/social-media.png
   VITE_YOUR_PREFIX_PUBLISHED=2024-01-01T12:00:00-05:00
   VITE_YOUR_PREFIX_SCHEMA_TYPE=Article
   ```

## Updating Page Metadata

### Common Updates

**Change a page title:**
```env
VITE_OVEN_TITLE=New Title Here - Andrew McConville Design
```

**Update a description:**
```env
VITE_OVEN_DESCRIPTION=Your new, compelling description that will appear in search results
```

**Change the social media image:**
```env
VITE_OVEN_OG_IMAGE=assets/oven-interface/new-social-preview.png
```
Note: Image should be 1200x630px minimum for best results

**Update published date:**
```env
VITE_OVEN_PUBLISHED=2024-06-01T10:00:00-05:00
```

### Schema.org Types
Available types for `VITE_*_SCHEMA_TYPE`:
- `Person` - For personal/profile pages
- `Article` - For case studies, blog posts
- `WebPage` - For general pages
- `Organization` - For company pages

## Available Placeholders

In `src/templates/head.html`, these placeholders are available:

### Page-Specific
- `%VITE_PAGE_TITLE%` - Page title
- `%VITE_PAGE_DESCRIPTION%` - Meta description
- `%VITE_PAGE_PUBLISHED%` - Article published date
- `%VITE_PAGE_SCHEMA_TYPE%` - Schema.org type

### Global
- `%VITE_REPO_NAME%` - Repository name for paths
- `%VITE_AUTHOR%` - Author name
- `%VITE_TWITTER%` - Twitter handle
- `%VITE_FB_APP_ID%` - Facebook App ID
- `%VITE_FB_AUTHOR%` - Facebook author URL

### Special (Auto-computed)
- `%VITE_FULL_URL%` - Full canonical URL
- `%VITE_FULL_IMAGE_URL%` - Full image URL with domain

## Testing Your Changes

### Local Development
```bash
# Start dev server
npm run dev

# View at http://localhost:5173
# Note: Some meta tag features may not work in dev mode
```

### Build and Preview
```bash
# Build the project
npm run build

# Preview the built files
npm run preview

# Check the generated HTML
cat dist/index.html
```

### Verify Meta Tags
1. Build the project: `npm run build`
2. Check generated files in `dist/` folder
3. Look for replaced values (no `%VITE_*%` placeholders should remain)

### Test Social Media Preview
Use these tools to test how your pages will appear when shared:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Troubleshooting

### Environment variables not replacing
1. Check variable name matches pattern: `VITE_{PREFIX}_{PROPERTY}`
2. Verify page mapping in `vite-plugin-html-env.ts`
3. Ensure `.env` file is in project root
4. Try cleaning and rebuilding: `rm -rf dist && npm run build`

### URLs have missing slashes
- Check that `VITE_BASE_URL` includes protocol: `https://...`
- Canonical paths should not start with `/`
- Image paths should be relative: `assets/...` not `/assets/...`

### Circular Redirect (Facebook Sharing Debugger)
- GitHub Pages requires trailing slashes for directories to avoid redirects
- The system automatically handles this:
  - Home page: no trailing slash (e.g., `https://site.com`)
  - Subdirectory pages: with trailing slash (e.g., `https://site.com/page/`)
- In `.env`, include trailing slashes in canonical paths for subdirectories
- Example: `VITE_OVEN_CANONICAL=oven-interface/` (with slash)

### Build errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist .vite
```

### Meta tags not showing in social previews
1. Deploy your changes first
2. Wait a few minutes for CDN cache
3. Use social media debuggers to force re-crawl
4. Clear social platform cache:
   - Facebook: Use Sharing Debugger's "Scrape Again"
   - Twitter: Cards update automatically after ~7 days

## Best Practices

1. **Always include company name** in titles: "Page Name - Andrew McConville Design"
2. **Keep descriptions under 160 characters** for search results
3. **Use high-quality images** for social media (1200x630px minimum)
4. **Test locally** before deploying
5. **Commit `.env` file** since it contains public metadata
6. **Use consistent naming** for image assets
7. **Update published dates** when making significant content changes

## Example Workflow

### Updating the Oven Interface case study:

1. Update metadata in `.env`:
   ```env
   VITE_OVEN_TITLE=Smart Oven HMI Design Case Study - Andrew McConville Design
   VITE_OVEN_DESCRIPTION=Redesigning kitchen appliance interfaces for the connected home era
   VITE_OVEN_OG_IMAGE=assets/oven-interface/hero-preview.png
   ```

2. Add the new image to `public/assets/oven-interface/hero-preview.png`

3. Build and test:
   ```bash
   npm run build
   npm run preview
   ```

4. Verify in browser and social media debuggers

5. Deploy:
   ```bash
   npm run deploy
   ```

## Need Help?

- Check existing pages for examples
- Review `src/templates/head.html` for available placeholders
- Ensure all paths are relative to the project root
- Use browser DevTools to inspect generated meta tags
