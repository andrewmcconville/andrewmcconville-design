// Copies a single entry.html template to all subdirectory entry points for GitHub Pages

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.resolve(__dirname, '../src/templates/entry.html');
// List of subdirectory index.html targets
const targets = [
  path.resolve(__dirname, '../index.html'), // root index.html
  path.resolve(__dirname, '../oven-interface/index.html'),
  path.resolve(__dirname, '../stack-overflow-user-research/index.html'),
  path.resolve(__dirname, '../universal-design-q-tip-grip/index.html'),
  path.resolve(__dirname, '../ux-engineering/index.html'),
];

try {
  const template = fs.readFileSync(templatePath, 'utf8');
  for (const target of targets) {
    const dir = path.dirname(target);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(target, template, 'utf8');
    console.log(`Copied entry template to ${target}`);
  }
} catch (err) {
  console.error('Error copying entry template:', err);
  process.exit(1);
}
