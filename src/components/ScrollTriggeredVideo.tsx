import { useEffect, useRef, useState } from "react";

export const ScrollTriggeredVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play();
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-12 rounded-2xl overflow-hidden shadow-2xl">
      <video
        ref={videoRef}
        className="w-full h-auto"
        loop
        muted
        playsInline
        
      >
        <source 
          src="/videos/healthy-food.mp4.mov" 
          type="video/mp4" 
        />
        {/* Fallback for browsers that don't support video */}
        <div className="bg-muted h-64 flex items-center justify-center">
          <p className="text-muted-foreground">Your browser does not support video playback</p>
        </div>
      </video>
    </div>
  );
};