import React from 'react';
import { Heart, Calendar, MapPin } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-100 to-pink-100">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-pink-300 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-rose-300 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Heart decoration */}
          <div className="mb-8">
            <Heart className="w-16 h-16 text-rose-400 mx-auto mb-4 animate-pulse" fill="currentColor" />
          </div>
          
          {/* Main heading */}
          <h1 className="text-6xl md:text-8xl font-serif text-gray-800 mb-6">
            Monalisa & Neeraj
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light">
            Together with our families, we invite you to celebrate our love
          </p>
          
          {/* Wedding details */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-12">
            <div className="flex items-center gap-3 text-gray-700">
              <Calendar className="w-6 h-6 text-rose-500" />
              <div>
                <p className="text-lg font-semibold">23rd November 2025</p>
                <p className="text-sm text-gray-600">Sunday at 11:00 AM</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-6 h-6 text-rose-500" />
              <div>
                <p className="text-lg font-semibold">Aura Lawns</p>
                <p className="text-sm text-gray-600">Patia, Bhubaneshwar</p>
              </div>
            </div>
          </div>
          

        </div>
      </div>
    </div>
  );
}