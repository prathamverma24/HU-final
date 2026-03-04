# Vercel Deployment Verification Guide

## Pre-Deployment Checklist

Before deploying to Vercel, ensure all hardcoded content is in place:

### Frontend Files to Verify
```bash
✓ frontend/src/components/EventGlimpses.js - Contains defaultGlimpses array
✓ frontend/src/components/EventsSection.js - Contains defaultEvents array  
✓ frontend/src/components/HappeningsSection.js - Contains defaultHappenings array
✓ frontend/src/pages/Home.js - Properly handles empty arrays
```

### Backend Files to Verify
```bash
✓ app.py - Contains database seeding logic for events/happenings/glimpses
✓ models.py - All required models defined
✓ config.py - Database configuration set
```

## Post-Deployment Verification

### 1. Check Backend API (from Vercel deployed URL)
```bash
# Replace YOUR_RAILWAY_URL with your actual deployed URL
curl https://YOUR_RAILWAY_URL/api/health
curl https://YOUR_RAILWAY_URL/api/events
curl https://YOUR_RAILWAY_URL/api/happenings
curl https://YOUR_RAILWAY_URL/api/glimpses
```

Expected Response:
```json
{
  "message": "API is running",
  "status": "ok"
}
```

### 2. Check Frontend (Vercel URL)
Visit: `https://YOUR_VERCEL_URL`

**Verify these sections are visible**:
- [ ] Hero Section with video
- [ ] About Section
- [ ] Sports and Awards
- [ ] Programs Section
- [ ] Why Haridwar University
- [ ] Happenings Section (shows 6 items)
- [ ] Upcoming Events (shows 6 items)
- [ ] Life at University
- [ ] Technical Section
- [ ] Event Glimpses (shows 4 videos)
- [ ] Placement Section
- [ ] Footer

### 3. Check Admin Dashboard
- URL: `https://YOUR_VERCEL_URL/admin/login`
- Login with:
  - Username: `admin`
  - Password: `admin123`
- Verify you can:
  - [ ] View Events
  - [ ] View Happenings
  - [ ] View Glimpses
  - [ ] Add new content
  - [ ] Edit existing content
  - [ ] Delete content

## Troubleshooting

### Problem: Empty Events/Happenings/Glimpses Section
**Solution**: 
1. Check if backend is running: `curl https://YOUR_API_URL/api/health`
2. Check browser console for API errors
3. Ensure frontend fallback code is in place

### Problem: Admin Dashboard Shows "No Content"
**Solution**:
1. Rebuild backend and redeploy
2. Check database connection in logs
3. Verify seeding code was added to app.py

### Problem: Images Not Loading
**Solution**:
1. Verify image files exist in `/static/images/`
2. Check image path references in database
3. Use full URLs or relative paths consistently

## Content Update Guide

### To Update Default Display Content

1. **Update Frontend Hardcoded Defaults**:
   ```javascript
   // In EventGlimpses.js, EventsSection.js, or HappeningsSection.js
   const defaultGlimpses = [
     {
       id: 'unique-id',
       title: 'New Title',
       description: 'New Description',
       image_path: 'images/path.jpeg',
       video_url: 'https://youtube.com/embed/VIDEO_ID',
       hashtags: '#tags'
     }
   ];
   ```

2. **Update Backend Seeding**:
   ```python
   # In app.py database initialization
   default_glimpses = [
       Glimpse(
           title='New Title',
           description='Description',
           image_path='images/path.jpeg',
           video_url='https://www.youtube.com/embed/VIDEO_ID',
           hashtags='#tags',
           is_active=True
       ),
   ]
   ```

3. **Deploy Changes**:
   - Frontend changes: Push to Vercel (auto-deploys)
   - Backend changes: Push to Railway (auto-deploys)

## Monitoring Content Status

### Check Content Count from Browser Console
```javascript
// Test events
fetch('/api/events').then(r => r.json()).then(data => console.log('Events:', data.length))

// Test happenings
fetch('/api/happenings').then(r => r.json()).then(data => console.log('Happenings:', data.length))

// Test glimpses
fetch('/api/glimpses').then(r => r.json()).then(data => console.log('Glimpses:', data.length))
```

### Expected Results
- Events: Minimum 4
- Happenings: Minimum 3
- Glimpses: Minimum 4

## Success Indicators

✅ **Public Page**:
- All sections visible and populated
- Images and videos loading
- Content appears without API errors
- Even if API is slow, content still shows (from hardcoded defaults)

✅ **Admin Dashboard**:
- Can login successfully
- Can view all content
- Can add/edit/delete content
- Changes reflected on public page

✅ **Database**:
- Backend initializes with default content
- Admin changes persist
- No errors in deployment logs

## Performance Notes

- Hardcoded defaults load instantly
- API content loads asynchronously
- If API is slow/offline, users see hardcoded content
- No blank pages or missing sections
- Professional presentation maintained always

---

**Last Updated**: March 4, 2026
**Deployment Status**: Ready for Vercel
