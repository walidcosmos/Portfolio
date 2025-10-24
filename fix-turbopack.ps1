# Automated Fix Script for Next.js Turbopack Crash
# Run this in PowerShell from your project root

Write-Host "🔧 FIXING NEXT.JS 16 TURBOPACK CRASH..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Backup current files
Write-Host "📦 Step 1: Creating backup..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Copy-Item "package.json" "package.json.backup"
    Write-Host "✓ Backed up package.json" -ForegroundColor Green
}

# Step 2: Clean up
Write-Host ""
Write-Host "🧹 Step 2: Cleaning up..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "  Removing node_modules..."
    Remove-Item -Recurse -Force node_modules
    Write-Host "✓ Removed node_modules" -ForegroundColor Green
}
if (Test-Path "package-lock.json") {
    Remove-Item package-lock.json
    Write-Host "✓ Removed package-lock.json" -ForegroundColor Green
}
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "✓ Removed .next cache" -ForegroundColor Green
}

# Step 3: Clear npm cache
Write-Host ""
Write-Host "🗑️ Step 3: Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force
Write-Host "✓ Cleared npm cache" -ForegroundColor Green

# Step 4: Install dependencies
Write-Host ""
Write-Host "📥 Step 4: Installing dependencies (this may take a few minutes)..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Step 5: Clear temp files
Write-Host ""
Write-Host "🗑️ Step 5: Clearing temporary files..." -ForegroundColor Yellow
Get-ChildItem -Path $env:TEMP -Filter "next-*" | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "✓ Cleared temporary files" -ForegroundColor Green

# Done
Write-Host ""
Write-Host "✅ FIX COMPLETE!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Make sure you've replaced next.config.js with the new version"
Write-Host "  2. Run: npm run dev"
Write-Host "  3. Your portfolio should now work without Turbopack errors!"
Write-Host ""
Write-Host "🚀 Ready to start? Run: npm run dev" -ForegroundColor Yellow
Write-Host ""