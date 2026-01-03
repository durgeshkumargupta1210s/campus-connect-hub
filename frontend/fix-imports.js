import fs from 'fs';
import path from 'path';

function fixImports(content) {
  // Fix .tsx imports
  content = content.replace(/from\s+['"]([^'"]+)\.tsx['"]/g, "from '$1.js'");
  // Fix .ts imports (but not .d.ts)
  content = content.replace(/from\s+['"]([^'"]+)\.ts['"]/g, (match, p1) => {
    if (p1.endsWith('.d')) return match; // Don't change .d.ts
    return `from '${p1}.js'`;
  });
  return content;
}

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixImports(content);
    
    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(`✓ Fixed imports: ${path.relative(process.cwd(), filePath)}`);
      return true;
    }
  } catch (error) {
    console.error(`✗ Error in ${filePath}: ${error.message}`);
  }
  return false;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  let fixed = 0;
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixed += walkDir(filePath);
    } else if (file.endsWith('.js')) {
      if (processFile(filePath)) fixed++;
    }
  }
  
  return fixed;
}

console.log('Fixing TypeScript imports in JavaScript files...\n');
const fixed = walkDir('src');
console.log(`\nDone! Fixed imports in ${fixed} files.`);
