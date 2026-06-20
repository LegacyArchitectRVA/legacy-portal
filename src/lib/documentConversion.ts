/**
 * Document Conversion Utilities
 * 
 * Converts Affine JSON, Markdown, and other formats to styled HTML and PDF
 * Supports two output styles:
 * - Black & Gold Luxury (Legacy Architect brand style)
 * - Printer-friendly (white background, black text)
 */

import { chapters, PRIVACY_NOTE } from "../data/chapters";

// ============================================
// Types
// ============================================

export interface ConversionOptions {
  style: "luxury" | "print";
  includeHeader: boolean;
  includeFooter: boolean;
  includeTOC: boolean;
  title?: string;
}

export interface AffineBlock {
  id: string;
  type: "text" | "paragraph" | "heading" | "list" | "bullet" | "numbered" | "code" | "divider" | "image" | "table" | "frame";
  text?: string;
  level?: number;
  items?: AffineBlock[];
  children?: AffineBlock[];
  language?: string;
  url?: string;
  rows?: AffineBlock[][];
  [key: string]: any;
}

export interface AffinePage {
  id: string;
  title?: string;
  blocks: AffineBlock[];
}

export interface AffineDocument {
  pages: AffinePage[];
  [key: string]: any;
}

// ============================================
// Main Conversion Functions
// ============================================

/**
 * Convert Affine JSON file to styled HTML
 */
export async function convertAffineToHtml(
  file: File,
  options: ConversionOptions = { style: "luxury", includeHeader: true, includeFooter: true, includeTOC: true }
): Promise<string> {
  const text = await file.text();
  const affineData: AffineDocument = JSON.parse(text);
  
  const pages = affineData.pages || [];
  const title = affineData.title || pages[0]?.title || "Untitled Document";
  
  let htmlContent = "";
  const tocItems: { level: number; text: string; id: string }[] = [];
  
  for (const page of pages) {
    const pageTitle = page.title || `Page ${pages.indexOf(page) + 1}`;
    
    // Add page title as heading
    if (pages.length > 1) {
      htmlContent += `<h1 class="page-title" id="page-${page.id}">${escapeHtml(pageTitle)}</h1>`;
      tocItems.push({ level: 1, text: pageTitle, id: `page-${page.id}` });
    }
    
    // Process blocks
    for (const block of page.blocks || []) {
      const { html, tocItem } = processAffineBlock(block, pages.length > 1);
      htmlContent += html;
      if (tocItem) {
        tocItems.push(tocItem);
      }
    }
  }
  
  // Generate TOC if requested
  let tocHtml = "";
  if (options.includeTOC && tocItems.length > 0) {
    tocHtml = generateTOC(tocItems);
  }
  
  // Generate final HTML with selected style
  if (options.style === "print") {
    return generatePrintHtml(htmlContent, tocHtml, title, options);
  } else {
    return generateLuxuryHtml(htmlContent, tocHtml, title, options);
  }
}

/**
 * Convert Markdown file to styled HTML
 */
export async function convertMarkdownToHtml(
  file: File,
  options: ConversionOptions = { style: "luxury", includeHeader: true, includeFooter: true, includeTOC: true }
): Promise<string> {
  const text = await file.text();
  const title = extractTitleFromMarkdown(text) || "Untitled Document";
  
  // Parse markdown to HTML
  const { html: markdownHtml, tocItems } = parseMarkdown(text);
  
  // Generate TOC if requested
  let tocHtml = "";
  if (options.includeTOC && tocItems.length > 0) {
    tocHtml = generateTOC(tocItems);
  }
  
  // Generate final HTML with selected style
  if (options.style === "print") {
    return generatePrintHtml(markdownHtml, tocHtml, title, options);
  } else {
    return generateLuxuryHtml(markdownHtml, tocHtml, title, options);
  }
}

/**
 * Convert HTML to PDF-ready HTML (with print styles)
 */
export async function convertHtmlToPdf(
  file: File,
  options: ConversionOptions = { style: "print", includeHeader: true, includeFooter: true, includeTOC: false }
): Promise<string> {
  const text = await file.text();
  const title = extractTitleFromHtml(text) || "Untitled Document";
  
  // Ensure print styles are present
  const htmlWithPrintStyles = ensurePrintStyles(text);
  
  // Generate final HTML with print style
  return generatePrintHtml(htmlWithPrintStyles, "", title, options);
}

/**
 * Convert Affine directly to PDF-ready HTML
 */
export async function convertAffineToPdf(
  file: File,
  options: ConversionOptions = { style: "print", includeHeader: true, includeFooter: true, includeTOC: true }
): Promise<string> {
  // Convert to HTML first, then ensure print styles
  const html = await convertAffineToHtml(file, { ...options, style: "luxury" });
  const htmlWithPrintStyles = ensurePrintStyles(html);
  
  // Replace luxury styles with print styles
  return htmlWithPrintStyles
    .replace(/style="[^"]*"/g, '')
    .replace(/class="[^"]*"/g, '')
    .replace(/<style>[\s\S]*?<\/style>/g, `<style>
      ${getPrintStyles()}
      ${getBaseStyles()}
    </style>`);
}

// ============================================
// Affine Processing
// ============================================

function processAffineBlock(block: AffineBlock, inMultiPage: boolean): { html: string; tocItem?: { level: number; text: string; id: string } } {
  const id = `block-${block.id || Math.random().toString(36).substr(2, 9)}`;
  
  switch (block.type) {
    case "heading":
      const level = Math.min(6, Math.max(1, block.level || 1));
      const headingText = block.text || block.content || "";
      const headingHtml = `<h${level} id="${id}" class="heading-${level}">${escapeHtml(headingText)}</h${level}>`;
      return {
        html: headingHtml,
        tocItem: { level, text: headingText, id }
      };
    
    case "text":
    case "paragraph":
      return { html: `<p class="paragraph">${escapeHtml(block.text || "")}</p>` };
    
    case "list":
    case "bullet":
      return processListBlock(block, "ul");
    
    case "numbered":
      return processListBlock(block, "ol");
    
    case "code":
      const language = block.language || "text";
      return {
        html: `<pre class="code-block language-${language}"><code>${escapeHtml(block.text || "")}</code></pre>`
      };
    
    case "divider":
      return { html: `<hr class="divider" />` };
    
    case "image":
      const url = block.url || block.src || "";
      const alt = block.alt || "Image";
      return {
        html: `<figure class="image-container"><img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}" class="image" /></figure>`
      };
    
    case "table":
      return processTableBlock(block);
    
    case "frame":
      // Process frame children
      let childrenHtml = "";
      for (const child of block.children || []) {
        childrenHtml += processAffineBlock(child, inMultiPage).html;
      }
      return { html: `<div class="frame">${childrenHtml}</div>` };
    
    default:
      return { html: "" };
  }
}

function processListBlock(block: AffineBlock, tag: "ul" | "ol"): { html: string } {
  const items = block.items || [];
  const children = block.children || [];
  const listItems = items.length > 0 ? items : children;
  
  const listHtml = listItems
    .map((item: any) => {
      const text = item.text || item.content || "";
      const itemChildren = item.children || [];
      
      let nestedHtml = "";
      if (itemChildren.length > 0) {
        nestedHtml = processListBlock(item, tag).html;
      }
      
      return `<li class="list-item">${escapeHtml(text)}${nestedHtml}</li>`;
    })
    .join("");
  
  return { html: `<${tag} class="list ${tag}">${listHtml}</${tag}>` };
}

function processTableBlock(block: AffineBlock): { html: string } {
  const rows = block.rows || [];
  
  if (rows.length === 0) {
    return { html: "" };
  }
  
  const tableHtml = rows
    .map((row: AffineBlock[], rowIndex: number) => {
      const isHeader = rowIndex === 0;
      const tag = isHeader ? "th" : "td";
      
      const cells = row
        .map((cell: AffineBlock) => {
          const text = cell.text || cell.content || "";
          return `<${tag} class="table-cell ${isHeader ? 'header' : 'data'}">${escapeHtml(text)}</${tag}>`;
        })
        .join("");
      
      return `<tr class="table-row ${isHeader ? 'header' : 'data'}">${cells}</tr>`;
    })
    .join("");
  
  return {
    html: `<table class="table"><thead>${rows[0] ? rows[0].map(() => "").join("") : ""}</thead><tbody>${tableHtml}</tbody></table>`
  };
}

// ============================================
// Markdown Processing
// ============================================

function parseMarkdown(markdown: string): { html: string; tocItems: { level: number; text: string; id: string }[] } {
  const tocItems: { level: number; text: string; id: string }[] = [];
  let html = "";
  const lines = markdown.split("\n");
  
  let inCodeBlock = false;
  let codeLanguage = "";
  let inList = false;
  let listType: "ul" | "ol" = "ul";
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Code blocks
    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        // End code block
        html += `</pre></div>`;
        inCodeBlock = false;
        codeLanguage = "";
      } else {
        // Start code block
        codeLanguage = trimmed.substring(3).trim();
        html += `<div class="code-block-container"><pre class="code-block language-${codeLanguage}"><code>`;
        inCodeBlock = true;
      }
      continue;
    }
    
    if (inCodeBlock) {
      html += escapeHtml(line) + "\n";
      continue;
    }
    
    // Headings
    if (trimmed.startsWith("#")) {
      const match = trimmed.match(/^(#+)\s+(.+)$/);
      if (match) {
        const level = Math.min(6, match[1].length);
        const text = match[2];
        const id = generateIdFromText(text);
        html += `<h${level} id="${id}" class="heading-${level}">${escapeHtml(text)}</h${level}>`;
        tocItems.push({ level, text, id });
        continue;
      }
    }
    
    // Horizontal rule
    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      html += `<hr class="divider" />`;
      continue;
    }
    
    // Blockquotes
    if (trimmed.startsWith(">")) {
      html += `<blockquote class="blockquote">${escapeHtml(trimmed.substring(1).trim())}</blockquote>`;
      continue;
    }
    
    // Lists
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ") || trimmed.startsWith("+ ")) {
      if (!inList || listType !== "ul") {
        if (inList) html += `</${listType}>`;
        html += `<ul class="list ul">`;
        inList = true;
        listType = "ul";
      }
      html += `<li class="list-item">${escapeHtml(trimmed.substring(2).trim())}</li>`;
      continue;
    }
    
    if (/^\d+\.\s+.+/.test(trimmed)) {
      if (!inList || listType !== "ol") {
        if (inList) html += `</${listType}>`;
        html += `<ol class="list ol">`;
        inList = true;
        listType = "ol";
      }
      const text = trimmed.replace(/^\d+\.\s+/, "");
      html += `<li class="list-item">${escapeHtml(text)}</li>`;
      continue;
    }
    
    // End list if current line is not a list item
    if (inList && !trimmed.startsWith("  ") && !trimmed.startsWith("\t")) {
      html += `</${listType}>`;
      inList = false;
    }
    
    // Links
    if (trimmed.includes("[") && trimmed.includes("](")) {
      const linkHtml = trimmed.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        `<a href="$2" class="link">$1</a>`
      );
      html += `<p class="paragraph">${linkHtml}</p>`;
      continue;
    }
    
    // Images
    if (trimmed.includes("![") && trimmed.includes("](")) {
      const imageHtml = trimmed.replace(
        /!\[([^\]]+)\]\(([^)]+)\)/g,
        `<figure class="image-container"><img src="$2" alt="$1" class="image" /></figure>`
      );
      html += imageHtml;
      continue;
    }
    
    // Bold and Italic
    let processedLine = trimmed
      .replace(/\*\*([^*]+)\*\*/g, `<strong>$1</strong>`)
      .replace(/\*([^*]+)\*/g, `<em>$1</em>`)
      .replace(/__([^_]+)__/g, `<strong>$1</strong>`)
      .replace(/_([^_]+)_/g, `<em>$1</em>`);
    
    // If it's not empty, wrap in paragraph
    if (trimmed && !inList) {
      html += `<p class="paragraph">${processedLine}</p>`;
    }
  }
  
  // Close any open tags
  if (inCodeBlock) {
    html += `</code></pre></div>`;
  }
  if (inList) {
    html += `</${listType}>`;
  }
  
  return { html, tocItems };
}

function extractTitleFromMarkdown(markdown: string): string | null {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1] : null;
}

// ============================================
// HTML Generation
// ============================================

function generateLuxuryHtml(
  content: string,
  toc: string,
  title: string,
  options: ConversionOptions
): string {
  const header = options.includeHeader ? generateLuxuryHeader(title) : "";
  const footer = options.includeFooter ? generateLuxuryFooter() : "";
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} - Legacy Architect RVA</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    ${getBaseStyles()}
    ${getLuxuryStyles()}
    ${getPrintStyles()}
  </style>
</head>
<body class="luxury-style">
  ${header}
  <main class="main-content">
    ${toc}
    <div class="content">
      ${content}
    </div>
  </main>
  ${footer}
</body>
</html>`;
}

function generatePrintHtml(
  content: string,
  toc: string,
  title: string,
  options: ConversionOptions
): string {
  const header = options.includeHeader ? generatePrintHeader(title) : "";
  const footer = options.includeFooter ? generatePrintFooter() : "";
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} - Legacy Architect RVA</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    ${getBaseStyles()}
    ${getPrintStyles()}
  </style>
</head>
<body class="print-style">
  ${header}
  <main class="main-content">
    ${toc}
    <div class="content">
      ${content}
    </div>
  </main>
  ${footer}
</body>
</html>`;
}

function generateLuxuryHeader(title: string): string {
  return `
  <header class="header luxury-header">
    <div class="header-content">
      <div class="logo-container">
        <img src="data:image/svg+xml;base64,${getLogoSvg()}" alt="Legacy Architect RVA" class="logo" />
        <div class="logo-text">
          <span class="logo-title">LEGACY ARCHITECT</span>
          <span class="logo-subtitle">RVA</span>
        </div>
      </div>
      <h1 class="document-title">${escapeHtml(title)}</h1>
      <p class="document-subtitle">Life Manual Document</p>
    </div>
  </header>`;
}

function generatePrintHeader(title: string): string {
  return `
  <header class="header print-header">
    <div class="header-content">
      <h1 class="document-title">${escapeHtml(title)}</h1>
      <p class="document-subtitle">Legacy Architect RVA - Life Manual</p>
    </div>
  </header>`;
}

function generateLuxuryFooter(): string {
  return `
  <footer class="footer luxury-footer">
    <div class="footer-content">
      <p class="footer-text">Generated by Legacy Architect RVA</p>
      <p class="footer-date">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p class="privacy-note">${escapeHtml(PRIVACY_NOTE)}</p>
    </div>
  </footer>`;
}

function generatePrintFooter(): string {
  return `
  <footer class="footer print-footer">
    <div class="footer-content">
      <p class="footer-text">Generated by Legacy Architect RVA - ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p class="privacy-note">${escapeHtml(PRIVACY_NOTE)}</p>
    </div>
  </footer>`;
}

function generateTOC(items: { level: number; text: string; id: string }[]): string {
  if (items.length === 0) return "";
  
  let html = `
  <nav class="table-of-contents">
    <h2 class="toc-title">Table of Contents</h2>
    <ul class="toc-list">`;
  
  let currentLevel = 0;
  const stack: number[] = [];
  
  for (const item of items) {
    while (currentLevel > item.level) {
      html += `</ul></li>`;
      stack.pop();
      currentLevel--;
    }
    
    while (currentLevel < item.level - 1) {
      html += `<ul class="toc-list">`;
      stack.push(item.level);
      currentLevel++;
    }
    
    if (currentLevel === item.level - 1) {
      html += `<ul class="toc-list">`;
      stack.push(item.level);
      currentLevel++;
    }
    
    html += `<li class="toc-item level-${item.level}"><a href="#${item.id}" class="toc-link">${escapeHtml(item.text)}</a>`;
  }
  
  while (stack.length > 0) {
    html += `</ul></li>`;
    stack.pop();
  }
  
  html += `</ul></nav>`;
  
  return html;
}

// ============================================
// Styles
// ============================================

function getBaseStyles(): string {
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html {
      font-size: 110%;
    }
    
    body {
      font-family: 'Libre Baskerville', serif;
      line-height: 1.7;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .main-content {
      flex: 1;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      padding: 0 2rem;
    }
    
    .content {
      padding: 2rem 0;
    }
    
    /* Typography */
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Cinzel', serif;
      font-weight: 600;
      letter-spacing: 0.02em;
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    
    h1 { font-size: 2.5rem; }
    h2 { font-size: 2rem; }
    h3 { font-size: 1.75rem; }
    h4 { font-size: 1.5rem; }
    h5 { font-size: 1.25rem; }
    h6 { font-size: 1rem; }
    
    p {
      margin-bottom: 1.25rem;
    }
    
    /* Lists */
    ul, ol {
      margin-bottom: 1.25rem;
      padding-left: 1.75rem;
    }
    
    li {
      margin-bottom: 0.5rem;
    }
    
    /* Links */
    a {
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    /* Images */
    .image-container {
      margin: 2rem 0;
      text-align: center;
    }
    
    .image {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
    }
    
    /* Tables */
    .table {
      width: 100%;
      border-collapse: collapse;
      margin: 2rem 0;
    }
    
    .table-row.header {
      background: rgba(217, 204, 160, 0.1);
    }
    
    .table-cell {
      padding: 0.75rem 1rem;
      border: 1px solid rgba(217, 204, 160, 0.15);
    }
    
    .table-cell.header {
      font-family: 'Cinzel', serif;
      font-weight: 600;
      color: #d9cca0;
    }
    
    /* Code blocks */
    .code-block-container {
      margin: 2rem 0;
      overflow-x: auto;
    }
    
    .code-block {
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(217, 204, 160, 0.2);
      border-radius: 8px;
      padding: 1.25rem;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 0.875rem;
      line-height: 1.5;
      overflow-x: auto;
    }
    
    /* Divider */
    .divider {
      border: none;
      border-top: 1px solid rgba(217, 204, 160, 0.2);
      margin: 2rem 0;
    }
    
    /* Blockquotes */
    .blockquote {
      border-left: 3px solid rgba(217, 204, 160, 0.3);
      padding-left: 1.25rem;
      margin: 1.25rem 0;
      font-style: italic;
      color: rgba(232, 230, 225, 0.8);
    }
    
    /* Frames */
    .frame {
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(217, 204, 160, 0.1);
      border-radius: 8px;
      padding: 1.5rem;
      margin: 2rem 0;
    }
    
    /* Page title for multi-page documents */
    .page-title {
      border-bottom: 2px solid rgba(217, 204, 160, 0.3);
      padding-bottom: 0.75rem;
      margin: 2rem 0 1.5rem 0;
    }
  `;
}

function getLuxuryStyles(): string {
  return `
    /* Luxury Style - Black & Gold Theme */
    .luxury-style {
      background: #000000;
      color: #e8e6e1;
    }
    
    .luxury-header {
      background: linear-gradient(135deg, #000000 0%, #0a0a0a 100%);
      border-bottom: 1px solid rgba(217, 204, 160, 0.15);
      padding: 2rem 0;
      text-align: center;
    }
    
    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .logo {
      width: 60px;
      height: 60px;
      border-radius: 12px;
    }
    
    .logo-text {
      display: flex;
      flex-direction: column;
    }
    
    .logo-title {
      font-family: 'Cinzel', serif;
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #d9cca0;
      line-height: 1.2;
    }
    
    .logo-subtitle {
      font-family: 'Cinzel', serif;
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      color: #c1b085;
      text-transform: uppercase;
    }
    
    .document-title {
      font-family: 'Cinzel', serif;
      font-size: 2rem;
      font-weight: 600;
      color: #d9cca0;
      letter-spacing: 0.03em;
      margin-bottom: 0.5rem;
    }
    
    .document-subtitle {
      font-family: 'Libre Baskerville', serif;
      font-size: 1rem;
      color: rgba(232, 230, 225, 0.7);
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    
    .luxury-footer {
      background: #000000;
      border-top: 1px solid rgba(217, 204, 160, 0.15);
      padding: 2rem 0;
      text-align: center;
      margin-top: 4rem;
    }
    
    .footer-content {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .footer-text {
      font-family: 'Libre Baskerville', serif;
      font-size: 0.875rem;
      color: rgba(232, 230, 225, 0.5);
      margin-bottom: 0.5rem;
    }
    
    .footer-date {
      font-family: 'Libre Baskerville', serif;
      font-size: 0.875rem;
      color: rgba(232, 230, 225, 0.4);
      margin-bottom: 1rem;
    }
    
    .privacy-note {
      font-family: 'Libre Baskerville', serif;
      font-size: 0.75rem;
      font-style: italic;
      color: rgba(232, 230, 225, 0.35);
      line-height: 1.5;
    }
    
    /* TOC Styles */
    .table-of-contents {
      background: rgba(10, 10, 10, 0.5);
      border: 1px solid rgba(217, 204, 160, 0.2);
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .toc-title {
      font-family: 'Cinzel', serif;
      font-size: 1.25rem;
      color: #d9cca0;
      margin-bottom: 1rem;
      border-bottom: 1px solid rgba(217, 204, 160, 0.2);
      padding-bottom: 0.5rem;
    }
    
    .toc-list {
      list-style: none;
      padding-left: 0;
    }
    
    .toc-item {
      margin-bottom: 0.5rem;
    }
    
    .toc-link {
      font-family: 'Libre Baskerville', serif;
      font-size: 0.95rem;
      color: rgba(232, 230, 225, 0.8);
      transition: color 0.2s ease;
      padding: 0.25rem 0;
      display: inline-block;
    }
    
    .toc-link:hover {
      color: #d9cca0;
    }
    
    .toc-item.level-1 { padding-left: 0; }
    .toc-item.level-2 { padding-left: 1.25rem; }
    .toc-item.level-3 { padding-left: 2.5rem; }
    .toc-item.level-4 { padding-left: 3.75rem; }
    .toc-item.level-5 { padding-left: 5rem; }
    .toc-item.level-6 { padding-left: 6.25rem; }
    
    /* Heading styles */
    h1 { color: #d9cca0; }
    h2 { color: #d9cca0; border-bottom: 1px solid rgba(217, 204, 160, 0.2); padding-bottom: 0.5rem; }
    h3 { color: #c1a355; }
    h4 { color: #c1a355; }
    h5 { color: #b89f6b; }
    h6 { color: #b89f6b; }
    
    /* Paragraph and text */
    .paragraph {
      color: #e8e6e1;
    }
    
    /* Links */
    a.link {
      color: #d9cca0;
      border-bottom: 1px solid rgba(217, 204, 160, 0.3);
      padding-bottom: 1px;
    }
    
    a.link:hover {
      color: #e8c46a;
      border-bottom-color: rgba(232, 196, 106, 0.5);
    }
    
    /* List styles */
    ul.list {
      list-style: disc;
    }
    
    ol.list {
      list-style: decimal;
    }
    
    .list-item {
      color: #e8e6e1;
    }
    
    /* Code block enhancements */
    .code-block {
      background: rgba(0, 0, 0, 0.4);
      border-color: rgba(217, 204, 160, 0.25);
    }
    
    /* Table enhancements */
    .table-cell.header {
      background: rgba(217, 204, 160, 0.15);
    }
    
    .table-cell {
      color: #e8e6e1;
    }
    
    /* Blockquote enhancements */
    .blockquote {
      border-left-color: rgba(217, 204, 160, 0.4);
    }
    
    /* Frame enhancements */
    .frame {
      background: rgba(0, 0, 0, 0.3);
      border-color: rgba(217, 204, 160, 0.15);
    }
  `;
}

function getPrintStyles(): string {
  return `
    /* Print Styles */
    @media print {
      .luxury-style {
        background: white !important;
        color: #1a1a1a !important;
      }
      
      body {
        background: white !important;
        color: #1a1a1a !important;
        padding: 1in;
      }
      
      .luxury-header,
      .print-header {
        background: transparent !important;
        border-bottom: 1px solid #cccccc !important;
        padding: 0.5in 0 !important;
      }
      
      .logo-container {
        display: none !important;
      }
      
      .document-title {
        color: #1a1a1a !important;
        font-size: 1.75rem !important;
      }
      
      .document-subtitle {
        color: #666666 !important;
      }
      
      h1, h2, h3, h4, h5, h6 {
        color: #1a1a1a !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      h1 { font-size: 1.75rem !important; }
      h2 { font-size: 1.5rem !important; border-bottom: 1px solid #cccccc !important; }
      h3 { font-size: 1.25rem !important; }
      
      .paragraph {
        color: #333333 !important;
      }
      
      .list-item {
        color: #333333 !important;
      }
      
      a.link {
        color: #0066cc !important;
        border-bottom: 1px solid #0066cc !important;
      }
      
      .table {
        border-collapse: collapse !important;
      }
      
      .table-cell {
        border: 1px solid #cccccc !important;
        color: #333333 !important;
      }
      
      .table-cell.header {
        background: #f5f5f5 !important;
        color: #1a1a1a !important;
      }
      
      .code-block {
        background: #f5f5f5 !important;
        border-color: #cccccc !important;
        color: #333333 !important;
      }
      
      .blockquote {
        border-left-color: #cccccc !important;
        color: #666666 !important;
      }
      
      .frame {
        background: #f9f9f9 !important;
        border-color: #cccccc !important;
      }
      
      .divider {
        border-top-color: #cccccc !important;
      }
      
      .table-of-contents {
        background: #f9f9f9 !important;
        border-color: #cccccc !important;
      }
      
      .toc-title {
        color: #1a1a1a !important;
      }
      
      .toc-link {
        color: #333333 !important;
      }
      
      .luxury-footer,
      .print-footer {
        background: transparent !important;
        border-top: 1px solid #cccccc !important;
        padding: 0.5in 0 !important;
        margin-top: 1in !important;
      }
      
      .footer-text,
      .footer-date,
      .privacy-note {
        color: #666666 !important;
        font-size: 0.75rem !important;
      }
      
      .page-break {
        page-break-before: always;
      }
    }
    
    /* Print-only styles */
    .print-style {
      background: white;
      color: #1a1a1a;
    }
    
    .print-style .paragraph {
      color: #333333;
    }
    
    .print-style h1,
    .print-style h2,
    .print-style h3,
    .print-style h4,
    .print-style h5,
    .print-style h6 {
      color: #1a1a1a;
    }
  `;
}

function ensurePrintStyles(html: string): string {
  if (html.includes('@media print') || html.includes('print-style')) {
    return html;
  }
  
  const printStyles = `
    <style>
      ${getPrintStyles()}
    </style>
  `;
  
  return html.replace(/<\/head>/i, `${printStyles}</head>`);
}

// ============================================
// Utility Functions
// ============================================

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function generateIdFromText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100);
}

function extractTitleFromHtml(html: string): string | null {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  return match ? match[1] : null;
}

function getLogoSvg(): string {
  // Simple SVG logo as base64
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="12" fill="#d9cca0"/>
    <path d="M30 35 L50 20 L70 35 L70 65 L50 80 L30 65 Z" fill="#0a0a0a"/>
    <text x="50" y="55" text-anchor="middle" font-family="Cinzel, serif" font-size="8" fill="#0a0a0a" font-weight="bold">LA</text>
  </svg>`;
  // Browser-compatible base64 encoding
  return btoa(unescape(encodeURIComponent(svg)));
}

// Export types
export type { AffineBlock, AffinePage, AffineDocument };
