import { useEffect, useState } from "react";
import videoSrc from "@assets/output_free_1763271270386.mp4";

export default function IntroVideo({ onComplete }: { onComplete: () => void }) {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("vilkio_intro_seen");
    
    if (hasSeenIntro) {
      setIsPlaying(false);
      onComplete();
    }
  }, [onComplete]);

  const handleVideoEnd = () => {
    sessionStorage.setItem("vilkio_intro_seen", "true");
    setIsPlaying(false);
    onComplete();
  };

  if (!isPlaying) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center" data-testid="intro-video-overlay">
      <video
        autoPlay
        muted
        onEnded={handleVideoEnd}
        className="w-full h-full object-contain"
        data-testid="video-intro"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}
