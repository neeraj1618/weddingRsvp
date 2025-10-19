import React from 'react';
import { HeroSection } from './components/HeroSection';
import { VideoSection } from './components/VideoSection';
import { RSVPSection } from './components/RSVPSection';
import { Separator } from './components/ui/separator';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50">
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