@echo off
echo Stopping any running backend servers...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do taskkill /F /PID %%a 2>nul

echo.
echo Starting backend server with persistent database...
cd backend
python app.py
