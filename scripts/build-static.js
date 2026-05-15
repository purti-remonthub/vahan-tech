import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distClient = path.join(__dirname, '../dist/client');
const netlifyStatic = path.join(__dirname, '../.netlify/static');

// Create .netlify/static directory
if (!fs.existsSync(netlifyStatic)) {
  fs.mkdirSync(netlifyStatic, { recursive: true });
}

// Copy all files from dist/client to .netlify/static
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('📦 Copying client build to Netlify static directory...');
copyRecursiveSync(distClient, netlifyStatic);

// Find the main JS and CSS files
const assetsDir = path.join(netlifyStatic, 'assets');
const files = fs.readdirSync(assetsDir);
const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
const cssFile = files.find(f => f.startsWith('styles-') && f.endsWith('.css'));

// Create index.html
const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VahanTech - Race Data Analysis Workshop</title>
    ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}" />` : ''}
  </head>
  <body>
    <div id="root"></div>
    ${jsFile ? `<script type="module" src="/assets/${jsFile}"></script>` : ''}
  </body>
</html>`;

fs.writeFileSync(path.join(netlifyStatic, 'index.html'), html);
console.log('✅ Created index.html');
console.log('✅ Static build ready for Netlify!');
