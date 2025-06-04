# How to Add a New Route/Page

This guide explains how to add a new route (page/section) to the andrewmcconville.design project. This process ensures your new page is available both in the Vue SPA and as a static entry point for GitHub Pages.

---

## 1. Create the Vue Component
- Add your new page as a Vue component in `src/components/`.
  - Example: `src/components/MyNewPage.vue`

## 2. Register the Route in Vue Router
- Edit `src/router/index.ts`.
- Add a new route object to the `routes` array:
  ```ts
  {
    path: '/my-new-page/',
    name: 'MyNewPage',
    component: MyNewPage,
    // Optionally add meta: { title: 'My New Page' }
  },
  ```
- Import your component at the top:
  ```ts
  import MyNewPage from '../components/MyNewPage.vue';
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

## 5. Add a Navigation Link (Optional)
- Edit `src/App.vue` to add a `<RouterLink>` for your new page:
  ```vue
  <li><RouterLink to="/my-new-page/">My New Page</RouterLink></li>
  ```

## 6. (Optional) Add Directory to .gitignore
- If you do not want to track the generated directory in git, add it to `.gitignore`.

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
- [ ] Add navigation link in `src/App.vue` (optional)
- [ ] Test locally and deploy

---

**All five files to update for a new page:**
- `src/components/MyNewPage.vue` (create)
- `src/router/index.ts` (add route)
- `src/main.ts` (add to pathComponentMap)
- `scripts/copy-entry-template.js` (add to targets)
- `src/App.vue` (add navigation link)
