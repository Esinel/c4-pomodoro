import { useEffect, useRef } from "react";

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export function useAudioManager() {
  const audioContext = useRef<AudioContext | null>(null);
  const initialized = useRef(false);

  const initializeAudio = () => {
    if (!initialized.current) {
      audioContext.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      initialized.current = true;
    }
  };

  useEffect(() => {
    const handleUserInteraction = () => {
      initializeAudio();
      // Remove listeners after first interaction
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  return { initialized: initialized.current };
}
