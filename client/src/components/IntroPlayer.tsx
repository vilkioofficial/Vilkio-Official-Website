import { useState, useEffect } from 'react';

interface IntroPlayerProps {
  onIntroFinish: () => void;
}

export const IntroPlayer = ({ onIntroFinish }: IntroPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  // This is a placeholder for the actual video path.
  // I will get the correct path from you later.
  const videoSrc = '/intro.mp4'; 

  useEffect(() => {
    const video = document.createElement('video');
    video.src = videoSrc;
    video.oncanplaythrough = () => {
      setIsLoading(false);
    };
    // Preload the video
    video.load();
  }, [videoSrc]);

  const handleVideoEnd = () => {
    onIntroFinish();
  };

  return (
    <div className="intro-container">
      {isLoading ? (
        <div className="loading-animation">
          <p>Loading...</p>
        </div>
      ) : (
        <video autoPlay muted onEnded={handleVideoEnd} playsInline>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};
