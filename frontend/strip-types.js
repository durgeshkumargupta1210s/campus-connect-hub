import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function removeTypeScriptSyntax(content) {
  // Remove type annotations from function parameters (name: Type)
  content = content.replace(/(\w+):\s*([A-Z]\w*(?:<[^>]*>)?|string|number|boolean|any)\s*([,)])/g, '$1$3');
  
  // Remove type from variable declarations
  content = content.replace(/(const|let|var)\s+(\w+):\s*[^=]*=/g, '$1 $2 =');
  
  // Remove interface declarations
  content = content.replace(/^\s*interface\s+\w+[^{]*\{[^}]*\}/gm, '');
  
  // Remove type declarations
  content = content.replace(/^\s*type\s+\w+\s*=\s*[^;]*;?\s*$/gm, '');
  
  // Remove React.FC type
  content = content.replace(/:\s*React\.FC(?:<[^>]*>)?/g, '');
  
  // Remove 'as Type' casts
  content = content.replace(/\s+as\s+\w+\s*(?=[,;)])/g, '');
  
  return content;
}

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalLength = content.length;
    
    content = removeTypeScriptSyntax(content);
    
    if (content.length !== originalLength) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ ${path.relative(process.cwd(), filePath)}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`✗ ${path.relative(process.cwd(), filePath)}: ${error.message}`);
    return false;
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  let processed = 0;
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processed += walkDir(filePath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      if (processFile(filePath)) {
        processed++;
      }
    }
  }
  
  return processed;
}

console.log('Removing TypeScript syntax from JavaScript files...\n');
const processed = walkDir('src');
console.log(`\nDone! Processed ${processed} files.`);
