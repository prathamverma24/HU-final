# Access Your Site on Mobile Device 📱

## Your Site is Already Running!

Both your frontend and backend servers are running and accessible on your local network.

## 🌐 Access URLs

### Frontend (Main Website)
```
Local Network: http://10.145.132.164:3000
```

### Backend API
```
Local Network: http://10.79.154.164:5000
```

## 📱 How to Access on Your Mobile Device

### Step 1: Connect to Same WiFi
Make sure your mobile device is connected to the **same WiFi network** as your computer.

### Step 2: Open Browser on Mobile
Open any browser on your mobile device:
- Safari (iOS)
- Chrome (Android/iOS)
- Firefox
- Samsung Internet

### Step 3: Visit the URLs

#### To View Main Website:
```
http://10.145.132.164:3000
```

#### To Access Admin Panel:
```
http://10.145.132.164:3000/admin/login
```

**Login Credentials:**
- Username: `admin`
- Password: `admin123`

## 🎯 What to Test

### Main Website
1. Open: `http://10.145.132.164:3000`
2. Check all sections load properly
3. Test navigation
4. Verify images display
5. Check mobile responsiveness

### Admin Panel
1. Open: `http://10.145.132.164:3000/admin/login`
2. Login with credentials above
3. Navigate through dashboard
4. Try editing a section
5. Test in portrait and landscape modes

## 🔧 Troubleshooting

### Can't Access?

**Check 1: Same Network**
- Ensure mobile and computer are on same WiFi
- Check WiFi name on both devices

**Check 2: Firewall**
- Windows Firewall might be blocking
- Try temporarily disabling firewall
- Or add exception for ports 3000 and 5000

**Check 3: Servers Running**
- Verify both servers are still running
- Check terminal for any errors

**Check 4: IP Address**
- IP might change if computer restarts
- Check terminal for current IP
- Look for "On Your Network: http://..."

### Alternative: Use Computer's IP

If the above IPs don't work, find your computer's IP:

**Windows:**
```cmd
ipconfig
```
Look for "IPv4 Address" under your WiFi adapter

**Then use:**
```
http://YOUR_IP:3000
```

## 📋 Quick Test Checklist

### Homepage Test
- [ ] Open `http://10.145.132.164:3000`
- [ ] Hero section displays
- [ ] All sections load
- [ ] Images show correctly
- [ ] Smooth scrolling
- [ ] No horizontal scroll

### Admin Panel Test
- [ ] Open `http://10.145.132.164:3000/admin/login`
- [ ] Login works
- [ ] Dashboard displays
- [ ] Section cards are tappable
- [ ] Edit form works
- [ ] Save functionality works
- [ ] Navigation is smooth

### Mobile Responsiveness Test
- [ ] Text is readable without zooming
- [ ] Buttons are easy to tap
- [ ] Forms are usable
- [ ] No layout issues
- [ ] Works in portrait mode
- [ ] Works in landscape mode

## 🎨 Test Different Sections

### Test Hero Section Edit
1. Go to admin panel
2. Tap "Hero Section" card
3. Change badge text to "MOBILE TEST"
4. Save changes
5. Go to main website
6. Verify change appears

### Test Dashboard Navigation
1. Open admin dashboard
2. Scroll through all sections
3. Tap different cards
4. Check responsiveness
5. Test buttons

### Test Form Inputs
1. Open any edit page
2. Try typing in inputs
3. Test textareas
4. Try add/remove buttons
5. Test save button

## 💡 Tips

### For Best Experience
1. **Use WiFi** - Faster than mobile data
2. **Landscape mode** - Better for forms
3. **Portrait mode** - Good for browsing
4. **Clear cache** - If you see old content
5. **Refresh** - Pull down to refresh on mobile

### Testing Different Devices
- Test on phone (portrait/landscape)
- Test on tablet if available
- Try different browsers
- Test with different screen sizes

## 🔒 Security Note

These URLs only work on your local network. They are:
- ✅ Safe for testing
- ✅ Not accessible from internet
- ✅ Only visible to devices on your WiFi
- ✅ Perfect for development

## 📞 Share with Others

If you want others on your network to test:

**Share these URLs:**
```
Main Site: http://10.145.132.164:3000
Admin Panel: http://10.145.132.164:3000/admin/login
```

**Share credentials:**
```
Username: admin
Password: admin123
```

## 🚀 Next Steps

After testing on mobile:
1. Note any issues you find
2. Test all admin features
3. Verify content changes work
4. Check performance
5. Test on different devices if possible

## 📱 QR Code Option

You can create a QR code for easy access:
1. Go to: https://www.qr-code-generator.com/
2. Enter: `http://10.145.132.164:3000`
3. Generate QR code
4. Scan with mobile camera
5. Opens directly in browser

## ⚡ Quick Access

**Save these to your phone's home screen:**

**iOS (Safari):**
1. Open URL in Safari
2. Tap Share button
3. Tap "Add to Home Screen"
4. Name it "HU Admin" or "HU Website"

**Android (Chrome):**
1. Open URL in Chrome
2. Tap menu (3 dots)
3. Tap "Add to Home screen"
4. Name it and add

---

## 🎉 Ready to Test!

**Your URLs:**
- **Main Website**: http://10.145.132.164:3000
- **Admin Panel**: http://10.145.132.164:3000/admin/login
- **Login**: admin / admin123

**Open these on your mobile device now and test the responsive design!**

---

**Note**: If IPs don't work, check your computer's actual IP address using `ipconfig` command and use that IP instead.
