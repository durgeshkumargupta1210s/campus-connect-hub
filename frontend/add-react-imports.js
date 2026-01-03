#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, 'src');

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Check if file uses React.createElement but doesn't import React
      if (content.includes('React.createElement') && !content.includes('import React')) {
        console.log(`Adding React import to: ${filePath}`);
        
        // Add React import at the beginning of imports
        const lines = content.split('\n');
        let importIndex = 0;
        
        // Find where to insert the import (after other imports)
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('import ')) {
            importIndex = i + 1;
          } else if (lines[i].trim() !== '' && !lines[i].startsWith('import ')) {
            break;
          }
        }
        
        // Insert React import
        lines.splice(importIndex, 0, 'import React from "react";');
        const newContent = lines.join('\n');
        fs.writeFileSync(filePath, newContent, 'utf-8');
      }
    }
  });
}

walkDir(srcDir);
console.log('Done! React imports added to files that need them.');
