# Railway PostgreSQL Connection Fix

## Problem
Your backend is using SQLite instead of PostgreSQL even though you've added the database and set DATABASE_URL.

## Root Cause
The DATABASE_URL environment variable is not being properly read by the Flask application on Railway.

## Solution Steps

### Step 1: Verify DATABASE_URL in Railway

1. Go to your Railway project: https://railway.app
2. Click on your **backend service** (not the PostgreSQL database)
3. Go to the **Variables** tab
4. Check if `DATABASE_URL` exists

### Step 2: Set DATABASE_URL Correctly

Railway provides TWO types of PostgreSQL URLs:

#### Option A: Use Railway's Reference Variable (RECOMMENDED)
Instead of manually copying the URL, use Railway's reference system:

1. In your backend service Variables tab, click **+ New Variable**
2. Click **Add Reference**
3. Select your PostgreSQL database
4. Select `DATABASE_URL` from the dropdown
5. This will create: `DATABASE_URL=${{Postgres.DATABASE_URL}}`

This automatically uses the correct internal URL and updates if the database changes.

#### Option B: Manual URL (if Option A doesn't work)
If you need to set it manually, Railway provides TWO URLs:

**Internal URL (use this one):**
```
postgresql://postgres:WiXluTwSmYvxOPFCWnYbgYSuTHkdCIHd@postgres.railway.internal:5432/railway
```

**Public URL (check your database settings):**
```
postgresql://postgres:WiXluTwSmYvxOPFCWnYbgYSuTHkdCIHd@<public-host>:5432/railway
```

### Step 3: Verify the Variable is Set

After setting DATABASE_URL, check the Variables tab shows:
```
DATABASE_URL = postgresql://postgres:...
```

### Step 4: Redeploy

1. Go to the **Deployments** tab
2. Click the three dots on the latest deployment
3. Click **Redeploy**

OR just push a small change to trigger redeploy:
```bash
git commit --allow-empty -m "Trigger redeploy for PostgreSQL"
git push
```

### Step 5: Check Logs

After redeployment, check the logs. You should see:
```
Using PostgreSQL database - creating tables with correct schema...
✅ PostgreSQL tables created successfully
```

Instead of:
```
Using SQLite database at: /app/instance/university.db
```

## Troubleshooting

### If DATABASE_URL is not showing in Variables:

1. Make sure the PostgreSQL database is in the SAME Railway project
2. Try Option A (Reference Variable) first
3. If that fails, copy the DATABASE_URL from the PostgreSQL database's Variables tab

### If it still uses SQLite after setting DATABASE_URL:

1. Check if there's a `.env` file in your backend folder that's overriding it
2. Make sure you're setting the variable in the **backend service**, not the database
3. Try deleting and re-adding the DATABASE_URL variable
4. Make sure there are no typos in the variable name (it's case-sensitive)

### If you get "cannot connect to database" errors:

1. Make sure both services are in the same Railway project
2. Use the **internal** URL (postgres.railway.internal), not the public one
3. Check that the PostgreSQL database is running (green status)

## Expected Result

After fixing this:
- ✅ Backend will use PostgreSQL instead of SQLite
- ✅ Data will persist across deployments
- ✅ Images will still need Cloudinary (Railway filesystem is still ephemeral)
- ✅ Events, happenings, and glimpses won't disappear

## Next Steps After PostgreSQL Works

Once PostgreSQL is working, you still need to set up Cloudinary for images:
1. Create account at https://cloudinary.com
2. Add these variables to Railway backend:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
3. Redeploy

Then both data AND images will persist!
