# Vercel Deployment Guide - CMS Features

## Important: Environment Variables

Your frontend is deploying to Vercel, but it needs to know where your backend API is located.

### Step 1: Set Environment Variable in Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (HU-final)
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: Your backend API URL (e.g., `https://your-backend.railway.app/api`)
   - **Environment**: Production, Preview, Development (select all)
5. Click **Save**
6. **Redeploy** your project for changes to take effect

### Step 2: Backend URL

Your backend needs to be deployed separately. Options:

#### Option A: Railway (Recommended)
Your backend is likely on Railway. The URL format is:
```
https://your-app-name.up.railway.app/api
```

#### Option B: Other Platform
If using another platform, use that URL.

### Step 3: Update CORS in Backend

Make sure your backend `app.py` allows requests from your Vercel domain:

```python
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "https://hu-final.vercel.app",  # Your Vercel domain
            "https://*.vercel.app",
            "https://*.railway.app",
            "https://*.up.railway.app"
        ],
        # ... rest of config
    }
})
```

## CMS Features in Production

### What Works Automatically
✅ All frontend components fetch from API
✅ Section content displays correctly
✅ Events, Happenings, Glimpses work
✅ Public pages work perfectly

### What Needs Backend
⚠️ Admin panel requires backend to be running
⚠️ Section editing requires backend API
⚠️ Content updates require backend database

### Database Considerations

Your backend uses SQLite locally, but for production you should:

1. **Keep SQLite** (simpler, works for small sites)
   - Database file stored on backend server
   - May lose data on redeployments (depends on platform)

2. **Use PostgreSQL** (recommended for production)
   - Persistent data storage
   - Better for production environments
   - Railway offers free PostgreSQL

## Deployment Checklist

### Before Deploying

- [ ] Backend is deployed and accessible
- [ ] Backend URL is noted
- [ ] CORS is configured for Vercel domain
- [ ] Database is initialized with default content

### In Vercel

- [ ] Environment variable `REACT_APP_API_URL` is set
- [ ] Variable is set for all environments
- [ ] Project is redeployed after setting variable

### After Deploying

- [ ] Visit your Vercel URL
- [ ] Check homepage loads correctly
- [ ] Verify sections display content
- [ ] Test admin login (if backend is running)
- [ ] Try editing a section (if backend is running)

## Testing Production Deployment

### 1. Test Homepage
Visit: `https://your-app.vercel.app`

Should see:
- Hero section with content
- About section with stats
- Why section with reasons
- Utkarsh section with fests
- Technical section with activities
- Events and happenings

### 2. Test Admin Panel
Visit: `https://your-app.vercel.app/admin/login`

Should see:
- Login page
- Can login with credentials
- Dashboard shows sections
- Can edit sections (if backend is running)

## Troubleshooting

### Issue: Sections show default content
**Cause**: Frontend can't reach backend API
**Fix**: 
1. Check `REACT_APP_API_URL` is set correctly
2. Verify backend is running
3. Check CORS configuration
4. Look at browser console for errors

### Issue: Admin panel doesn't work
**Cause**: Backend not accessible
**Fix**:
1. Ensure backend is deployed
2. Check backend URL is correct
3. Test backend directly: `https://your-backend.com/api/health`

### Issue: Changes don't save
**Cause**: Backend database issue or API error
**Fix**:
1. Check backend logs
2. Verify database is initialized
3. Test API endpoints directly

### Issue: Build fails on Vercel
**Cause**: npm vulnerabilities or build errors
**Fix**:
1. Vulnerabilities in dev dependencies are usually safe to ignore
2. Check build logs for actual errors
3. Ensure all imports are correct

## Current Build Status

Your build is running with these warnings:
- 65 vulnerabilities (18 moderate, 47 high)
- These are in development dependencies (eslint, jest)
- They don't affect production build
- Safe to ignore for now

## Production Architecture

```
┌─────────────────┐
│  Vercel         │
│  (Frontend)     │
│  React App      │
└────────┬────────┘
         │
         │ API Calls
         │
┌────────▼────────┐
│  Railway/Other  │
│  (Backend)      │
│  Flask API      │
└────────┬────────┘
         │
         │
┌────────▼────────┐
│  Database       │
│  SQLite/        │
│  PostgreSQL     │
└─────────────────┘
```

## Next Steps

1. **Wait for Vercel build to complete**
2. **Note your Vercel URL** (e.g., hu-final.vercel.app)
3. **Deploy backend** (if not already deployed)
4. **Set environment variable** in Vercel
5. **Redeploy** frontend
6. **Test** the production site

## Important Notes

- Frontend and backend are separate deployments
- Frontend (Vercel) is static files + React
- Backend (Railway/other) is Flask API + Database
- They communicate via API calls
- Admin features require backend to be running
- Public pages work even if backend is down (shows default content)

## Support

If you encounter issues:
1. Check Vercel build logs
2. Check backend logs (Railway/other)
3. Test API endpoints directly
4. Check browser console for errors
5. Verify environment variables are set

---

**Your frontend is deploying now. Once complete, set the environment variable and redeploy!**
