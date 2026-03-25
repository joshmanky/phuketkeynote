// Closing slide with GSAP cinematic farewell, 3D particles, and shimmer title
import { useEffect, useRef, useCallback } from 'react';
import { Plane, Heart } from 'lucide-react';
import gsap from 'gsap';
import { LazyParticleField as ParticleField } from '../three/LazyParticleField';

interface Props {
  title: string;
  subtitle: string;
}

export function ClosingSlide({ title, subtitle }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({ delay: 0.2 });
    const iconEl = container.querySelector('[data-el="icon"]');
    const titleChars = container.querySelectorAll('[data-el="title-char"]');
    const divider = container.querySelector('[data-el="divider"]');
    const subtitleEl = container.querySelector('[data-el="subtitle"]');
    const badge = container.querySelector('[data-el="badge"]');
    const footer = container.querySelector('[data-el="footer"]');
    const glows = container.querySelectorAll('[data-el="glow"]');

    gsap.set(glows, { opacity: 0, scale: 0.5 });
    tl.to(glows, { opacity: 1, scale: 1, duration: 2, ease: 'power2.out', stagger: 0.2 }, 0);

    if (iconEl) {
      gsap.set(iconEl, { opacity: 0, y: -30, scale: 0.5 });
      tl.to(iconEl, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(2)' }, 0.3);
    }

    gsap.set(titleChars, { opacity: 0, y: 80, rotateX: -60, scale: 0.7 });
    tl.to(titleChars, { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1, ease: 'back.out(1.2)', stagger: 0.04 }, 0.6);

    if (divider) {
      gsap.set(divider, { scaleX: 0, opacity: 0 });
      tl.to(divider, { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }, 1.4);
    }

    if (subtitleEl) {
      gsap.set(subtitleEl, { opacity: 0, y: 20 });
      tl.to(subtitleEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.6);
    }

    if (badge) {
      gsap.set(badge, { opacity: 0, y: 20, scale: 0.9 });
      tl.to(badge, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }, 1.9);
    }

    if (footer) {
      gsap.set(footer, { opacity: 0 });
      tl.to(footer, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 2.2);
    }

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
        <div data-el="glow" className="absolute w-[600px] h-[600px] rounded-full bg-teal-500/[0.08] blur-[120px] top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div data-el="glow" className="absolute w-[400px] h-[400px] rounded-full bg-amber-500/[0.04] blur-[80px] bottom-[10%] left-[10%]" />
        <div data-el="glow" className="absolute w-[300px] h-[300px] rounded-full bg-cyan-500/[0.05] blur-[70px] top-[10%] right-[10%]" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="floating-shape absolute w-3 h-3 border border-teal-400/15 rounded-sm top-[15%] left-[18%] animate-float-geo-1" />
        <div className="floating-shape absolute w-2 h-2 bg-amber-400/10 rounded-full top-[75%] left-[80%] animate-float-geo-2" />
        <div className="floating-shape absolute w-2.5 h-2.5 border border-cyan-400/10 rounded-full top-[40%] left-[90%] animate-float-geo-3" />
      </div>

      <div className="relative z-10 text-center px-6 md:px-16 max-w-3xl mx-auto">
        <div data-el="icon" className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-500/15 border border-teal-500/25 icon-hover">
            <Plane size={28} className="text-teal-400" />
          </div>
        </div>

        <div className="mb-4 overflow-hidden">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black shimmer-text">
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

        <div data-el="divider" className="origin-center">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent mx-auto mb-6" />
        </div>

        <div data-el="subtitle">
          <p className="text-white/50 text-lg md:text-xl font-light">{subtitle}</p>
        </div>

        <div data-el="badge" className="mt-12">
          <div className="inline-flex items-center gap-3 aurora-card px-6 py-3 rounded-full">
            <Heart size={16} className="text-red-400" />
            <span className="text-white/60 text-sm font-medium">
              Platinum Star & Above Leader Trip
            </span>
          </div>
        </div>

        <div data-el="footer" className="mt-6">
          <p className="text-white/20 text-xs tracking-[0.2em] uppercase">
            Phuket, Thailand &middot; 2026
          </p>
        </div>
      </div>
    </div>
  );
}
