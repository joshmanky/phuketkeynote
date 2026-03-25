// Warning slide with GSAP dramatic reveal and pulsing urgency effects
import { useEffect, useRef, useCallback } from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import gsap from 'gsap';

interface Props {
  heading: string;
  body: string[];
}

export function WarningSlide({ heading, body }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({ delay: 0.15 });
    const iconEl = container.querySelector('[data-el="icon"]');
    const headingWords = container.querySelectorAll('[data-el="heading-word"]');
    const divider = container.querySelector('[data-el="divider"]');
    const cards = container.querySelectorAll('[data-el="warning-card"]');
    const badge = container.querySelector('[data-el="badge"]');

    if (iconEl) {
      gsap.set(iconEl, { opacity: 0, scale: 0, rotate: -45 });
      tl.to(iconEl, { opacity: 1, scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(2.5)' }, 0.1);
    }

    gsap.set(headingWords, { opacity: 0, y: 40, rotateX: -20 });
    tl.to(headingWords, { opacity: 1, y: 0, rotateX: 0, duration: 0.6, ease: 'power3.out', stagger: 0.06 }, 0.4);

    if (divider) {
      gsap.set(divider, { scaleX: 0, opacity: 0 });
      tl.to(divider, { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }, 0.8);
    }

    gsap.set(cards, { opacity: 0, x: -30, scale: 0.95 });
    tl.to(cards, { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power3.out', stagger: 0.15 }, 1.0);

    if (badge) {
      gsap.set(badge, { opacity: 0, y: 15 });
      tl.to(badge, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');
    }

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    const cleanup = animate();
    return cleanup;
  }, [animate]);

  const headingWords = heading.split(' ');

  return (
    <div ref={containerRef} className="slide-base gradient-bg-ocean">
      <div className="ambient-glow w-[600px] h-[600px] bg-red-500/8 top-1/3 left-1/2 -translate-x-1/2" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-48 h-48 rounded-full bg-red-500/[0.03] blur-[60px] top-[20%] left-[10%] animate-drift-1" />
        <div className="absolute w-64 h-64 rounded-full bg-red-500/[0.02] blur-[80px] bottom-[15%] right-[10%] animate-drift-2" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-16 max-w-3xl mx-auto text-center">
        <div data-el="icon" className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/15 border border-red-500/30 icon-hover">
            <AlertTriangle size={32} className="text-red-400" />
          </div>
        </div>

        <div className="mb-8 overflow-hidden">
          <h2 className="text-3xl md:text-5xl font-black text-red-400 leading-tight">
            {headingWords.map((word, i) => (
              <span key={i} data-el="heading-word" className="inline-block mr-[0.25em]" style={{ transformOrigin: 'bottom center' }}>
                {word}
              </span>
            ))}
          </h2>
        </div>

        <div data-el="divider" className="mb-10 origin-center">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent mx-auto" />
        </div>

        <div className="space-y-6">
          {body.map((paragraph, i) => (
            <div key={i} data-el="warning-card">
              <div className="aurora-card rounded-2xl p-5 md:p-6 border-red-500/20 bg-red-500/[0.03] text-left">
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-red-400/60 shrink-0 mt-0.5" />
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    {paragraph}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div data-el="badge" className="mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse-live" />
            <span className="text-red-400/80 text-xs font-bold tracking-wide uppercase">Puenktlichkeit ist Pflicht</span>
          </div>
        </div>
      </div>
    </div>
  );
}
