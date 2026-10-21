$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

Write-Host "D4 Insight MFE POC - starting all apps" -ForegroundColor Cyan

$apps = @("d4-design-system", "d4-parent", "d4-finance", "d4-recruitment")

foreach ($app in $apps) {
    $appPath = Join-Path $root $app
    $modulesPath = Join-Path $appPath "node_modules"
    if (-not (Test-Path $modulesPath)) {
        Write-Host "Installing dependencies for $app..." -ForegroundColor Yellow
        Push-Location $appPath
        npm install
        Pop-Location
    }
}

$distPath = Join-Path $root "d4-design-system\dist"
if (-not (Test-Path $distPath)) {
    Write-Host "Building design system for the first time..." -ForegroundColor Yellow
    Push-Location (Join-Path $root "d4-design-system")
    npm run build
    Pop-Location
}

if (-not (Test-Path (Join-Path $root "node_modules"))) {
    Write-Host "Installing root dependencies (concurrently)..." -ForegroundColor Yellow
    Push-Location $root
    npm install
    Pop-Location
}

Write-Host ""
Write-Host "Starting design-system (watch), finance (:3001), recruitment (:3002), parent (:3000)..." -ForegroundColor Cyan
Write-Host "Once compiled, open http://localhost:3000" -ForegroundColor Green
Write-Host ""

Push-Location $root
npm run dev
Pop-Location
