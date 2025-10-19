# Deployment Checklist ✅

Use this checklist to ensure a smooth deployment of your wedding website.

## Pre-Deployment

### MongoDB Atlas Setup
- [ ] Created MongoDB Atlas account at https://cloud.mongodb.com/
- [ ] Created free tier cluster (M0)
- [ ] Created database user with username and strong password
- [ ] Noted down username and password securely
- [ ] Added IP whitelist (0.0.0.0/0 for development, specific IPs for production)
- [ ] Got connection string from Atlas
- [ ] Replaced `<password>` in connection string with actual password
- [ ] Updated `/api/mongodb.ts` with connection string
- [ ] Tested connection with `deno run --allow-net --allow-env api/test-connection.ts`
- [ ] Verified test passed successfully

### Wedding Details Verification
- [ ] Verified couple names are correct in `/components/HeroSection.tsx`
- [ ] Verified wedding date: November 23rd, 2025
- [ ] Verified wedding time: 11:00 AM
- [ ] Verified venue: Aura Lawns, Patia, Bhubaneshwar
- [ ] Verified RSVP deadline: October 15th, 2025
- [ ] Verified contact email in footer

### Code Review
- [ ] Removed or updated any test/dummy data
- [ ] Checked all wedding details for typos
- [ ] Verified form validation works
- [ ] Tested RSVP form locally (if possible)
- [ ] Checked mobile responsiveness
- [ ] Verified video section works (if using video)

## Backend Deployment

### Choose Your Platform
Pick ONE of these options:

#### Option A: Deno Deploy
- [ ] Created account at https://deno.com/deploy
- [ ] Installed deployctl: `deno install -Arf https://deno.land/x/deploy/deployctl.ts`
- [ ] Deployed: `deployctl deploy --project=wedding-rsvp api/server.ts`
- [ ] Set environment variable `MONGODB_URI` in Deno Deploy dashboard
- [ ] Noted deployment URL: `https://wedding-rsvp.deno.dev`
- [ ] Tested health endpoint: `https://wedding-rsvp.deno.dev/health`
- [ ] Verified health check returns status 200 OK

#### Option B: Vercel
- [ ] Created account at https://vercel.com
- [ ] Pushed code to GitHub
- [ ] Connected repository to Vercel
- [ ] Set environment variable `MONGODB_URI` in Vercel settings
- [ ] Deployed successfully
- [ ] Noted deployment URL
- [ ] Tested health endpoint

#### Option C: Netlify
- [ ] Created account at https://netlify.com
- [ ] Pushed code to GitHub
- [ ] Connected repository to Netlify
- [ ] Configured netlify.toml for functions
- [ ] Set environment variable `MONGODB_URI` in Netlify settings
- [ ] Deployed successfully
- [ ] Noted deployment URL
- [ ] Tested health endpoint

### Backend Verification
- [ ] Health endpoint returns 200 OK
- [ ] Health endpoint shows "MongoDB Atlas connected"
- [ ] No errors in deployment logs
- [ ] Backend URL is accessible
- [ ] CORS is configured properly

## Frontend Deployment

### Update API Endpoint
- [ ] Updated `/components/RSVPSection.tsx` with backend URL (if needed)
- [ ] Format: `https://your-backend-url/rsvp`
- [ ] Tested endpoint URL is correct

### Choose Your Platform
Pick ONE of these options:

#### Option A: Vercel (Frontend)
- [ ] Pushed code to GitHub (if not already)
- [ ] Created new project in Vercel
- [ ] Connected GitHub repository
- [ ] Selected framework: React
- [ ] Deployed successfully
- [ ] Noted frontend URL
- [ ] Verified site loads correctly

#### Option B: Netlify (Frontend)
- [ ] Pushed code to GitHub
- [ ] Created new site in Netlify
- [ ] Connected GitHub repository
- [ ] Set build settings (if needed)
- [ ] Deployed successfully
- [ ] Noted frontend URL
- [ ] Verified site loads correctly

#### Option C: GitHub Pages
- [ ] Created GitHub repository
- [ ] Pushed code to repository
- [ ] Installed gh-pages: `npm install --save-dev gh-pages`
- [ ] Updated package.json with deploy script
- [ ] Built project: `npm run build`
- [ ] Deployed: `npm run deploy`
- [ ] Enabled GitHub Pages in repository settings
- [ ] Verified site is live

### Frontend Verification
- [ ] Website loads without errors
- [ ] All sections display correctly (Hero, Video, RSVP)
- [ ] Wedding details are correct
- [ ] Form fields work properly
- [ ] Responsive design works on mobile
- [ ] No console errors in browser

## Integration Testing

### RSVP Form Testing
- [ ] Opened RSVP form on deployed site
- [ ] Filled out form with test data:
  - [ ] Guest name
  - [ ] Phone number
  - [ ] Attendance: Yes
  - [ ] Guest option: +1
  - [ ] Additional guest names
  - [ ] Dietary restrictions
  - [ ] Personal message
- [ ] Submitted form successfully
- [ ] Received success message
- [ ] Form cleared after submission

### Backend Verification
- [ ] Visited `YOUR_BACKEND_URL/rsvps`
- [ ] Confirmed test RSVP appears in response
- [ ] Checked MongoDB Atlas → Browse Collections
- [ ] Confirmed RSVP document exists in database
- [ ] Verified all fields saved correctly
- [ ] Deleted test RSVP from database

### Statistics Testing
- [ ] Visited `YOUR_BACKEND_URL/stats`
- [ ] Confirmed statistics are accurate
- [ ] Verified guest count calculation
- [ ] Checked attending vs. not attending counts

## Admin Dashboard (Optional)

If using admin dashboard:
- [ ] Renamed `/AppWithAdmin.tsx` to `/App.tsx` (backed up original)
- [ ] Redeployed frontend
- [ ] Accessed admin dashboard
- [ ] Verified RSVPs display correctly
- [ ] Verified statistics cards show accurate data
- [ ] Tested refresh button
- [ ] **IMPORTANT**: Added authentication (or removed from production)

## Production Readiness

### Security
- [ ] MongoDB connection string uses environment variable in production
- [ ] `.gitignore` includes sensitive files
- [ ] No secrets committed to public repository
- [ ] CORS restricted to your domain (not `*` in production)
- [ ] Admin endpoints secured with authentication
- [ ] Strong database password used
- [ ] IP whitelist configured appropriately

### Performance
- [ ] Website loads quickly
- [ ] Images optimized (if using)
- [ ] No unnecessary console.log statements
- [ ] Database queries efficient
- [ ] No memory leaks detected

### Monitoring
- [ ] Set up MongoDB Atlas alerts (optional)
- [ ] Configured deployment platform notifications
- [ ] Tested error handling
- [ ] Verified graceful degradation

## Final Checks

### Content
- [ ] All text is free of typos
- [ ] Wedding date: **Sunday, November 23rd, 2025**
- [ ] Wedding time: **11:00 AM**
- [ ] Venue: **Aura Lawns, Patia, Bhubaneshwar**
- [ ] RSVP deadline: **October 15th, 2025**
- [ ] Contact information is correct
- [ ] All links work (if any)

### Functionality
- [ ] RSVP submission works end-to-end
- [ ] Success/error messages display correctly
- [ ] Form validation prevents invalid submissions
- [ ] Mobile experience is smooth
- [ ] Desktop experience is smooth
- [ ] Tablet experience is smooth

### Cross-Browser Testing
- [ ] Tested on Chrome
- [ ] Tested on Safari
- [ ] Tested on Firefox
- [ ] Tested on mobile browsers
- [ ] No browser-specific issues

### Accessibility
- [ ] Form labels are descriptive
- [ ] Required fields marked with *
- [ ] Error messages are clear
- [ ] Keyboard navigation works
- [ ] Color contrast is sufficient

## Post-Deployment

### Share Your Website
- [ ] Tested final URL one more time
- [ ] Shared URL with couple (Monalisa & Neeraj)
- [ ] Created shortened URL (optional): bit.ly, tinyurl, etc.
- [ ] Prepared announcement text with RSVP deadline

### Monitoring
- [ ] Check RSVPs daily/weekly
- [ ] Monitor MongoDB Atlas for usage
- [ ] Check deployment platform for errors
- [ ] Respond to any technical issues promptly

### Backup
- [ ] Documented backend URL
- [ ] Documented frontend URL
- [ ] Documented MongoDB connection details (securely)
- [ ] Saved deployment configuration
- [ ] Exported RSVP data regularly (optional)

## Announcement Template

Once everything is deployed and tested, you can announce:

```
🎉 We're getting married! 💒

Monalisa & Neeraj
Sunday, November 23rd, 2025 at 11:00 AM
Aura Lawns, Patia, Bhubaneshwar

Please RSVP by October 15th, 2025
Visit: [YOUR_WEBSITE_URL]

We can't wait to celebrate with you! ❤️
```

## Emergency Contacts

**If something goes wrong:**

1. **Backend Issues**
   - Check MongoDB Atlas status
   - Check deployment platform status
   - Review error logs in deployment platform
   - Test `/health` endpoint

2. **Frontend Issues**
   - Check deployment logs
   - Verify API endpoint URL
   - Check browser console for errors
   - Try clearing cache

3. **Database Issues**
   - Log in to MongoDB Atlas
   - Check cluster status
   - Verify connection string
   - Check network access whitelist

## Success Criteria

Your deployment is successful when:

✅ Website is live and accessible
✅ RSVP form works end-to-end
✅ RSVPs are saved to MongoDB
✅ Admin can view RSVPs
✅ No errors in production
✅ Mobile experience is smooth
✅ All wedding details are correct
✅ RSVP deadline is clear

## Congratulations! 🎊

If you've checked all boxes, your wedding website is live and ready to collect RSVPs!

**Next milestone**: Watch those RSVPs come in! 💌

---

**Wedding Date**: November 23rd, 2025
**RSVP Deadline**: October 15th, 2025

Good luck with your wedding! 💒❤️
