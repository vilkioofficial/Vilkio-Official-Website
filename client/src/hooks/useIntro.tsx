import { useState, useEffect } from 'react';

const INTRO_LAST_SEEN_KEY = 'introLastSeen';
const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

export const useIntro = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const lastSeen = localStorage.getItem(INTRO_LAST_SEEN_KEY);
    const now = new Date().getTime();

    if (lastSeen) {
      const timeSinceLastSeen = now - parseInt(lastSeen, 10);
      if (timeSinceLastSeen < FIVE_MINUTES_IN_MS) {
        setShowIntro(false);
      }
    }
  }, []);

  const onIntroFinish = () => {
    const now = new Date().getTime();
    localStorage.setItem(INTRO_LAST_SEEN_KEY, now.toString());
    setShowIntro(false);
  };

  return { showIntro, onIntroFinish };
};
