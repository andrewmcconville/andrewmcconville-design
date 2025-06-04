# How to Add a New Route/Page

This guide explains how to add a new route (page/section) to the andrewmcconville.design project. This process ensures your new page is available both in the Vue SPA and as a static entry point for GitHub Pages.

---

## 1. Create the Vue Component
- Add your new page as a Vue component in `src/components/`.
  - Example: `src/components/MyNewPage.vue`

## 2. Register the Route in Vue Router
- Edit `src/router/index.ts`.
- Import your component at the top:
  ```ts
  import MyNewPage from '../components/MyNewPage.vue';
  ```
- Add a new route object to the `routes` array:
  ```ts
  {
    path: '/my-new-page/',
    name: 'MyNewPage',
    component: MyNewPage,
  },
  ```

## 3. Update the Root Component Map
- Edit `src/main.ts`.
- Add your new route to the `pathComponentMap`:
  ```ts
  import MyNewPage from './components/MyNewPage.vue';
  // ...existing code...
  const pathComponentMap: Record<string, any> = {
    // ...existing code...
    '/my-new-page/': MyNewPage,
  };
  ```

## 4. Add to Entry Template Script
- Edit `scripts/copy-entry-template.js`.
- Add your new entry point to the `targets` array:
  ```js
  path.resolve(__dirname, '../my-new-page/index.html'),
  ```

## 5. Add Route Meta to Vite .env
- Edit `.env`.
Add meta data prefixed with `VITE_`:
  ```env
  VITE_PAGE_TITLE="My New Page Title"
  VITE_PAGE_DESCRIPTION="Description for My New Page."
  VITE_PAGE_SCHEMA_TYPE="WebPage"
  VITE_FULL_IMAGE_URL="/andrewmcconville-design/assets/your-image.png"
  VITE_FULL_URL="https://andrewmcconville.github.io/andrewmcconville-design/my-new-page/"
  ```

## 6. Add Directory to .gitignore
- Add the generated directory to `.gitignore`.

## 7. Test Locally
- Run `npm run dev` to test the new route in development.
- The script will generate the new directory and index.html as needed.

## 8. Deploy
- On push to `main`, the GitHub Action will generate the static entry point and deploy it to GitHub Pages.

---

## Summary Checklist
- [ ] Create Vue component in `src/components/`
- [ ] Register route in `src/router/index.ts`
- [ ] Add to `pathComponentMap` in `src/main.ts`
- [ ] Add to `targets` in `scripts/copy-entry-template.js`
- [ ] Add route meta to Vite .env
- [ ] Add directory to `.gitignore`
- [ ] Test locally and deploy

---

**All files to update for a new page:**
- `src/components/MyNewPage.vue` (create)
- `src/router/index.ts` (add route)
- `src/main.ts` (add to pathComponentMap)
- `scripts/copy-entry-template.js` (add to targets)
- `.env` (add meta, path: .env in project root)
- `.gitignore` (create in directory)
