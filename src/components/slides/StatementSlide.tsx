// Statement/philosophy slide with GSAP cinematic typography reveals and accent theming
import { useEffect, useRef, useCallback } from 'react';
import { Compass, Sunrise, Shield, Share2, Smartphone } from 'lucide-react';
import gsap from 'gsap';
import type { StatementSlideData } from '../../types';

const ICONS: Record<string, React.ReactNode> = {
  compass: <Compass size={28} />,
  sunrise: <Sunrise size={28} />,
  shield: <Shield size={28} />,
  'share-2': <Share2 size={28} />,
  smartphone: <Smartphone size={28} />,
};

const ACCENT_COLORS: Record<string, { glow: string; icon: string; line: string }> = {
  teal: {
    glow: 'bg-teal-500/10',
    icon: 'text-teal-400 bg-teal-500/15 border-teal-500/25',
    line: 'via-teal-400/60',
  },
  amber: {
    glow: 'bg-amber-500/10',
    icon: 'text-amber-400 bg-amber-500/15 border-amber-500/25',
    line: 'via-amber-400/60',
  },
  red: {
    glow: 'bg-red-500/8',
    icon: 'text-red-400 bg-red-500/15 border-red-500/25',
    line: 'via-red-400/60',
  },
};

interface Props {
  data: StatementSlideData;
}

export function StatementSlide({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const accent = ACCENT_COLORS[data.accent || 'teal'] || ACCENT_COLORS.teal;
  const icon = data.icon ? ICONS[data.icon] : null;

  const animate = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({ delay: 0.15 });
    const iconEl = container.querySelector('[data-el="icon"]');
    const headingChars = container.querySelectorAll('[data-el="heading-word"]');
    const divider = container.querySelector('[data-el="divider"]');
    const paragraphs = container.querySelectorAll('[data-el="paragraph"]');
    const sub = container.querySelector('[data-el="subheading"]');

    if (iconEl) {
      gsap.set(iconEl, { opacity: 0, scale: 0.5, rotate: -15 });
      tl.to(iconEl, { opacity: 1, scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(2)' }, 0.1);
    }

    gsap.set(headingChars, { opacity: 0, y: 50, rotateX: -30 });
    tl.to(headingChars, { opacity: 1, y: 0, rotateX: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, 0.3);

    if (divider) {
      gsap.set(divider, { scaleX: 0, opacity: 0 });
      tl.to(divider, { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }, 0.8);
    }

    gsap.set(paragraphs, { opacity: 0, y: 30, filter: 'blur(4px)' });
    tl.to(paragraphs, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out', stagger: 0.15 }, 1.0);

    if (sub) {
      gsap.set(sub, { opacity: 0, y: 15 });
      tl.to(sub, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');
    }

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    const cleanup = animate();
    return cleanup;
  }, [animate]);

  const headingWords = data.heading.split(' ');

  return (
    <div ref={containerRef} className="slide-base gradient-bg-ocean">
      <div className={`ambient-glow w-[500px] h-[500px] ${accent.glow} top-1/4 left-1/2 -translate-x-1/2`} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-40 h-40 rounded-full bg-white/[0.02] blur-[60px] top-[20%] left-[10%] animate-drift-1" />
        <div className="absolute w-56 h-56 rounded-full bg-white/[0.015] blur-[80px] bottom-[20%] right-[15%] animate-drift-2" />
      </div>

      <div className="relative z-10 text-center px-6 md:px-16 max-w-3xl mx-auto">
        {icon && (
          <div data-el="icon" className="mb-6">
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl border icon-hover ${accent.icon}`}>
              {icon}
            </div>
          </div>
        )}

        <div className="mb-8 overflow-hidden">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            {headingWords.map((word, i) => (
              <span key={i} data-el="heading-word" className="inline-block mr-[0.25em]" style={{ transformOrigin: 'bottom center' }}>
                {word}
              </span>
            ))}
          </h2>
        </div>

        <div data-el="divider" className="mb-8 origin-center">
          <div className={`w-16 h-px bg-gradient-to-r from-transparent ${accent.line} to-transparent mx-auto`} />
        </div>

        <div className="space-y-5">
          {data.body.map((paragraph, i) => (
            <div key={i} data-el="paragraph">
              <p className="text-white/70 text-base md:text-lg lg:text-xl leading-relaxed font-light">
                {paragraph}
              </p>
            </div>
          ))}
        </div>

        {data.subheading && (
          <div data-el="subheading" className="mt-10">
            <p className="text-white/40 text-sm font-medium tracking-wide uppercase">
              {data.subheading}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
