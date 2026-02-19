# Admin Section Editing Guide

## Overview
You can now edit all major sections of your website directly from the admin panel without touching any code!

## How to Access

1. Go to `http://localhost:3000/admin/login` (or your deployed URL)
2. Login with your admin credentials:
   - Username: `admin`
   - Password: `admin123`
3. You'll see the Admin Dashboard with all management options

## Available Sections to Edit

### 🏠 Hero Section
The main banner at the top of your homepage.

**What you can edit:**
- Badge text (e.g., "ADMISSIONS 2026 OPEN")
- Main title (white and green parts)
- Description text
- Apply Now button link
- Campus Tour button link
- Background video URL
- Fallback background image
- Logo image

**How to edit:**
1. Click "Edit" on the Hero Section card
2. Update any fields you want to change
3. Click "Save Changes"
4. Refresh your homepage to see the updates

---

### ℹ️ About Section
The "Ignite the Intellect" section with stats.

**What you can edit:**
- Main title
- Description paragraph
- "Know More" link
- Statistics cards (you can't add/remove stats from the form yet, but you can edit existing ones)

**How to edit:**
1. Click "Edit" on the About Section card
2. Modify the title, description, or link
3. Click "Save Changes"

---

### ⭐ Why Section
The "Why Haridwar University?" section with reason cards.

**What you can edit:**
- Main title
- Description paragraph
- Individual reason cards:
  - ID number (01, 02, etc.)
  - Title
  - Subtitle
  - Image path

**How to edit:**
1. Click "Edit" on the Why Section card
2. Scroll to see all reason cards
3. Edit any reason's details
4. You can add new reasons or remove existing ones
5. Click "Save Changes"

**To add a new reason:**
- Click "+ Add Reason" button
- Fill in the details
- Save

**To remove a reason:**
- Click "Remove Reason" button on the card you want to delete
- Save

---

### 🎉 Utkarsh Section
The festival section with UTkarsh, Krida, and Tech Sangram.

**What you can edit:**
- Section title
- Subtitle
- Background video URL
- Background image path
- Individual fest cards:
  - Name
  - Category
  - Description
  - Color (hex code like #FF6B6B)
  - Video ID (YouTube video ID)
  - Image URL

**How to edit:**
1. Click "Edit" on the Utkarsh Section card
2. Update the main title and subtitle
3. Change background video or image
4. Edit individual fest details
5. Add or remove fests as needed
6. Click "Save Changes"

**Tips:**
- For video ID, use just the ID part from YouTube URL
  - Example: From `https://youtu.be/QoUjgq-U5IE`, use `QoUjgq-U5IE`
- Colors should be in hex format: `#FF6B6B`
- Leave video_id empty (null) if you don't want a video for that fest

---

### 💡 Technical Section
The "Technical and Innovation Activities" section.

**What you can edit:**
- Section title
- Individual activity cards:
  - Title
  - Description
  - Image path

**How to edit:**
1. Click "Edit" on the Technical Section card
2. Update the section title
3. Edit individual activities
4. Add or remove activities
5. Click "Save Changes"

**To add a new activity:**
- Click "+ Add Activity" button
- Fill in title, description, and image path
- Save

**To remove an activity:**
- Click "Remove Activity" button
- Save

---

## Important Notes

### Image Paths
- Images should be in `/images/` folder
- Use format: `/images/your-image.jpg`
- Make sure the image exists in `frontend/public/images/`

### Video URLs
- For background videos, use full embed URL: `https://www.youtube.com/embed/VIDEO_ID`
- For fest videos in Utkarsh section, use just the video ID: `QoUjgq-U5IE`

### Colors
- Use hex color codes: `#FF6B6B`, `#4ECDC4`, `#95E1D3`
- You can find hex codes at https://htmlcolorcodes.com/

### Links
- Always include `https://` in URLs
- Example: `https://huroorkee.ac.in/apply-now`

### Saving Changes
- Changes are saved immediately to the database
- Refresh your homepage to see the updates
- If something looks wrong, you can go back and edit again

---

## Troubleshooting

### Changes not appearing?
1. Make sure you clicked "Save Changes"
2. Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
3. Clear browser cache if needed

### Error when saving?
1. Check that all required fields are filled
2. Make sure URLs are valid (include https://)
3. Check that image paths are correct

### Section looks broken?
1. Go back to the edit page
2. Check all fields have proper values
3. Make sure you didn't accidentally delete important content
4. You can always restore default values by re-entering them

---

## Other Management Options

The admin dashboard also lets you manage:
- **Events**: Add, edit, delete upcoming events
- **Happenings**: Manage news and recent activities
- **Glimpses**: Add event videos and photos

---

## Need Help?

If you encounter any issues:
1. Check the browser console for errors (F12)
2. Verify the backend is running (http://localhost:5000/api/health)
3. Make sure you're logged in as admin
4. Contact your developer if problems persist

---

## Best Practices

1. **Test changes**: Make small changes and test before making many updates
2. **Backup content**: Keep a copy of important text before major edits
3. **Image quality**: Use high-quality images for best appearance
4. **Mobile view**: Check how changes look on mobile devices
5. **Consistency**: Keep similar sections styled consistently

---

## Quick Reference

| Section | Main Use | Key Fields |
|---------|----------|------------|
| Hero | First impression, CTAs | Title, Description, Links |
| About | University info | Description, Stats |
| Why | Reasons to join | Reasons array |
| Utkarsh | Festival info | Fests array |
| Technical | Activities | Activities array |

---

**Remember**: All changes are immediate and affect the live website. Always preview your changes!
