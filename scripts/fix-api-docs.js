#!/usr/bin/env node

/**
 * Post-process API documentation to fix MDX/JSX issues
 *
 * The API Documenter generates markdown with XML tags like <item>, <enclosure>
 * which MDX interprets as JSX components. This script escapes them as code.
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

const API_DOCS_DIR = path.join(__dirname, '../api/docs');

// Common XML/HTML tags that appear in RSS/XML/SSML/HTML documentation
// and should be escaped as code
const PROBLEMATIC_TAGS = [
  'item',
  'enclosure',
  'title',
  'description',
  'link',
  'pubDate',
  'guid',
  'channel',
  'rss',
  'content',
  'author',
  'category',
  'comments',
  'source',
  'speak',
  'break',
  'emphasis',
  'prosody',
  'audio',
  'say-as',
  'voice',
  'lang',
  'a',
  'img',
  'video',
  'iframe',
  'script',
  'style',
  'meta',
  'head',
  'body',
];

/**
 * Escape problematic tags in markdown content
 */
function escapeTags(content) {
  let fixed = content;

  PROBLEMATIC_TAGS.forEach(tag => {
    // Match opening and closing tags that aren't already in code blocks
    // Look for patterns like: <tag> or </tag>
    const openTagRegex = new RegExp(`(?<![\`])(<${tag}>)(?![\`])`, 'g');
    const closeTagRegex = new RegExp(`(?<![\`])(</${tag}>)(?![\`])`, 'g');

    // Escape as inline code
    fixed = fixed.replace(openTagRegex, '`<' + tag + '>`');
    fixed = fixed.replace(closeTagRegex, '`</' + tag + '>`');
  });

  // Remove the breadcrumb at the top of module pages
  // Matches: [**Stentor API Reference**](../../README.md)\n\n***\n\n[Stentor API Reference](../../README.md) / module-name
  fixed = fixed.replace(/^\[\*\*.*?\*\*\]\(\.\.\/\.\.\/README\.md\)\n\n\*\*\*\n\n\[.*?\]\(\.\.\/\.\.\/README\.md\) \/ (.+?)\n\n/m, '');

  return fixed;
}

/**
 * Process a single markdown file
 */
async function processFile(filePath) {
  const content = await readFile(filePath, 'utf8');
  const fixed = escapeTags(content);

  if (content !== fixed) {
    await writeFile(filePath, fixed, 'utf8');
    return true;
  }

  return false;
}

/**
 * Recursively process all markdown files in a directory
 */
async function processDirectory(dir) {
  const entries = await readdir(dir);
  let fixedCount = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = await stat(fullPath);

    if (stats.isDirectory()) {
      fixedCount += await processDirectory(fullPath);
    } else if (stats.isFile() && entry.endsWith('.md')) {
      const wasFixed = await processFile(fullPath);
      if (wasFixed) {
        fixedCount++;
        console.log(`Fixed: ${path.relative(API_DOCS_DIR, fullPath)}`);
      }
    }
  }

  return fixedCount;
}

/**
 * Main execution
 */
async function main() {
  console.log('Fixing API documentation for MDX compatibility...\n');

  try {
    const fixedCount = await processDirectory(API_DOCS_DIR);

    console.log(`\n✅ Fixed ${fixedCount} file(s)`);

    if (fixedCount === 0) {
      console.log('No files needed fixing - all good!');
    }
  } catch (error) {
    console.error('❌ Error processing files:', error);
    process.exit(1);
  }
}

main();
