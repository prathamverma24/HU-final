@echo off
echo Starting Haridwar University Development Servers...
echo.

echo [1/2] Starting Backend API on port 5000...
start "Backend API" cmd /k "cd backend && python app.py"
timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend on port 3000...
start "Frontend React" cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo Development servers are starting...
echo ========================================
echo Backend API: http://localhost:5000
echo Frontend: http://localhost:3000
echo Admin Login: http://localhost:3000/admin/login
echo.
echo Admin Credentials:
echo   Username: admin
echo   Password: admin123
echo ========================================
