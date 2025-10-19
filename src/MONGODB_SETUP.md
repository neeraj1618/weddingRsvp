# MongoDB Atlas Setup Guide

This wedding website now uses MongoDB Atlas for storing RSVP data. Follow these steps to set up your backend:

## Prerequisites
- MongoDB Atlas account (free tier available)
- Your MongoDB connection string

## Setup Steps

### 1. Configure MongoDB Connection

Open `/api/mongodb.ts` and replace the placeholder connection string with your actual MongoDB Atlas connection string:

```typescript
export const MONGODB_URI = "mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority";
export const DB_NAME = "wedding_website";
export const COLLECTION_NAME = "rsvps";
```

### 2. MongoDB Atlas Configuration

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (free tier is sufficient)
3. Create a database user:
   - Go to Database Access
   - Add New Database User
   - Set username and password
   - Grant "Read and write to any database" privileges

4. Whitelist IP addresses:
   - Go to Network Access
   - Add IP Address
   - Either add your current IP or allow access from anywhere (0.0.0.0/0) for development

5. Get your connection string:
   - Go to your Cluster
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

### 3. Deploy the Backend

The backend server is located at `/api/server.ts` and uses:
- **Framework**: Hono (lightweight web framework)
- **Runtime**: Deno
- **Database**: MongoDB Atlas

To run locally with Deno:
```bash
cd api
deno run --allow-net --allow-env server.ts
```

### 4. API Endpoints

Once deployed, your backend will have the following endpoints:

- `GET /health` - Health check and database connectivity test
- `POST /rsvp` - Submit or update an RSVP
- `GET /rsvps` - Get all RSVPs (for wedding planning)
- `GET /rsvp/:phoneNumber` - Check if a phone number has already RSVPed
- `GET /stats` - Get RSVP statistics (total guests, attending, etc.)

### 5. Data Structure

RSVPs are stored with the following schema:

```typescript
{
  guestName: string,
  phoneNumber: string,
  attendance: 'yes' | 'no',
  guestOption: 'just-me' | 'plus-one' | 'plus-two' | 'plus-three' | 'family',
  guestNames: string,
  dietaryRestrictions: string,
  message: string,
  submittedAt: Date,
  updatedAt: Date
}
```

## Production Deployment

For production deployment, you can use:

1. **Deno Deploy**: Deploy the backend directly
2. **Vercel**: Deploy as a serverless function
3. **Netlify Functions**: Deploy as a Netlify function
4. **Any Deno-compatible hosting**: The backend uses standard Deno APIs

## Security Notes

- The MongoDB connection string contains your database password - keep it secure
- Never commit the connection string to public repositories
- Use environment variables in production
- Consider implementing authentication for the admin endpoints (GET /rsvps, GET /stats)

## Viewing RSVPs

To view all submitted RSVPs, visit: `your-backend-url/rsvps`

This will return all RSVP data in JSON format for easy viewing and management.

## Need Help?

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Deno Documentation](https://deno.land/manual)
- [Hono Documentation](https://hono.dev/)
