#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Path to the file
const filePath = path.resolve('../javascript/js-concept-question.md');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Find all question headings and add IDs
const questionRegex = /^### (.+)$/gm;
let match;
let modifiedContent = content;
let modifications = 0;

// Collect all matches first
const matches = [];
while ((match = questionRegex.exec(content)) !== null) {
  matches.push({
    fullMatch: match[0],
    questionText: match[1],
    index: match.index
  });
}

// Process matches in reverse order to avoid messing with indices
for (let i = matches.length - 1; i >= 0; i--) {
  const { fullMatch, questionText, index } = matches[i];
  
  // Generate the ID from the question text
  let id = questionText
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars except spaces and hyphens
    .replace(/[\s_]+/g, '-')  // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '')  // Trim hyphens from start and end
    .replace(/'/g, '')        // Remove apostrophes
    .replace(/`/g, '')        // Remove backticks
    .replace(/\?/g, '')       // Remove question marks
    .replace(/-+/g, '-');     // Replace multiple hyphens with a single one

  // Check if an anchor already exists
  const anchorExists = content.slice(Math.max(0, index - 100), index).includes(`<a id="${id}"></a>`);
  
  if (!anchorExists) {
    // Add the ID to the heading
    const replacement = `<a id="${id}"></a>\n### ${questionText}`;
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
  console.log(`Added ${modifications} heading IDs`);
} else {
  console.log('No changes needed');
}
