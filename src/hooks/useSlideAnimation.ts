// GSAP-powered slide animation hook for cinematic element reveals
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimationOptions {
  staggerDelay?: number;
  duration?: number;
  ease?: string;
}

export function useSlideAnimation(options: AnimationOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const {
    staggerDelay = 0.12,
    duration = 0.9,
    ease = 'power3.out',
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('[data-animate]');
    if (elements.length === 0) return;

    gsap.set(elements, { opacity: 0, y: 40, scale: 0.97 });

    const tl = gsap.timeline({ delay: 0.15 });
    timelineRef.current = tl;

    tl.to(elements, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      ease,
      stagger: staggerDelay,
    });

    return () => {
      tl.kill();
    };
  }, [staggerDelay, duration, ease]);

  return containerRef;
}

export function useCharReveal() {
  const ref = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent || '';
    el.innerHTML = '';

    const chars = text.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      el.appendChild(span);
      return span;
    });

    const tl = gsap.timeline({ delay: 0.3 });
    timelineRef.current = tl;

    tl.to(chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.025,
    });

    gsap.set(chars, { y: 30, rotateX: -40, opacity: 0 });
    tl.restart();

    return () => {
      tl.kill();
    };
  }, []);

  return ref;
}

export function useCountUp(target: number, duration: number = 2) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { value: 0 };
    const tween = gsap.to(obj, {
      value: target,
      duration,
      delay: 0.5,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = Math.round(obj.value).toString().padStart(2, '0') + ':00';
      },
    });

    return () => {
      tween.kill();
    };
  }, [target, duration]);

  return ref;
}

export function useGsapTimeline(builder: (tl: gsap.core.Timeline, container: HTMLDivElement) => void) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({ delay: 0.1 });
    timelineRef.current = tl;
    builder(tl, container);

    return () => {
      tl.kill();
    };
  }, [builder]);

  return containerRef;
}
