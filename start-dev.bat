@echo off
echo ========================================
echo FaniLab Frontend - Development Server
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [INFO] node_modules not found. Installing dependencies...
    echo.
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
    echo.
)

REM Check if .env.local exists
if not exist ".env.local" (
    echo [WARNING] .env.local not found!
    echo.
    echo Please create .env.local file:
    echo   1. Copy .env.example to .env.local
    echo   2. Update with your contract addresses
    echo.
    pause
)

echo [INFO] Starting development server...
echo.
echo The application will be available at:
echo   http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
