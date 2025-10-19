# Monalisa & Neeraj's Wedding Website 💒

A beautiful, responsive wedding website with RSVP functionality powered by MongoDB Atlas.

## Wedding Details

- **Couple**: Monalisa & Neeraj
- **Date**: Sunday, November 23rd, 2025
- **Time**: 11:00 AM
- **Venue**: Aura Lawns, Patia, Bhubaneshwar
- **RSVP Deadline**: October 15th, 2025

## Features

### 🎨 Frontend
- **Hero Section**: Beautiful wedding announcement with date, time, and venue
- **Video Section**: Optimized for 9:16 aspect ratio invitation videos
- **RSVP Form**: Comprehensive form collecting:
  - Guest name and phone number
  - Attendance confirmation
  - Guest count options (+1, +2, +3, Family/Group)
  - Names of additional guests
  - Dietary restrictions
  - Personal messages
- **Responsive Design**: Works beautifully on all devices
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS

### 🗄️ Backend
- **Database**: MongoDB Atlas (cloud-hosted, free tier available)
- **Framework**: Hono (lightweight, fast web framework)
- **Runtime**: Deno (modern, secure runtime)
- **API Endpoints**:
  - POST `/api/rsvp` - Submit or update RSVP
  - GET `/api/rsvps` - View all RSVPs
  - GET `/api/rsvp/:phoneNumber` - Check RSVP status
  - GET `/api/stats` - Get RSVP statistics
  - GET `/api/health` - Health check

### 📊 Admin Dashboard
- View all RSVP submissions
- Statistics overview (total RSVPs, attending, not attending, total guests)
- Sortable table with guest details
- Real-time refresh capability

## Quick Start

### 1. Configure MongoDB

1. Create a free MongoDB Atlas account at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a cluster and get your connection string
3. Update `/api/mongodb.ts` with your connection string:

```typescript
export const MONGODB_URI = "mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority";
```

For detailed setup instructions, see [MONGODB_SETUP.md](./MONGODB_SETUP.md)

### 2. Update Wedding Details (Optional)

If you want to customize the wedding details:
- Edit `/components/HeroSection.tsx` for names, date, venue
- Edit `/components/RSVPSection.tsx` for RSVP deadline
- Edit `/components/VideoSection.tsx` for invitation video

### 3. Deploy

#### Frontend
Deploy the frontend to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- Any other static hosting

#### Backend
Deploy the backend (`/api/server.ts`) to:
- Deno Deploy (recommended)
- Vercel Serverless Functions
- Netlify Functions
- Any Deno-compatible hosting

### 4. Access Admin Dashboard

To view RSVPs, create a route to the AdminDashboard component:
```tsx
import { AdminDashboard } from './components/AdminDashboard';

// In your router
<Route path="/admin" element={<AdminDashboard />} />
```

Or access the API directly: `your-backend-url/rsvps`

## Project Structure

```
├── api/
│   ├── server.ts          # Main backend server (Hono + MongoDB)
│   └── mongodb.ts         # MongoDB configuration
├── components/
│   ├── HeroSection.tsx    # Wedding announcement
│   ├── VideoSection.tsx   # Invitation video player
│   ├── RSVPSection.tsx    # RSVP form
│   ├── AdminDashboard.tsx # Admin view for RSVPs
│   └── ui/                # Shadcn UI components
├── styles/
│   └── globals.css        # Global styles
├── App.tsx                # Main app component
├── MONGODB_SETUP.md       # Detailed MongoDB setup guide
└── README.md              # This file
```

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **Backend**: Deno, Hono
- **Database**: MongoDB Atlas
- **Forms**: React Hook Form

## RSVP Data Structure

Each RSVP is stored with:
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

## Security Considerations

- Keep your MongoDB connection string private
- Use environment variables in production
- Never commit secrets to version control
- Consider adding authentication for admin endpoints
- Implement rate limiting for public endpoints

## Support

For questions or issues:
- Email: wedding@monalisaneeraj.com
- See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for detailed setup instructions

## License

This is a personal wedding website. Feel free to use as inspiration for your own projects!

---

Made with ❤️ for Monalisa & Neeraj's special day
