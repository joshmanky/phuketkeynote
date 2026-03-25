// Keyboard and touch navigation for presentation admin
import { useEffect, useRef } from 'react';

interface UseKeyboardNavOptions {
  onNext: () => void;
  onPrev: () => void;
  onToggleLive: () => void;
  enabled: boolean;
}

export function useKeyboardNav({ onNext, onPrev, onToggleLive, enabled }: UseKeyboardNavOptions) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          onNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onPrev();
          break;
        case 'Escape':
          e.preventDefault();
          onToggleLive();
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, onNext, onPrev, onToggleLive]);

  useEffect(() => {
    if (!enabled) return;

    function handleTouchStart(e: TouchEvent) {
      const touch = e.touches[0];
      touchStart.current = { x: touch.clientX, y: touch.clientY };
    }

    function handleTouchEnd(e: TouchEvent) {
      if (!touchStart.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;
      touchStart.current = null;

      if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;

      if (dx < 0) onNext();
      else onPrev();
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled, onNext, onPrev]);
}
