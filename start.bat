@echo off
TITLE Digital Saathi - Starting Application
echo ======================================================================
echo DIGITAL SAATHI - AI-POWERED DIGITAL LITERACY PLATFORM
echo Starting Backend (Flask) and Frontend (Vite React)...
echo ======================================================================

start "Digital Saathi - Backend (Flask)" cmd /k "cd backend && venv\Scripts\python app.py"
timeout /t 3 /nobreak >nul
start "Digital Saathi - Frontend (Vite)" cmd /k "cd frontend && npm run dev"

echo.
echo Application started!
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:5000
echo.
pause
