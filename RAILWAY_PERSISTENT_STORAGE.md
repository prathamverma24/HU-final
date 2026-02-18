# Railway Persistent Storage Setup

## Problem
Railway's filesystem is ephemeral - it resets on each deployment. This means:
- SQLite database is recreated fresh each time
- All data (events, happenings, glimpses) is lost on redeploy
- Uploaded images are deleted

## Current Status
✅ The database schema is now correct (image_path is nullable)
✅ Adding glimpses without images should work
⚠️  But data will be lost on next deployment

## Solution: Add Persistent Volume

### Option 1: Railway Volume (Recommended for SQLite)

1. Go to Railway Dashboard
2. Select your backend service
3. Click on "Variables" tab
4. Add a new variable:
   - Name: `RAILWAY_VOLUME_MOUNT_PATH`
   - Value: `/app/data`
5. Update backend/config.py to use the volume:

```python
# In Config class
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
    f"sqlite:///{os.environ.get('RAILWAY_VOLUME_MOUNT_PATH', 'backend/instance')}/university.db"
```

6. Redeploy the service

### Option 2: PostgreSQL Database (Recommended for Production)

1. In Railway Dashboard, click "+ New"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically set the `DATABASE_URL` environment variable
4. Update backend/config.py to handle PostgreSQL:

```python
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    
    # Database configuration
    database_url = os.environ.get('DATABASE_URL')
    if database_url and database_url.startswith('postgres://'):
        # Fix for SQLAlchemy 1.4+ which requires postgresql://
        database_url = database_url.replace('postgres://', 'postgresql://', 1)
    
    SQLALCHEMY_DATABASE_URI = database_url or 'sqlite:///backend/instance/university.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
```

5. Install psycopg2 in requirements.txt:
```
psycopg2-binary==2.9.9
```

6. Redeploy

### Option 3: Keep SQLite but Accept Data Loss

If you're okay with losing data on deployments:
- Current setup works fine
- Just re-add content after each deployment
- Good for testing/development

## Recommendation

For production, use **Option 2 (PostgreSQL)**:
- Data persists across deployments
- Better performance for concurrent users
- Industry standard for web applications
- Free tier available on Railway

## Next Steps

1. Choose an option above
2. Implement the changes
3. Test by adding content
4. Redeploy and verify data persists
