# Technical Implementation Guide

## Architecture Overview

This document provides technical details about the environment variable system implementation for developers who need to understand or modify the system.

## System Components

### 1. Vite Plugin (`vite-plugin-html-env.ts`)

The custom Vite plugin handles:
- Loading environment variables using Vite's `loadEnv`
- Processing HTML files during build
- Template inclusion via `<!-- @include -->`
- Variable replacement with page-specific prefixes

**Key Functions:**

```typescript
// Plugin initialization
export function htmlEnv(_options: HtmlEnvOptions = {}): Plugin

// Environment variable replacement
function replaceEnvVariables(
  content: string, 
  pagePrefix: string, 
  env: Record<string, string>
): string
```

### 2. Head Template (`src/templates/head.html`)

Contains all meta tags with placeholders:
- Standard meta tags (viewport, robots, etc.)
- Open Graph tags for social media
- Twitter Card tags
- JSON-LD structured data
- Icon links for various platforms

### 3. Page Mapping Configuration

```typescript
const pageMapping: Record<string, string> = {
  'index.html': 'HOME',
  'oven-interface/index.html': 'OVEN',
  'universal-design-q-tip-grip/index.html': 'QTIP',
  'stack-overflow-user-research/index.html': 'STACK',
  'ux-engineering/index.html': 'ACCULYNX'
};
```

## How It Works

### Build Process Flow

1. **Plugin Registration**
   - Vite loads the plugin from `vite.config.ts`
   - Plugin hooks into the build process

2. **Environment Loading**
   - `configResolved` hook loads all env variables
   - Uses Vite's `loadEnv` to read `.env` file

3. **HTML Processing**
   - `transformIndexHtml` hook processes each HTML file
   - Determines page prefix from file path
   - Looks for `<!-- @include -->` directives

4. **Template Inclusion**
   - Reads template file from disk
   - Replaces environment variables in template
   - Injects processed content into HTML

5. **Variable Replacement**
   - Page-specific variables (`%VITE_PAGE_*%`)
   - Global variables (`%VITE_*%`)
   - Special computed variables (`%VITE_FULL_URL%`)

### Variable Resolution Order

1. **Page-specific variables** are checked first
   - Pattern: `VITE_{PREFIX}_{PROPERTY}`
   - Example: `VITE_OVEN_TITLE`

2. **Global variables** are fallbacks
   - Pattern: `VITE_{PROPERTY}`
   - Example: `VITE_AUTHOR`

3. **Special variables** are computed
   - `VITE_FULL_URL`: Combines base URL + canonical
   - `VITE_FULL_IMAGE_URL`: Combines base URL + image path

## Code Examples

### Adding a New Special Variable

In `vite-plugin-html-env.ts`, add to `replaceEnvVariables`:

```typescript
// Add a new computed variable
content = content.replace(/%VITE_CUSTOM_VAR%/g, () => {
  const part1 = env.VITE_PART1 || '';
  const part2 = env[`VITE_${pagePrefix}_PART2`] || '';
  return `${part1}-${part2}`;
});
```

### Creating a Custom Template

1. Create template file:
```html
<!-- src/templates/custom-section.html -->
<section class="custom">
  <h1>%VITE_PAGE_TITLE%</h1>
  <p>%VITE_PAGE_DESCRIPTION%</p>
</section>
```

2. Use in HTML:
```html
<body>
  <!-- @include ./src/templates/custom-section.html -->
</body>
```

### Extending Page Mapping

Add new page type to mapping:

```typescript
const pageMapping: Record<string, string> = {
  // ... existing mappings
  'case-studies/new-project/index.html': 'NEW_PROJECT'
};
```

## Environment Variable Patterns

### Naming Conventions

```
VITE_{SCOPE}_{PROPERTY}

Where:
- SCOPE: Either a page prefix or global
- PROPERTY: The metadata field name
```

### Common Properties

```env
# Required for each page
VITE_{PREFIX}_TITLE
VITE_{PREFIX}_DESCRIPTION
VITE_{PREFIX}_CANONICAL

# Optional but recommended
VITE_{PREFIX}_OG_IMAGE
VITE_{PREFIX}_PUBLISHED
VITE__SCHEMA_TYPE
```

## Development Tips

### Debugging Variable Replacement

Add console logging to the plugin:

```typescript
console.log(`Processing: ${filePath} with prefix: ${pagePrefix}`);
console.log(`Available env vars:`, Object.keys(env).filter(k => k.includes(pagePrefix)));
```

### Testing Without Building

Create a test script:

```javascript
// test-env.js
import { loadEnv } from 'vite';

const env = loadEnv('production', process.cwd(), '');
console.log('Loaded variables:', env);
```

### Hot Reload for Templates

Currently, template changes require a rebuild. To add hot reload:

```typescript
// In plugin
configureServer(server) {
  server.watcher.add(path.resolve('src/templates/*.html'));
  server.watcher.on('change', (file) => {
    if (file.includes('templates')) {
      server.ws.send({ type: 'full-reload' });
    }
  });
}
```

## Performance Considerations

### Build Time

- Template reading is synchronous (could be async)
- Variable replacement uses regex (efficient for small files)
- Each HTML file processed independently

### Optimization Ideas

1. **Cache templates** between builds
2. **Parallel processing** for multiple HTML files
3. **Pre-compile regex patterns**

Example optimization:

```typescript
// Cache compiled regex patterns
const regexCache = new Map<string, RegExp>();

function getRegex(pattern: string): RegExp {
  if (!regexCache.has(pattern)) {
    regexCache.set(pattern, new RegExp(pattern, 'g'));
  }
  return regexCache.get(pattern)!;
}
```

## Security Considerations

### Environment Variable Exposure

- Only `VITE_` prefixed variables are exposed
- Build-time only (not runtime)
- Safe to commit `.env` for public metadata

### Template Injection

- No user input in templates
- File paths validated before reading
- No dynamic code execution

## Integration with CI/CD

### GitHub Actions

The system works seamlessly with GitHub Actions:

```yaml
# .github/workflows/deploy.yml
- name: Build
  run: npm run build
  # .env file is automatically used
```

### Custom Environments

For staging/production differences:

```bash
# .env.staging
VITE_BASE_URL=https://staging.example.com

# .env.production  
VITE_BASE_URL=https://andrewmcconville.github.io
```

Build with:
```bash
npm run build -- --mode staging
```

## Extending the System

### Adding i18n Support

```typescript
const localeMappingpageMapping: Record<string, Record<string, string>> = {
  'en': {
    'index.html': 'HOME_EN',
    // ...
  },
  'es': {
    'index.html': 'HOME_ES',
    // ...
  }
};
```

### Dynamic Meta Tags

For dynamic content (e.g., blog posts):

```typescript
// Generate .env programmatically
const posts = await getBlogPosts();
const envContent = posts.map(post => `
VITE_BLOG_${post.id}_TITLE=${post.title}
VITE_BLOG_${post.id}_DESCRIPTION=${post.excerpt}
`).join('\n');
```

### A/B Testing

Support multiple versions:

```typescript
const versionedMapping = {
  'index.html': process.env.AB_TEST === 'B' ? 'HOME_B' : 'HOME_A'
};
```

## Troubleshooting Deep Dive

### Common Issues

1. **Variables not replacing**
   - Check `loadEnv` is reading the file
   - Verify variable naming matches pattern
   - Ensure page mapping is correct

2. **Template not found**
   - Check file path resolution
   - Verify working directory
   - Look for typos in include path

3. **Build fails**
   - Check TypeScript compilation
   - Verify all imports resolve
   - Look for syntax errors in templates

### Debug Mode

Add verbose logging:

```typescript
const DEBUG = process.env.DEBUG_HTML_ENV === 'true';

if (DEBUG) {
  console.log('[html-env] Processing:', filePath);
  console.log('[html-env] Page prefix:', pagePrefix);
  console.log('[html-env] Available vars:', Object.keys(env).length);
}
```

Run with:
```bash
DEBUG_HTML_ENV=true npm run build
```

## Future Enhancements

### Planned Features

1. **Template inheritance** - Base templates with overrides
2. **Conditional includes** - Include based on env vars
3. **Template functions** - Simple computations in templates
4. **Watch mode optimization** - Better dev experience

### Contributing

To contribute improvements:

1. Keep backward compatibility
2. Add tests for new features
3. Update documentation
4. Follow existing patterns

## Resources

- [Vite Plugin API](https://vitejs.dev/guide/api-plugin.html)
- [HTML Transform Hook](https://vitejs.dev/guide/api-plugin.html#transformindexhtml)
- [Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
