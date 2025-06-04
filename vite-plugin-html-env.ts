import type { Plugin } from 'vite';
import { loadEnv } from 'vite';
import fs from 'fs';
import path from 'path';

interface HtmlEnvOptions {
  templatePath?: string;
}

// Map HTML files to their environment variable prefixes
const pageMapping: Record<string, string> = {
  'index.html': 'HOME',
  'oven-interface/index.html': 'OVEN',
  'universal-design-q-tip-grip/index.html': 'QTIP',
  'stack-overflow-user-research/index.html': 'STACK',
  'ux-engineering/index.html': 'ACCULYNX'
};

export function htmlEnv(_options: HtmlEnvOptions = {}): Plugin {
  let env: Record<string, string> = {};
  let mode: string = '';
  
  return {
    name: 'vite-plugin-html-env',
    configResolved(config) {
      env = loadEnv(config.mode, process.cwd(), '');
      mode = config.mode;
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html: string, ctx: any) {
        // Determine which page we're processing
        const filePath = ctx.filename.replace(process.cwd(), '').replace(/^\//, '');
        const pagePrefix = pageMapping[filePath] || 'HOME';
        
        // Read the template file if there's an include directive
        const includeRegex = /<!-- @include (.+?) -->/g;
        html = html.replace(includeRegex, (match, includePath) => {
          const fullPath = path.resolve(process.cwd(), includePath.trim());
          if (fs.existsSync(fullPath)) {
            let templateContent = fs.readFileSync(fullPath, 'utf-8');
            
            // Replace environment variables in the template
            templateContent = replaceEnvVariables(templateContent, pagePrefix, env, mode);
            
            return templateContent;
          }
          console.warn(`Template file not found: ${fullPath}`);
          return match;
        });
        
        // Also replace any remaining environment variables in the HTML
        html = replaceEnvVariables(html, pagePrefix, env, mode);
        
        return html;
      }
    }
  };
}

function replaceEnvVariables(content: string, pagePrefix: string, env: Record<string, string>, mode: string): string {
  // In development, Vite automatically prepends its base path to absolute URLs
  // So we replace /%VITE_REPO_NAME%/ with just / to create absolute paths
  // In production, we need the full path with repo name
  if (mode === 'development') {
    // Replace with just / for absolute paths that Vite will process
    content = content.replace(/\/%VITE_REPO_NAME%\//g, '/');
  } else {
    // In production, replace with the actual repo name
    const assetBase = `/${env.VITE_REPO_NAME}`;
    content = content.replace(/\/%VITE_REPO_NAME%\//g, `${assetBase}/`);
  }
  
  // Replace page-specific variables first
  content = content.replace(/%VITE_PAGE_(\w+)%/g, (match, varName) => {
    const envKey = `VITE_${pagePrefix}_${varName}`;
    return env[envKey] || match;
  });
  
  // Then replace global variables
  content = content.replace(/%VITE_(\w+)%/g, (match, varName) => {
    const envKey = `VITE_${varName}`;
    return env[envKey] || match;
  });
  
  // Handle special cases like full URLs
  content = content.replace(/%VITE_FULL_URL%/g, () => {
    const baseUrl = env.VITE_BASE_URL || '';
    const canonical = env[`VITE_${pagePrefix}_CANONICAL`] || '';
    
    // For home page (empty canonical), return base URL without trailing slash
    if (!canonical) {
      return baseUrl;
    }
    
    let url = `${baseUrl}/${canonical}`;
    // Fix multiple slashes except after protocol
    url = url.replace(/([^:])\/\/+/g, '$1/');
    
    // For GitHub Pages, keep trailing slash for directories
    // This prevents redirect loops
    if (!url.endsWith('.html') && !url.endsWith('/')) {
      url = url + '/';
    }
    
    return url;
  });
  
  content = content.replace(/%VITE_FULL_IMAGE_URL%/g, () => {
    const baseUrl = env.VITE_BASE_URL || '';
    const image = env[`VITE_${pagePrefix}_OG_IMAGE`] || '';
    let url = `${baseUrl}/${image}`;
    // Fix multiple slashes except after protocol
    url = url.replace(/([^:])\/\/+/g, '$1/');
    return url;
  });
  
  return content;
}

export default htmlEnv;
