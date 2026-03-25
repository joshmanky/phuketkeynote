// Grand title slide with GSAP cinematic text reveals, 3D particles, and floating elements
import { useEffect, useRef, useCallback } from 'react';
import { MapPin, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { LazyParticleField as ParticleField } from '../three/LazyParticleField';

interface Props {
  title: string;
  subtitle: string;
  location: string;
  dateRange: string;
}

export function TitleSlide({ title, subtitle, location, dateRange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({ delay: 0.2 });

    const badge = container.querySelector('[data-el="badge"]');
    const subtitleEl = container.querySelector('[data-el="subtitle"]');
    const titleChars = container.querySelectorAll('[data-el="title-char"]');
    const divider = container.querySelector('[data-el="divider"]');
    const metaItems = container.querySelectorAll('[data-el="meta"]');
    const bottomBadge = container.querySelector('[data-el="bottom-badge"]');
    const floaters = container.querySelectorAll('[data-el="floater"]');

    gsap.set([badge, subtitleEl, divider, bottomBadge], { opacity: 0, y: 30 });
    gsap.set(titleChars, { opacity: 0, y: 60, rotateX: -45, scale: 0.8 });
    gsap.set(metaItems, { opacity: 0, y: 20 });
    gsap.set(floaters, { opacity: 0, scale: 0 });

    tl.to(floaters, { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out', stagger: 0.15 }, 0);
    tl.to(badge, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.3);
    tl.to(subtitleEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.5);
    tl.to(titleChars, { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.8, ease: 'back.out(1.5)', stagger: 0.035 }, 0.6);
    tl.to(divider, { opacity: 1, y: 0, scaleX: 1, duration: 0.6, ease: 'power3.out' }, 1.2);
    tl.to(metaItems, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1 }, 1.4);
    tl.to(bottomBadge, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.7);

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    const cleanup = animate();
    return cleanup;
  }, [animate]);

  const titleWords = title.split(' ');

  return (
    <div ref={containerRef} className="slide-base gradient-bg-ocean">
      <ParticleField />

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <div data-el="floater" className="absolute w-64 h-64 rounded-full bg-teal-500/[0.07] blur-[80px] top-[10%] left-[15%] animate-drift-1" />
        <div data-el="floater" className="absolute w-80 h-80 rounded-full bg-cyan-500/[0.05] blur-[100px] bottom-[15%] right-[10%] animate-drift-2" />
        <div data-el="floater" className="absolute w-48 h-48 rounded-full bg-amber-500/[0.04] blur-[60px] top-[60%] left-[60%] animate-drift-3" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <div data-el="floater" className="floating-shape absolute w-3 h-3 border border-teal-400/20 rounded-sm top-[18%] left-[22%] animate-float-geo-1" />
        <div data-el="floater" className="floating-shape absolute w-2 h-2 bg-cyan-400/15 rounded-full top-[72%] left-[78%] animate-float-geo-2" />
        <div data-el="floater" className="floating-shape absolute w-4 h-1 bg-teal-400/10 rounded-full top-[35%] left-[85%] animate-float-geo-3" />
        <div data-el="floater" className="floating-shape absolute w-2.5 h-2.5 border border-amber-400/15 rounded-full top-[82%] left-[12%] animate-float-geo-1" />
        <div data-el="floater" className="floating-shape absolute w-1.5 h-1.5 bg-white/10 rounded-full top-[28%] left-[65%] animate-float-geo-2" />
      </div>

      <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl mx-auto">
        <div data-el="badge" className="mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card-strong gradient-border">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-glow-pulse" />
            <span className="text-white/50 text-xs font-medium tracking-[0.25em]">INCENTIVE PRESENTATION</span>
          </div>
        </div>

        <div data-el="subtitle" className="mb-4 md:mb-6">
          <p className="text-teal-400/80 text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
            {subtitle}
          </p>
        </div>

        <div className="mb-6 md:mb-8 overflow-hidden">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] shimmer-text">
            {titleWords.map((word, wi) => (
              <span key={wi} className="inline-block mr-[0.25em]">
                {word.split('').map((char, ci) => (
                  <span
                    key={`${wi}-${ci}`}
                    data-el="title-char"
                    className="inline-block"
                    style={{ transformOrigin: 'bottom center' }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>
        </div>

        <div data-el="divider" className="transform origin-center" style={{ transform: 'scaleX(0)' }}>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent mx-auto mb-6 md:mb-8" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
          <div data-el="meta" className="flex items-center gap-2 text-white/60">
            <MapPin size={16} className="text-teal-400" />
            <span className="text-sm md:text-base font-medium">{location}</span>
          </div>
          <div data-el="meta" className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
          <div data-el="meta" className="flex items-center gap-2 text-white/60">
            <Calendar size={16} className="text-teal-400" />
            <span className="text-sm md:text-base font-medium">{dateRange}</span>
          </div>
        </div>

        <div data-el="bottom-badge" className="mt-12 md:mt-16">
          <div className="inline-flex items-center gap-3 glass-card px-6 py-3 rounded-full border-teal-500/10">
            <span className="text-white/30 text-xs font-medium tracking-wide">
              Phuket, Thailand &middot; 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
