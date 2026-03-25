// Custom cursor with glow trail effect for desktop presentation mode
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    document.body.classList.add('custom-cursor');

    const onMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        gsap.to(dotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: 'power2.out',
        });
      }

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);

    const onHoverStart = () => setIsHovering(true);
    const onHoverEnd = () => setIsHovering(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);

    const hoverTargets = document.querySelectorAll('button, a, [role="button"], .glass-card, .aurora-card');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', onHoverStart);
      el.addEventListener('mouseleave', onHoverEnd);
    });

    return () => {
      document.body.classList.remove('custom-cursor');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      hoverTargets.forEach(el => {
        el.removeEventListener('mouseenter', onHoverStart);
        el.removeEventListener('mouseleave', onHoverEnd);
      });
    };
  }, [isVisible]);

  if (isTouchDevice.current) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${isHovering ? 'hovering' : ''}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <div
        ref={glowRef}
        className="cursor-glow"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
}
