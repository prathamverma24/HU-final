# Event Glimpses Management Guide

## Overview
The Event Glimpses feature allows you to manage the "Enjoy the Events with HU Family" section directly from the admin panel. You can add event videos with titles, captions, hashtags, and thumbnail images.

## Setup Complete ✓

The following has been implemented:

### Backend
- ✓ Glimpse model created in `backend/models.py`
- ✓ API endpoints added in `backend/app.py`:
  - `GET /api/glimpses` - Fetch all glimpses
  - `POST /api/admin/glimpses` - Add new glimpse
  - `DELETE /api/admin/glimpses/:id` - Delete glimpse
- ✓ Database table created (glimpse)

### Frontend
- ✓ AddGlimpse page created (`frontend/src/pages/AddGlimpse.js`)
- ✓ Route added in App.js (`/admin/glimpses/add`)
- ✓ Admin Dashboard updated with Glimpses section
- ✓ EventGlimpses component updated to fetch from API
- ✓ API functions added to `frontend/src/services/api.js`

## How to Use

### Adding a New Glimpse

1. **Login to Admin Dashboard**
   - Go to `/admin/login`
   - Username: `admin`
   - Password: `admin123`

2. **Navigate to Glimpses Section**
   - Scroll down to "🎬 Event Glimpses Management" section
   - Click the "+ Add Glimpse" button

3. **Fill in the Form**
   - **Title**: Event name (e.g., "Alumni Meet 2026")
   - **Caption**: Brief description of the event
   - **Video URL**: YouTube embed URL format
     - Example: `https://www.youtube.com/embed/VIDEO_ID`
     - To get embed URL: Right-click on YouTube video → Copy embed code → Extract URL
   - **Hashtags**: Optional hashtags (e.g., "#AlumniMeet #HUFamily #Reunion")
   - **Thumbnail Image**: Upload an image that represents the event

4. **Submit**
   - Click "Add Glimpse" button
   - You'll be redirected to the dashboard
   - The new glimpse will appear in the Glimpses section

### Managing Glimpses

**View All Glimpses**
- In Admin Dashboard, scroll to "Event Glimpses Management"
- All glimpses are displayed as cards with:
  - Thumbnail image
  - Title and caption
  - Hashtags (if provided)
  - Delete button

**Delete a Glimpse**
- Click the "Delete" button on any glimpse card
- Confirm the deletion
- The glimpse will be removed from both database and frontend

### Frontend Display

The glimpses appear in the "Enjoy the Events with HU Family" section on the homepage:
- Cards show video playing in background (muted, looped)
- Gradient overlay with title and caption
- Click any card to open full video in modal with autoplay
- Responsive grid layout (3 columns on desktop, 2 on tablet, 1 on mobile)

## Video URL Format

**Important**: Use YouTube embed format for videos:
```
https://www.youtube.com/embed/VIDEO_ID
```

**How to get the embed URL:**
1. Go to YouTube video
2. Click "Share" button
3. Click "Embed"
4. Copy the URL from the iframe src attribute

**Example:**
- Regular URL: `https://youtu.be/tCmR4YyQGQE`
- Embed URL: `https://www.youtube.com/embed/tCmR4YyQGQE`

## Database Schema

The Glimpse table has the following fields:
- `id` - Primary key
- `title` - Event title (required)
- `description` - Event caption/description (required)
- `image_path` - Path to thumbnail image (required)
- `video_url` - YouTube embed URL (required)
- `hashtags` - Comma-separated hashtags (optional)
- `is_active` - Boolean flag for visibility (default: true)
- `created_at` - Timestamp
- `updated_at` - Timestamp

## File Structure

```
backend/
├── models.py          # Glimpse model definition
└── app.py            # Glimpse API endpoints

frontend/
├── src/
│   ├── components/
│   │   ├── EventGlimpses.js    # Display glimpses on homepage
│   │   └── EventGlimpses.css   # Styling
│   ├── pages/
│   │   ├── AddGlimpse.js       # Add glimpse form
│   │   ├── AdminDashboard.js   # Glimpses management section
│   │   └── AddContent.css      # Form styling
│   └── services/
│       └── api.js              # API functions

add_glimpse_table.py   # Migration script (already run)
```

## Troubleshooting

**Glimpses not showing on homepage?**
- Check if glimpses exist in Admin Dashboard
- Verify `is_active` is true in database
- Check browser console for API errors

**Video not playing?**
- Ensure you're using embed URL format
- Check if video is public on YouTube
- Verify URL doesn't have extra parameters

**Image not uploading?**
- Check file size (should be reasonable)
- Verify file format (jpg, jpeg, png)
- Ensure upload folders exist and have write permissions

## Next Steps

The system is ready to use! You can now:
1. Add glimpses through the admin panel
2. They will automatically appear on the homepage
3. Users can click to watch full videos
4. Manage (add/delete) glimpses anytime

No more hardcoding needed! 🎉
