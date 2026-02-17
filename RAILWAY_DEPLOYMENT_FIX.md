# Railway Deployment Fix

## Problem
Railway deployment was crashing with error: "The executable 'cd' could not be found"

## Solution Applied

Following the Railway deployment checklist:

### ✅ 1. Remove `cd` from everywhere
- No `cd` commands in deployment files
- Only in local dev scripts (not used in production)

### ✅ 2. Use `WORKDIR` in Dockerfile
- Dockerfile uses `WORKDIR /app` correctly
- All paths are relative to WORKDIR

### ✅ 3. Bind to `0.0.0.0` and `$PORT`
- Dockerfile CMD: `gunicorn -w 4 -b 0.0.0.0:$PORT backend.app:app`
- app.py configured: `app.run(host='0.0.0.0', port=port)`
- PORT environment variable is used from Railway

### ✅ 4. Remove railway.json if using Docker
- Removed railway.toml (not needed with Dockerfile)
- Using Dockerfile for deployment

### ✅ 5. Push again
- Ready to commit and push to Railway

## Files Modified

1. **Dockerfile** - Simplified CMD to use gunicorn directly with $PORT
2. **railway.toml** - Removed (not needed)
3. **Procfile** - Created as alternative (clean, no cd commands)

## Deployment Configuration

### Dockerfile (Primary)
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY backend/requirements.txt backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt
COPY . .
RUN mkdir -p backend/instance
ENV PYTHONUNBUFFERED=1
CMD gunicorn -w 4 -b 0.0.0.0:$PORT backend.app:app
```

### Procfile (Alternative)
```
web: gunicorn -w 4 -b 0.0.0.0:$PORT backend.app:app
```

## Next Steps

1. Commit these changes:
   ```bash
   git add Dockerfile Procfile RAILWAY_DEPLOYMENT_FIX.md
   git commit -m "Fix Railway deployment - remove cd commands, simplify Dockerfile"
   git push
   ```

2. Railway will automatically redeploy

3. Verify deployment in Railway dashboard

## Environment Variables Required in Railway

- `PORT` - Automatically set by Railway
- `SECRET_KEY` - Set your Flask secret key
- `FLASK_ENV` - Set to "production"
- `DATABASE_URL` - SQLite path or PostgreSQL URL

## Notes

- The app binds to 0.0.0.0:$PORT as required by Railway
- Gunicorn runs with 4 workers for production
- Database will be created automatically on first run
- Default admin credentials: username=admin, password=admin123
