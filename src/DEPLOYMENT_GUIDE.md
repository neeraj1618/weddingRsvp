# Deployment Guide

This guide will walk you through deploying your wedding website with MongoDB Atlas backend.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Connecting Frontend to Backend](#connecting-frontend-to-backend)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

- MongoDB Atlas account (free tier available)
- GitHub account (for deployment platforms)
- Basic command line knowledge

## MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign up for a free account
3. Create a new organization and project

### 2. Create a Cluster
1. Click "Build a Database"
2. Choose the **FREE** tier (M0)
3. Select your preferred cloud provider and region
4. Name your cluster (e.g., "wedding-cluster")
5. Click "Create Cluster" (this may take a few minutes)

### 3. Create Database User
1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username (e.g., "wedding_admin")
5. Generate or create a strong password **SAVE THIS PASSWORD**
6. Set privileges to "Read and write to any database"
7. Click "Add User"

### 4. Configure Network Access
1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your deployment platform's IP ranges
5. Click "Confirm"

### 5. Get Connection String
1. Go back to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select Driver: "Node.js" and Version: "5.5 or later"
5. Copy the connection string
6. It will look like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
7. Replace `<username>` with your database username
8. Replace `<password>` with your database password

### 6. Update Configuration
Open `/api/mongodb.ts` and update:
```typescript
export const MONGODB_URI = "mongodb+srv://wedding_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority";
```

## Backend Deployment

### Option 1: Deno Deploy (Recommended)

1. **Install Deno** (if not already installed):
   ```bash
   curl -fsSL https://deno.land/install.sh | sh
   ```

2. **Create Deno Deploy Account**:
   - Go to [deno.com/deploy](https://deno.com/deploy)
   - Sign in with GitHub

3. **Deploy**:
   ```bash
   # Install deployctl
   deno install -Arf https://deno.land/x/deploy/deployctl.ts
   
   # Deploy your server
   deployctl deploy --project=wedding-rsvp api/server.ts
   ```

4. **Set Environment Variables**:
   - In Deno Deploy dashboard, go to your project
   - Navigate to "Settings" → "Environment Variables"
   - Add:
     - `MONGODB_URI`: Your MongoDB connection string
     - `DB_NAME`: wedding_website
     - `COLLECTION_NAME`: rsvps

5. **Note your deployment URL**: `https://wedding-rsvp.deno.dev`

### Option 2: Vercel

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Create `vercel.json`** in project root:
   ```json
   {
     "functions": {
       "api/server.ts": {
         "runtime": "vercel-deno@latest"
       }
     }
   }
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Set Environment Variables**:
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add MONGODB_URI, DB_NAME, COLLECTION_NAME

### Option 3: Netlify

1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Create `netlify.toml`**:
   ```toml
   [build]
     functions = "api"
   
   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/:splat"
     status = 200
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

4. **Set Environment Variables**:
   - In Netlify dashboard, go to Site Settings → Environment Variables
   - Add MONGODB_URI, DB_NAME, COLLECTION_NAME

## Frontend Deployment

### Option 1: Vercel

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Wedding website"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Framework: React
   - Click "Deploy"

### Option 2: Netlify

1. **Push to GitHub** (same as above)

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose your GitHub repository
   - Build command: `npm run build` (or leave empty for static)
   - Publish directory: `dist` or `build`
   - Click "Deploy"

### Option 3: GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**:
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/wedding-website"
   }
   ```

3. **Deploy**:
   ```bash
   npm run build
   npm run deploy
   ```

## Connecting Frontend to Backend

### Update API Endpoint

In `/components/RSVPSection.tsx`, update the fetch URL:

```typescript
const response = await fetch('YOUR_BACKEND_URL/rsvp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
});
```

Replace `YOUR_BACKEND_URL` with your actual backend URL:
- Deno Deploy: `https://wedding-rsvp.deno.dev/api`
- Vercel: `https://your-project.vercel.app/api`
- Netlify: `https://your-site.netlify.app/api`

### CORS Configuration

The backend is already configured to accept requests from any origin. In production, you may want to restrict this to your frontend domain only.

In `/api/server.ts`:
```typescript
app.use(
  '/*',
  cors({
    origin: ['https://your-frontend-domain.com'], // Replace with your actual domain
    allowHeaders: ['*'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
  })
)
```

## Testing

### Test Backend Health
Visit: `YOUR_BACKEND_URL/health`

You should see:
```json
{
  "status": "ok",
  "timestamp": "2025-10-19T...",
  "message": "Wedding RSVP server is running!",
  "database": "MongoDB Atlas connected"
}
```

### Test RSVP Submission
1. Visit your frontend website
2. Fill out the RSVP form
3. Submit
4. Check if you receive success message

### View RSVPs
Visit: `YOUR_BACKEND_URL/rsvps`

Or use the Admin Dashboard:
1. Rename `AppWithAdmin.tsx` to `App.tsx` (backup original first)
2. Deploy frontend
3. Click "Admin" button in top-right corner

## Troubleshooting

### "Failed to fetch" Error
- **Check CORS**: Ensure backend allows your frontend domain
- **Check URL**: Verify API endpoint URL is correct
- **Check Network**: Backend must be deployed and accessible

### "Database connection failed"
- **Check connection string**: Verify MongoDB URI is correct
- **Check password**: Ensure password doesn't contain special characters that need URL encoding
- **Check IP whitelist**: Verify 0.0.0.0/0 is allowed in Network Access
- **Check credentials**: Verify database user exists with correct permissions

### 404 on API Routes
- **Deno Deploy**: Ensure routes don't include `/api/` prefix in server.ts
- **Vercel/Netlify**: Check configuration files are set up correctly
- **Frontend**: Ensure fetch URLs include full path

### Environment Variables Not Working
- **Redeploy**: After adding environment variables, redeploy your backend
- **Check syntax**: Ensure variable names match exactly
- **Check platform**: Each platform has different ways to set env vars

### RSVPs Not Saving
- **Check console**: Look for error messages in browser console
- **Check database**: Verify collection exists in MongoDB Atlas
- **Check permissions**: Ensure database user has write permissions

## Post-Deployment Checklist

- [ ] Backend health check returns 200 OK
- [ ] RSVP submission works
- [ ] RSVPs appear in MongoDB Atlas collection
- [ ] Admin dashboard displays RSVPs correctly
- [ ] Email/contact information is correct
- [ ] Wedding date and venue details are accurate
- [ ] Video section displays correctly
- [ ] Mobile responsiveness works
- [ ] CORS is configured properly
- [ ] Environment variables are set
- [ ] MongoDB credentials are secure (not in git)

## Security Best Practices

1. **Never commit secrets**: Ensure `.gitignore` includes sensitive files
2. **Use environment variables**: Don't hardcode MongoDB URI in production
3. **Restrict CORS**: In production, only allow your frontend domain
4. **Secure admin access**: Add authentication to admin dashboard
5. **Rate limiting**: Consider adding rate limiting to prevent spam
6. **MongoDB IP whitelist**: In production, use specific IP ranges instead of 0.0.0.0/0

## Need Help?

- MongoDB Atlas: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com/)
- Deno Deploy: [deno.com/deploy/docs](https://deno.com/deploy/docs)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Netlify: [docs.netlify.com](https://docs.netlify.com/)

---

Congratulations! Your wedding website is now live! 🎉
