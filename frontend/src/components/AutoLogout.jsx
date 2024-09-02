import { useEffect, useRef, useCallback } from 'react';

const AutoLogout = (timeout = 900000, onLogout) => { // 900000 ms = 15 minutes
  const timer = useRef(null);

  const resetTimer = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(onLogout, timeout);
  }, [timeout, onLogout]);

  useEffect(() => {
    const handleActivity = () => resetTimer();

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    resetTimer();

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [resetTimer]);

  return null;
};

export default AutoLogout;
