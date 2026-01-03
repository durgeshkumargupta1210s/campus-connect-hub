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
      let content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      
      // Check for duplicate React imports
      const reactImportLines = [];
      let hasRegularImport = false;
      let hasNamespaceImport = false;
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('import React from') || lines[i].includes('import * as React from')) {
          reactImportLines.push({ index: i, line: lines[i] });
          if (lines[i].includes('import React from')) {
            hasRegularImport = true;
          } else if (lines[i].includes('import * as React from')) {
            hasNamespaceImport = true;
          }
        }
      }
      
      // If there are duplicates, remove them
      if (reactImportLines.length > 1) {
        console.log(`Fixing duplicate React imports in: ${filePath}`);
        
        // Keep only the namespace import (import * as React) as it's more flexible
        if (hasNamespaceImport && hasRegularImport) {
          // Remove regular imports, keep namespace imports
          for (let i = lines.length - 1; i >= 0; i--) {
            if (lines[i].includes('import React from') && !lines[i].includes('* as')) {
              lines.splice(i, 1);
            }
          }
        } else if (reactImportLines.length > 1) {
          // Remove all but the first React import
          const firstReactImportIndex = reactImportLines[0].index;
          for (let i = lines.length - 1; i > firstReactImportIndex; i--) {
            if (lines[i].includes('import React from') || lines[i].includes('import * as React from')) {
              lines.splice(i, 1);
            }
          }
        }
        
        content = lines.join('\n');
        fs.writeFileSync(filePath, content, 'utf-8');
      }
    }
  });
}

walkDir(srcDir);
console.log('Done! Duplicate React imports removed.');
