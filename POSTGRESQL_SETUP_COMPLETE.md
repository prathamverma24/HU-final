# PostgreSQL Setup - Complete Fix

## 🔴 PROBLEM IDENTIFIED

Your backend was using SQLite instead of PostgreSQL because the `.env` file had:
```
DATABASE_URL=PASTE_YOUR_PUBLIC_URL_HERE
```

This invalid value was being read by the app and overriding Railway's environment variable!

## ✅ WHAT I FIXED

1. **Removed the DATABASE_URL from `.env` file**
   - The `.env` file is for local development only
   - Railway uses environment variables, not the `.env` file
   - Now the app will correctly read Railway's DATABASE_URL

2. **Updated `.env.example` with clear instructions**
   - Shows that DATABASE_URL should NOT be set in .env for Railway
   - Only uncomment for local SQLite development

## 🚀 NEXT STEPS - DEPLOY TO RAILWAY

### Step 1: Verify Railway Environment Variables

1. Go to Railway: https://railway.app
2. Open your **backend service** (not the PostgreSQL database)
3. Click the **Variables** tab
4. Verify `DATABASE_URL` is set

**If DATABASE_URL is NOT there:**
- Click **+ New Variable**
- Click **Add Reference**
- Select your PostgreSQL database
- Select `DATABASE_URL`
- This creates: `DATABASE_URL=${{Postgres.DATABASE_URL}}`

**If DATABASE_URL IS there:**
- Make sure it starts with `postgresql://`
- It should contain `postgres.railway.internal` (internal network)

### Step 2: Deploy the Fix

Push the changes to Railway:

```bash
git add backend/.env backend/.env.example
git commit -m "Fix PostgreSQL connection - remove DATABASE_URL from .env"
git push
```

Railway will automatically redeploy.

### Step 3: Verify It's Working

After deployment completes (2-3 minutes):

1. Go to **Deployments** tab in Railway
2. Click on the latest deployment
3. Check the **Deploy Logs**

**You should see:**
```
Using PostgreSQL database - creating tables with correct schema...
✅ PostgreSQL tables created successfully
✅ Admin user created (username: admin, password: admin123)
```

**NOT:**
```
Using SQLite database at: /app/instance/university.db
```

### Step 4: Test Your Site

1. Go to your site: https://hu-final.vercel.app
2. Add an event from admin panel
3. Redeploy Railway (to test persistence):
   ```bash
   git commit --allow-empty -m "Test persistence"
   git push
   ```
4. Check if the event is still there after redeploy ✅

## 🎯 EXPECTED RESULTS

After this fix:
- ✅ Backend uses PostgreSQL (not SQLite)
- ✅ Data persists across Railway redeployments
- ✅ Events, happenings, and glimpses won't disappear
- ⚠️ Images still need Cloudinary (see below)

## 📸 IMAGES STILL NEED CLOUDINARY

PostgreSQL fixes the DATABASE, but images are stored in the filesystem which is still ephemeral on Railway.

**To fix images permanently:**

1. Create Cloudinary account: https://cloudinary.com (free tier is enough)

2. Get your credentials from Cloudinary Dashboard:
   - Cloud Name
   - API Key
   - API Secret

3. Add to Railway backend Variables:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Redeploy Railway

The code already supports Cloudinary - it will automatically upload images there when these variables are set!

## 🐛 TROUBLESHOOTING

### If it still shows SQLite after deploying:

1. **Check if .env was accidentally committed:**
   ```bash
   git ls-files backend/.env
   ```
   If it shows the file, remove it:
   ```bash
   git rm --cached backend/.env
   git commit -m "Remove .env from git"
   git push
   ```

2. **Verify DATABASE_URL in Railway:**
   - Go to backend service → Variables
   - DATABASE_URL should be there and start with `postgresql://`

3. **Force a clean rebuild:**
   - Go to Deployments → Click three dots → Redeploy

### If you get connection errors:

1. Make sure PostgreSQL database is running (green status in Railway)
2. Make sure both services are in the same Railway project
3. Use the internal URL (postgres.railway.internal), not public URL

### To debug locally:

Run the check script:
```bash
python check_database_url.py
```

This will show you exactly what DATABASE_URL the app is reading.

## 📝 SUMMARY

The issue was simple: the `.env` file had an invalid DATABASE_URL that was overriding Railway's environment variable. By removing it from `.env`, the app will now correctly use Railway's PostgreSQL database.

**Your data will now persist! 🎉**
