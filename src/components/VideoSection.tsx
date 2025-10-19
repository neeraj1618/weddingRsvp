import React, { useState } from 'react';
import { Play, Pause, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

// Helper functions
function detectVideoType(url: string) {
  if (!url) return 'none';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('vimeo.com')) return 'vimeo';
  if (url.includes('drive.google.com')) return 'googledrive';
  return 'direct';
}

function extractYouTubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

function extractVimeoId(url: string): string {
  const regExp = /vimeo.com\/(\d+)/;
  const match = url.match(regExp);
  return match ? match[1] : '';
}

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  
  // Replace this with your video URL from YouTube, Vimeo, Google Drive, etc.
  const videoUrl = "https://vimeo.com/1124598839?share=copy"; // Add your video URL here
  const videoType = detectVideoType(videoUrl);

  const togglePlay = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800">
            Invitation
          </h2>
        </div>
        
        <Card className="overflow-hidden shadow-lg max-w-md mx-auto">
          <div className="relative aspect-[9/16] bg-gray-900">
            {!videoUrl ? (
              // Placeholder when no video URL is provided
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-400 to-pink-600">
                <div className="text-center text-white p-8">
                  <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <Play className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Your Invitation Video</h3>
                  <p className="text-white/90 mb-4">Upload your video and add the URL to display it here</p>
                  <div className="text-sm text-white/80">
                    <p>Recommended free hosting:</p>
                    <p>YouTube • Vimeo • Google Drive • Cloudinary</p>
                  </div>
                </div>
              </div>
            ) : videoType === 'youtube' ? (
              // YouTube embed
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${extractYouTubeId(videoUrl)}?rel=0&modestbranding=1`}
                title="Wedding Invitation Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : videoType === 'vimeo' ? (
              // Vimeo embed
              <iframe
                className="w-full h-full"
                src={`https://player.vimeo.com/video/${extractVimeoId(videoUrl)}?title=0&byline=0&portrait=0`}
                title="Wedding Invitation Video"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              // Direct video file or Google Drive
              <>
                <video
                  ref={setVideoRef}
                  className="w-full h-full object-cover"
                  onEnded={handleVideoEnd}
                  poster="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  controls={false}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Play/Pause overlay for direct videos */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    onClick={togglePlay}
                    size="lg"
                    className="bg-white/90 hover:bg-white text-gray-800 rounded-full w-20 h-20 shadow-lg"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8 ml-1" />
                    )}
                  </Button>
                </div>
                
                {/* Gradient overlay for better text visibility */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent h-32"></div>
                
                {/* Video title overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Monalisa & Neeraj's Wedding Invitation</h3>
                  <p className="text-sm opacity-90">A message from the happy couple</p>
                </div>
              </>
            )}
          </div>
        </Card>

        
        {/* Instructions for adding video */}
        {!videoUrl && (
          <div className="text-center mt-6 space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
              <h4 className="font-semibold text-blue-900 mb-2">📹 How to Add Your Wedding Video:</h4>
              <div className="text-sm text-blue-800 space-y-2">
                <p><strong>1. Upload to YouTube:</strong> Upload video → Set to "Unlisted" → Copy URL</p>
                <p><strong>2. Upload to Vimeo:</strong> Upload video → Copy video URL</p>
                <p><strong>3. Upload to Google Drive:</strong> Upload → Share → Copy link</p>
                <p><strong>4. Then:</strong> Paste the URL in the VideoSection.tsx file where it says <code className="bg-blue-100 px-1 rounded">const videoUrl = "";</code></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}