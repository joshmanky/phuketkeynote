// Count-up animation hook for metric values using requestAnimationFrame
import { useEffect, useState, useRef } from 'react';

export function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startRef.current) startRef.current = timestamp;
        const elapsed = timestamp - startRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        }
      };
      frameRef.current = requestAnimationFrame(animate);
    }, 800);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameRef.current);
      startRef.current = null;
    };
  }, [target, duration]);

  return value;
}
