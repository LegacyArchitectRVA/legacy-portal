/**
 * Script to inject Convex URL into built index.html for Cloudflare Pages
 * Usage: node scripts/inject-convex-url.mjs YOUR_CONVEX_URL
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distPath, 'index.html');

// Get Convex URL from command line
const convexUrl = process.argv[2];

if (!convexUrl) {
  console.error('Usage: node scripts/inject-convex-url.mjs YOUR_CONVEX_URL');
  console.error('Example: node scripts/inject-convex-url.mjs https://moonlit-mongoose-193.convex.cloud');
  process.exit(1);
}

async function injectConvexUrl() {
  try {
    // Read the built index.html
    let html = await fs.readFile(indexPath, 'utf-8');
    
    // Inject Convex URL as a global variable
    const injectScript = `<script>window.CONVEX_URL = "${convexUrl}";</script>`;
    
    // Insert after the opening <head> tag
    html = html.replace(
      /<head>/,
      `<head>${injectScript}`
    );
    
    // Write back
    await fs.writeFile(indexPath, html);
    
    console.log('✅ Successfully injected Convex URL into index.html');
    console.log(`   Convex URL: ${convexUrl}`);
  } catch (error) {
    console.error('❌ Failed to inject Convex URL:', error.message);
    process.exit(1);
  }
}

injectConvexUrl();
