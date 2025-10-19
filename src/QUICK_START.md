# Quick Start Guide - MongoDB Migration Complete! ✅

Your wedding website has been successfully migrated from Supabase to MongoDB Atlas.

## ⚡ Next Steps (5 minutes)

### 1. Set Up MongoDB Atlas (2 min)
```
1. Go to https://cloud.mongodb.com/
2. Create a FREE account
3. Create a FREE cluster (M0)
4. Create database user with password
5. Allow access from anywhere (0.0.0.0/0)
6. Get connection string
```

### 2. Configure Connection (1 min)
Open `/api/mongodb.ts` and replace:
```typescript
export const MONGODB_URI = "YOUR_CONNECTION_STRING_HERE";
```

With your actual connection string:
```typescript
export const MONGODB_URI = "mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority";
```

### 3. Test Locally (Optional)
```bash
# Test MongoDB connection first
cd api
deno run --allow-net --allow-env test-connection.ts

# If test passes, start the server
deno run --allow-net --allow-env server.ts
```

Visit `http://localhost:8000/health` to verify it works.

### 4. Deploy Backend (2 min)
**Option A - Deno Deploy (Easiest)**
```bash
deno install -Arf https://deno.land/x/deploy/deployctl.ts
deployctl deploy --project=wedding-rsvp api/server.ts
```

**Option B - Manual**
- Copy `/api/server.ts` to Vercel/Netlify Functions
- Set environment variable: `MONGODB_URI`
- Deploy

### 5. Update Frontend
In `/components/RSVPSection.tsx`, the API endpoint is already set to `/api/rsvp`.

When deploying, ensure your backend is accessible at this path, or update the URL to your backend URL.

## 📁 What Changed?

### ✅ New Files Created
- `/api/server.ts` - MongoDB backend server
- `/api/mongodb.ts` - Database configuration
- `/components/AdminDashboard.tsx` - View RSVPs
- `/MONGODB_SETUP.md` - Detailed setup guide
- `/DEPLOYMENT_GUIDE.md` - Full deployment guide
- `/README.md` - Project documentation

### ❌ Removed
- Supabase backend components (BackendTest, LocalStorageRSVP)
- Supabase imports from RSVPSection

### 🔧 Modified
- `/components/RSVPSection.tsx` - Now uses `/api/rsvp` endpoint

## 🎯 Key Features

### Your MongoDB Backend Includes:
- ✅ RSVP submission and updates
- ✅ Duplicate detection (by phone number)
- ✅ Guest count tracking (+1, +2, +3, Family)
- ✅ Dietary restrictions
- ✅ Personal messages
- ✅ Statistics (total guests, attending, etc.)
- ✅ Admin dashboard

### Available API Endpoints:
```
POST   /api/rsvp              - Submit RSVP
GET    /api/rsvps             - Get all RSVPs
GET    /api/rsvp/:phone       - Check specific RSVP
GET    /api/stats             - Get statistics
GET    /api/health            - Health check
```

## 📊 View Your RSVPs

### Option 1: Admin Dashboard (UI)
1. Use the AdminDashboard component
2. See file: `/AppWithAdmin.tsx` for example
3. Beautiful UI with stats and table

### Option 2: API Endpoint
Visit: `YOUR_BACKEND_URL/rsvps`

Returns JSON with all RSVP data.

## 🔐 Security Notes

- ⚠️ Keep MongoDB connection string private
- ⚠️ Don't commit `/api/mongodb.ts` with real credentials to public repos
- ✅ Use environment variables in production
- ✅ Add authentication to admin endpoints

## 📚 Documentation

- **Quick Setup**: This file
- **Detailed MongoDB Setup**: `/MONGODB_SETUP.md`
- **Deployment Guide**: `/DEPLOYMENT_GUIDE.md`
- **Project Overview**: `/README.md`

## 🆘 Troubleshooting

**"Failed to fetch"**
→ Check backend is deployed and URL is correct

**"Database connection failed"**
→ Verify MongoDB connection string and IP whitelist

**Can't see RSVPs**
→ Visit backend URL + `/rsvps` directly

**Form not submitting**
→ Check browser console for errors

## 🎉 You're All Set!

Your wedding website is ready to collect RSVPs using MongoDB Atlas!

For detailed instructions, see:
- MongoDB Setup: `MONGODB_SETUP.md`
- Deployment: `DEPLOYMENT_GUIDE.md`

---

**Wedding Details:**
- Couple: Monalisa & Neeraj
- Date: November 23rd, 2025
- RSVP Deadline: October 15th, 2025
- Venue: Aura Lawns, Patia, Bhubaneshwar