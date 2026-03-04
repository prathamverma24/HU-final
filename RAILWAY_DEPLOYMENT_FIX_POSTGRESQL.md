# Railway Deployment Fix - PostgreSQL Client Library Issue

## Problem
The application failed to start on Railway with the error:
```
ImportError: libpq.so.5: cannot open shared object file: No such file or directory
```

This occurred because the Docker container was missing PostgreSQL client system libraries required by psycopg2.

## Root Cause
- The application uses `psycopg2` to connect to PostgreSQL
- Even with `psycopg2-binary` installed, the system still needs the PostgreSQL client library (`libpq`)
- The original Dockerfile didn't properly install system dependencies

## Solution Implemented

### 1. Updated Dockerfile
Added comprehensive system dependency installation:
```dockerfile
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    libpq-dev \
    postgresql-client \
    gcc \
    g++ \
    make \
    && rm -rf /var/lib/apt/lists/*
```

**Key Libraries Added:**
- `libpq5` - PostgreSQL client library (runtime)
- `libpq-dev` - PostgreSQL client development files (compilation)
- `postgresql-client` - PostgreSQL client tools
- `gcc`, `g++`, `make` - Build tools for Python packages

### 2. Created Root-Level requirements.txt
Railway expects `requirements.txt` at the root directory:
```bash
cp backend/requirements.txt requirements.txt
```

### 3. Created Procfile
Added for compatibility with Railway's deployment process:
```
web: gunicorn app:app --bind 0.0.0.0:$PORT --workers 2 --worker-class sync --timeout 120
```

## Files Modified

| File | Changes |
|------|---------|
| `Dockerfile` | Added PostgreSQL client libraries, updated CMD |
| `requirements.txt` | Created at root level (copied from backend) |
| `Procfile` | Created for Railway deployment |
| `.nixpacks.toml` | Removed (was causing conflicts) |

## How to Deploy

### Option 1: Push to Railway (Auto-Deploy)
```bash
git add .
git commit -m "Fix: Railway deployment - add PostgreSQL client libraries"
git push origin main
```

Railway will:
1. Detect the Dockerfile
2. Build the Docker image with all dependencies
3. Deploy the application
4. Start the container with gunicorn

### Option 2: Manual Railway Deployment
```bash
# Login to Railway CLI
railway login

# Deploy current project
railway up
```

## Verification Steps

### 1. Check Backend Is Running
```bash
curl https://your-railway-url.railway.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "API is running"
}
```

### 2. Check Database Initialization
```bash
curl https://your-railway-url.railway.app/api/events
curl https://your-railway-url.railway.app/api/happenings
curl https://your-railway-url.railway.app/api/glimpses
```

Expected: All endpoints return JSON arrays with content

### 3. Monitor Railway Logs
```bash
railway logs
```

Look for:
```
✅ Admin user created (username: admin, password: admin123)
✅ Default events initialized
✅ Default happenings initialized
✅ Default glimpses initialized
```

## Troubleshooting

### If Container Still Fails After Deploy

1. **Force Rebuild:**
   ```bash
   # In Railway dashboard, trigger a redeploy
   # Or push a new commit
   ```

2. **Check Environment Variables:**
   - Ensure `DATABASE_URL` is set in Railway environment
   - Verify `SECRET_KEY` and email credentials if configured

3. **View Live Logs:**
   - Go to Railway dashboard → your-service → Logs
   - Look for specific error messages

### If Database Connection Fails

The app has a fallback:
- If PostgreSQL unavailable → Falls back to SQLite
- Static content (hardcoded defaults) always displays
- Admin can manage content once database is available

### If Port Not Listening

Railway expects service on `$PORT` (usually 8080):
```dockerfile
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8080", ...]
```

## Environment Variables Required on Railway

| Variable | Example | Required |
|----------|---------|----------|
| `DATABASE_URL` | `postgresql://user:pass@host/db?sslmode=require` | Yes (or uses SQLite) |
| `SECRET_KEY` | `your-secret-key` | No (has default) |
| `MAIL_USERNAME` | `noreply@example.com` | Optional |
| `MAIL_PASSWORD` | `app-password` | Optional |
| `MAIL_SERVER` | `smtp.gmail.com` | Optional |

## Success Indicators

✅ **Docker Build Succeeds:**
- Image builds without errors
- PostgreSQL libraries installed
- Python dependencies installed

✅ **Container Starts:**
- Gunicorn starts listening on port 8080
- Database initializes with default content
- No import errors

✅ **API Responds:**
- Health check endpoint returns 200
- Events/happenings/glimpses endpoints return data
- Admin dashboard is accessible

✅ **Frontend Works:**
- All content visible
- No blank sections
- Hardcoded defaults show if API slow

## Post-Deployment Maintenance

1. **Monitor Container Health:**
   - Check Railway dashboard regularly
   - Set up notifications for failures

2. **Database Backups:**
   - Enable backups in Railway PostgreSQL plugin
   - Test restoration process

3. **Update Dependencies:**
   - Periodically update Python packages
   - Test in local environment first
   - Deploy to Railway

4. **Admin Management:**
   - Login and verify all content loads
   - Add new events/happenings as needed
   - Monitor uploads and file sizes

## Additional Notes

- The Dockerfile uses Python 3.13-slim as base (lightweight)
- Gunicorn is configured with 2 workers for balance
- 120 second timeout for long operations
- Health check validates API availability
- Static content in `/static` served from container

---

**Status**: ✅ Deployment Fix Complete
**Last Updated**: March 4, 2026
**Ready for**: Railway deployment via Dockerfile
