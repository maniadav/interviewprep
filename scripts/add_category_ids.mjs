#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Path to the file
const filePath = path.resolve('../javascript/js-concept-question.md');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Find all category headings and add IDs
const categoryRegex = /^## ([A-Za-z ]+)$/gm;
let match;
let modifiedContent = content;
let modifications = 0;

// Collect all matches first
const matches = [];
while ((match = categoryRegex.exec(content)) !== null) {
  // Skip the "Table of Contents", "Categories", and "All Questions" headers
  if (['Table of Contents', 'Categories', 'All Questions'].includes(match[1])) {
    continue;
  }
  matches.push({
    fullMatch: match[0],
    categoryText: match[1],
    index: match.index
  });
}

// Process matches in reverse order to avoid messing with indices
for (let i = matches.length - 1; i >= 0; i--) {
  const { fullMatch, categoryText, index } = matches[i];
  
  // Generate the ID from the category text
  let id = categoryText
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars except spaces and hyphens
    .replace(/[\s_]+/g, '-')   // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '')   // Trim hyphens from start and end
    .replace(/-+/g, '-');      // Replace multiple hyphens with a single one

  // Check if an anchor already exists
  const anchorExists = content.slice(Math.max(0, index - 100), index).includes(`<a id="${id}"></a>`);
  
  if (!anchorExists) {
    // Add the ID to the heading
    const replacement = `<a id="${id}"></a>\n## ${categoryText}`;
    modifiedContent = 
      modifiedContent.slice(0, index) + 
      replacement + 
      modifiedContent.slice(index + fullMatch.length);
    modifications++;
  }
}

// Write the modified content back to the file
if (modifications > 0) {
  fs.writeFileSync(filePath, modifiedContent, 'utf8');
  console.log(`Added ${modifications} category IDs`);
} else {
  console.log('No category changes needed');
}
