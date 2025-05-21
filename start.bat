@echo off
echo Starting Yousseflehroud development server...

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Check if npm dependencies are installed
if not exist "node_modules\" (
    echo Installing dependencies...
    npm install
)

:: Start the development server
npm run dev

pause
