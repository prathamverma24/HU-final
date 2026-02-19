# Quick Deployment Reference Card

## 🚀 After Vercel Build Completes

### Step 1: Set Environment Variable (CRITICAL)
```
Vercel Dashboard → Project → Settings → Environment Variables

Name:  REACT_APP_API_URL
Value: https://your-backend-url.railway.app/api
Environments: ✓ Production ✓ Preview ✓ Development
```

### Step 2: Redeploy
```
Vercel Dashboard → Deployments → Click "..." → Redeploy
```

### Step 3: Test
```
Visit: https://your-app.vercel.app
Check: Homepage loads with content
Try: /admin/login (if backend is running)
```

## 📋 Quick Checklist

- [ ] Vercel build completed
- [ ] Environment variable set
- [ ] Redeployed after setting variable
- [ ] Backend is deployed and running
- [ ] Tested homepage
- [ ] Tested admin panel

## 🔗 Important Links

**Vercel Dashboard**: https://vercel.com/dashboard
**Your Project**: https://vercel.com/[your-username]/hu-final

## ⚠️ Common Mistakes

❌ Forgetting to redeploy after setting env variable
❌ Using localhost URL in production
❌ Not deploying backend separately
❌ Wrong API URL format (missing /api at end)

## ✅ Correct Setup

```
Frontend (Vercel):
  REACT_APP_API_URL=https://backend.railway.app/api
                                                 ^^^^
                                            Don't forget /api!

Backend (Railway):
  Running at: https://backend.railway.app
  API endpoint: https://backend.railway.app/api
  Health check: https://backend.railway.app/api/health
```

## 🎯 Quick Test Commands

Test backend is running:
```bash
curl https://your-backend.railway.app/api/health
```

Should return:
```json
{"status": "ok", "message": "API is running"}
```

## 📞 Need Help?

1. Check `VERCEL_DEPLOYMENT_GUIDE.md`
2. Check `DEPLOYMENT_STATUS.md`
3. Look at browser console (F12)
4. Check Vercel build logs
5. Test backend URL directly

## 🎉 Success Indicators

✅ Homepage loads
✅ Sections show content
✅ No console errors
✅ Admin login works
✅ Can edit sections

---

**Remember**: Frontend (Vercel) + Backend (Railway) = Complete System
