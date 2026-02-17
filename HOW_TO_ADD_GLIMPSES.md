# How to Add Event Glimpses - Complete Guide

## ✅ System is Working!

The Event Glimpses system is fully functional. Here's how to use it:

## Current Status

**Glimpses in Database:** 2
1. ✓ Alumni Meet (always shows as first card)
2. ✓ DJ Night 2026 (test glimpse added)

## How to Add New Glimpses

### Step 1: Login to Admin Dashboard
1. Go to: `http://localhost:3000/admin/login`
2. Username: `admin`
3. Password: `admin123`
4. Click "Login"

### Step 2: Navigate to Glimpses Section
1. Scroll down to "🎬 Event Glimpses Management" section
2. You'll see all existing glimpses displayed as cards
3. Click the "+ Add Glimpse" button

### Step 3: Fill the Form
Fill in all required fields:

**Event Title** (required)
- Example: "DJ Night 2026"
- This will be the main heading on the card

**Caption/Description** (required)
- Example: "An electrifying night of music, dance, and celebration"
- This appears below the title on the card

**YouTube Video URL** (required)
- **IMPORTANT:** Use embed format!
- ✓ Correct: `https://www.youtube.com/embed/VIDEO_ID`
- ✗ Wrong: `https://youtu.be/VIDEO_ID`
- ✗ Wrong: `https://www.youtube.com/watch?v=VIDEO_ID`

**How to get embed URL:**
1. Go to your YouTube video
2. Click "Share" button
3. Click "Embed"
4. Copy the URL from the iframe src
5. Example: `https://www.youtube.com/embed/tCmR4YyQGQE`

**Hashtags** (optional)
- Example: `#DJNight #HUEvents #Party`
- Separate with spaces
- Will display on the card

**Event Image** (required)
- Upload a thumbnail image for the card
- Recommended size: 1200x800px or similar
- Formats: JPG, JPEG, PNG

### Step 4: Submit
1. Click "Add Glimpse" button
2. Wait for success message
3. You'll be redirected to dashboard
4. New glimpse appears in the list

### Step 5: View on Homepage
1. Go to homepage: `http://localhost:3000`
2. Scroll down to "Enjoy the Events with HU Family" section
3. Your new glimpse card will appear
4. Click the card to play the video in modal

## How It Works

### Automatic Features
✅ **Alumni Meet Always Shows:** Hardcoded as first card, never removed
✅ **Database Glimpses:** All other glimpses come from database
✅ **Auto-Refresh:** New glimpses appear immediately after adding
✅ **Video Background:** Video plays muted in card background
✅ **Click to Play:** Full video opens in modal with autoplay
✅ **Image Management:** Images saved to both static and public folders
✅ **Auto-Delete:** Deleting glimpse removes image files too

### Card Display Order
1. Alumni Meet (always first - hardcoded fallback)
2. All other glimpses from database (newest first)

## Deleting Glimpses

### From Admin Dashboard
1. Find the glimpse card in "Event Glimpses Management"
2. Click "Delete" button
3. Confirm deletion
4. Glimpse and its image are removed
5. Homepage updates automatically

**Note:** You cannot delete Alumni Meet from admin panel (it's hardcoded as fallback)

## Troubleshooting

### Video Not Playing
**Problem:** Video URL is in wrong format

**Solution:**
- Must use: `https://www.youtube.com/embed/VIDEO_ID`
- Get it from YouTube → Share → Embed → Copy URL

### Glimpse Not Showing
**Problem:** Backend or frontend not running

**Solution:**
1. Check backend is running: `python backend/app.py`
2. Check frontend is running: `cd frontend && npm start`
3. Refresh browser (Ctrl+R)

### Image Not Loading
**Problem:** Image file missing or wrong path

**Solution:**
- Image should be in both:
  - `static/images/`
  - `frontend/public/images/`
- Upload through admin panel handles this automatically

### Can't Add Glimpse
**Problem:** Form validation or API error

**Solution:**
1. Check all required fields are filled
2. Verify video URL is in embed format
3. Check image file is selected
4. Check browser console for errors (F12)

## Example: Adding a New Glimpse

Let's add "Canvas Competition 2026":

1. **Login:** admin/admin123
2. **Click:** "+ Add Glimpse"
3. **Fill Form:**
   - Title: `Canvas Competition 2026`
   - Description: `Unleash your creativity in this exciting canvas art competition`
   - Video URL: `https://www.youtube.com/embed/YOUR_VIDEO_ID`
   - Hashtags: `#CanvasComp #Art #HUEvents`
   - Image: Upload `canvacomp.jpeg`
4. **Submit:** Click "Add Glimpse"
5. **Verify:** Go to homepage and see the new card

## Video URL Examples

### ✓ Correct Format (Embed)
```
https://www.youtube.com/embed/tCmR4YyQGQE
https://www.youtube.com/embed/dQw4w9WgXcQ
https://www.youtube.com/embed/9bZkp7q19f0
```

### ✗ Wrong Format (Will Not Work)
```
https://youtu.be/tCmR4YyQGQE
https://www.youtube.com/watch?v=tCmR4YyQGQE
https://m.youtube.com/watch?v=tCmR4YyQGQE
```

### How to Convert
If you have: `https://youtu.be/tCmR4YyQGQE`
Convert to: `https://www.youtube.com/embed/tCmR4YyQGQE`

Just replace `youtu.be/` with `youtube.com/embed/`

## Database Check

To see all glimpses in database:
```bash
python check_glimpses.py
```

To test API endpoint:
```bash
python test_glimpses_api.py
```

To add test glimpse:
```bash
python test_add_glimpse.py
```

## Summary

✅ System is fully functional
✅ Add glimpses through admin panel
✅ Alumni Meet always shows (hardcoded)
✅ All other glimpses from database
✅ Videos play in modal on click
✅ Auto-delete removes images too
✅ No hardcoding needed!

**Just use the admin panel to add/delete glimpses!**
