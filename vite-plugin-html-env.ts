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
  
  return {
    name: 'vite-plugin-html-env',
    configResolved(config) {
      env = loadEnv(config.mode, process.cwd(), '');
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
            templateContent = replaceEnvVariables(templateContent, pagePrefix, env);
            
            return templateContent;
          }
          console.warn(`Template file not found: ${fullPath}`);
          return match;
        });
        
        // Also replace any remaining environment variables in the HTML
        html = replaceEnvVariables(html, pagePrefix, env);
        
        return html;
      }
    }
  };
}

function replaceEnvVariables(content: string, pagePrefix: string, env: Record<string, string>): string {
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
    let url = `${baseUrl}/${canonical}`;
    // Fix multiple slashes except after protocol
    url = url.replace(/([^:])\/\/+/g, '$1/');
    // Remove trailing slash
    url = url.replace(/\/$/, '');
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
