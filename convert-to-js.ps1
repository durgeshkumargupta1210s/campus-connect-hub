# PowerShell Script to Convert TypeScript Project to JavaScript
# This script converts all .tsx and .ts files to .jsx and .js
# And removes TypeScript type annotations

Write-Host "Starting TypeScript to JavaScript Conversion..." -ForegroundColor Green

# Step 1: Rename all .tsx files to .jsx
Write-Host "`nStep 1: Renaming .tsx files to .jsx..." -ForegroundColor Cyan
$tsxFiles = Get-ChildItem -Path "src" -Filter "*.tsx" -Recurse
foreach ($file in $tsxFiles) {
    $newPath = $file.FullName -replace '\.tsx$', '.jsx'
    Rename-Item -Path $file.FullName -NewName (Split-Path $newPath -Leaf)
    Write-Host "✓ Renamed: $($file.Name) -> $(Split-Path $newPath -Leaf)"
}

# Step 2: Rename all .ts files to .js
Write-Host "`nStep 2: Renaming .ts files to .js..." -ForegroundColor Cyan
$tsFiles = Get-ChildItem -Path "src" -Filter "*.ts" -Recurse -Exclude "*.d.ts"
foreach ($file in $tsFiles) {
    $newPath = $file.FullName -replace '\.ts$', '.js'
    Rename-Item -Path $file.FullName -NewName (Split-Path $newPath -Leaf)
    Write-Host "✓ Renamed: $($file.Name) -> $(Split-Path $newPath -Leaf)"
}

# Step 3: Update imports/exports in all .jsx and .js files
Write-Host "`nStep 3: Updating imports/exports..." -ForegroundColor Cyan
$jsFiles = Get-ChildItem -Path "src" -Filter "*.jsx" -Recurse
$jsFiles += Get-ChildItem -Path "src" -Filter "*.js" -Recurse

foreach ($file in $jsFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Remove .tsx and .ts extensions from imports
    $content = $content -replace "from ['\"]([^'\"]+)\.tsx['\"]", "from `"`$1.jsx`""
    $content = $content -replace "from ['\"]([^'\"]+)\.ts['\"]", "from `"`$1.js`""
    $content = $content -replace "import([^'\"]*)from ['\"]([^'\"]+)\.tsx['\"]", "import`$1from `"`$2.jsx`""
    $content = $content -replace "import([^'\"]*)from ['\"]([^'\"]+)\.ts['\"]", "import`$1from `"`$2.js`""
    
    # Remove TypeScript type annotations (basic cleanup)
    # Remove ': type' from function parameters
    $content = $content -replace ': React\.FC', ''
    $content = $content -replace ': React\.MouseEvent<[^>]+>', ''
    $content = $content -replace ': React\.ChangeEvent<[^>]+>', ''
    $content = $content -replace ': React\.FormEvent', ''
    
    # Remove interface and type declarations (they become comments)
    $content = $content -replace "interface\s+\w+\s*\{[^}]*\}", "// [Interface removed - use JSDoc instead]"
    $content = $content -replace "type\s+\w+\s*=\s*[^;]+;", "// [Type removed - use JSDoc instead]"
    
    # Save updated content
    Set-Content -Path $file.FullName -Value $content
    Write-Host "✓ Updated: $($file.Name)"
}

Write-Host "`nConversion Complete!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Update package.json to remove TypeScript dependencies"
Write-Host "2. Delete tsconfig.json files"
Write-Host "3. Create jsconfig.json"
Write-Host "4. Run: npm install" -ForegroundColor Cyan
Write-Host "5. Run: npm run dev" -ForegroundColor Cyan
