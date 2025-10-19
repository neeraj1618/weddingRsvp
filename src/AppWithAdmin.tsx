import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { VideoSection } from './components/VideoSection';
import { RSVPSection } from './components/RSVPSection';
import { AdminDashboard } from './components/AdminDashboard';
import { Separator } from './components/ui/separator';
import { Button } from './components/ui/button';
import { Lock, Home } from 'lucide-react';

/**
 * Optional App component with admin dashboard toggle
 * 
 * To use this instead of the default App.tsx:
 * 1. Rename App.tsx to AppOriginal.tsx
 * 2. Rename this file to App.tsx
 * 
 * Note: In production, you should implement proper authentication
 * for the admin dashboard instead of a simple toggle button.
 */
export default function AppWithAdmin() {
  const [showAdmin, setShowAdmin] = useState(false);

  if (showAdmin) {
    return (
      <>
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={() => setShowAdmin(false)}
            variant="outline"
            className="gap-2 bg-white shadow-lg"
          >
            <Home className="w-4 h-4" />
            Back to Website
          </Button>
        </div>
        <AdminDashboard />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50">
      {/* Admin Access Button - Remove in production or add proper auth */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setShowAdmin(true)}
          variant="outline"
          className="gap-2 bg-white shadow-lg"
          size="sm"
        >
          <Lock className="w-4 h-4" />
          Admin
        </Button>
      </div>

      <HeroSection />
      <Separator className="my-16" />
      <VideoSection />
      <Separator className="my-16" />
      <RSVPSection />
      
      {/* Footer */}
      <footer className="py-12 text-center text-gray-600">
        <div className="container mx-auto px-4">
          <p>Made with ❤️ for our special day</p>
        </div>
      </footer>
    </div>
  );
}
