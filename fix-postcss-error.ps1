# Automated Fix for PostCSS Tailwind Error
# Fixes: Cannot find module '@tailwindcss/postcss'

Write-Host "🔧 FIXING TAILWIND POSTCSS ERROR..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean up old PostCSS configs
Write-Host "🧹 Step 1: Cleaning up old configs..." -ForegroundColor Yellow
$removed = 0

$configFiles = @(
    "postcss.config.js",
    "postcss.config.cjs",
    "postcss.config.mjs",
    ".postcssrc",
    ".postcssrc.js",
    ".postcssrc.json",
    "postcss.config.json"
)

foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  ✓ Removed $file" -ForegroundColor Green
        $removed++
    }
}

if ($removed -eq 0) {
    Write-Host "  ℹ No old config files found" -ForegroundColor Gray
}

# Step 2: Create correct PostCSS config
Write-Host ""
Write-Host "📝 Step 2: Creating correct postcss.config.js..." -ForegroundColor Yellow

$content = @"
module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
  },
}
"@

# Write with UTF-8 no BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("$PWD\postcss.config.js", $content, $utf8NoBom)

Write-Host "  ✓ Created postcss.config.js" -ForegroundColor Green

# Verify content
Write-Host ""
Write-Host "  File content:" -ForegroundColor Gray
Get-Content postcss.config.js | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkGray }

# Step 3: Check dependencies
Write-Host ""
Write-Host "🔍 Step 3: Checking Tailwind CSS version..." -ForegroundColor Yellow

$tailwindVersion = npm list tailwindcss 2>&1 | Select-String "tailwindcss@" | Select-Object -First 1

if ($tailwindVersion -match "tailwindcss@3") {
    Write-Host "  ✓ Tailwind CSS v3 installed (correct)" -ForegroundColor Green
} elseif ($tailwindVersion -match "tailwindcss@4") {
    Write-Host "  ⚠ Tailwind CSS v4 detected" -ForegroundColor Yellow
    Write-Host "  → Downgrading to v3 for stability..." -ForegroundColor Yellow
    npm uninstall tailwindcss
    npm install -D tailwindcss@3.4.11
    Write-Host "  ✓ Downgraded to Tailwind CSS v3" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Tailwind CSS version unclear" -ForegroundColor Yellow
    Write-Host "  → Reinstalling Tailwind CSS v3..." -ForegroundColor Yellow
    npm install -D tailwindcss@3.4.11 postcss@8.4.47 autoprefixer@10.4.20
}

# Step 4: Clear cache
Write-Host ""
Write-Host "🗑️ Step 4: Clearing build cache..." -ForegroundColor Yellow

if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "  ✓ Cleared .next cache" -ForegroundColor Green
}

if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force node_modules\.cache
    Write-Host "  ✓ Cleared node_modules cache" -ForegroundColor Green
}

# Step 5: Test build
Write-Host ""
Write-Host "🔨 Step 5: Testing build..." -ForegroundColor Yellow
Write-Host "  Running npm run build..." -ForegroundColor Gray
Write-Host ""

npm run build

$buildSuccess = $LASTEXITCODE -eq 0

# Summary
Write-Host ""
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

if ($buildSuccess) {
    Write-Host "✅ BUILD SUCCESSFUL!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Your portfolio is ready for deployment!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Commit changes: git add . && git commit -m 'Fix PostCSS config'" -ForegroundColor White
    Write-Host "  2. Push to GitHub: git push origin main" -ForegroundColor White
    Write-Host "  3. Deploy on Vercel: Go to vercel.com" -ForegroundColor White
} else {
    Write-Host "❌ BUILD STILL FAILED" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please try manual steps:" -ForegroundColor Yellow
    Write-Host "  1. Delete node_modules and package-lock.json" -ForegroundColor White
    Write-Host "  2. Run: npm install" -ForegroundColor White
    Write-Host "  3. Verify postcss.config.js exists and is correct" -ForegroundColor White
    Write-Host "  4. Run: npm run build" -ForegroundColor White
    Write-Host ""
    Write-Host "Or see FIX-POSTCSS-BUILD-ERROR.md for detailed troubleshooting" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan