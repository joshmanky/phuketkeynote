// Info card slide with GSAP staggered card reveals and icon animations
import { useEffect, useRef, useCallback } from 'react';
import { Car, Bike, AlertTriangle, Shirt, Sun, Video, Camera, Heart } from 'lucide-react';
import gsap from 'gsap';
import type { InfoCardSlideData } from '../../types';

const ICON_MAP: Record<string, React.ReactNode> = {
  car: <Car size={24} />,
  bike: <Bike size={24} />,
  'alert-triangle': <AlertTriangle size={24} />,
  shirt: <Shirt size={24} />,
  sun: <Sun size={24} />,
  video: <Video size={24} />,
  camera: <Camera size={24} />,
  heart: <Heart size={24} />,
};

const ACCENT_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  teal: { bg: 'bg-teal-500/15', border: 'border-teal-500/25', text: 'text-teal-400' },
  amber: { bg: 'bg-amber-500/15', border: 'border-amber-500/25', text: 'text-amber-400' },
  red: { bg: 'bg-red-500/15', border: 'border-red-500/25', text: 'text-red-400' },
};

interface Props {
  data: InfoCardSlideData;
}

export function InfoCardSlide({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({ delay: 0.15 });
    const header = container.querySelector('[data-el="header"]');
    const cards = container.querySelectorAll('[data-el="card"]');

    gsap.set(header, { opacity: 0, y: 30 });
    gsap.set(cards, { opacity: 0, y: 40, scale: 0.95 });

    tl.to(header, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.1);
    tl.to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.12 }, 0.4);

    cards.forEach((card, i) => {
      const icon = card.querySelector('[data-el="card-icon"]');
      if (icon) {
        gsap.set(icon, { scale: 0, rotate: -20 });
        tl.to(icon, { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(3)' }, 0.5 + i * 0.12);
      }
    });

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    const cleanup = animate();
    return cleanup;
  }, [animate]);

  return (
    <div ref={containerRef} className="slide-base gradient-bg-ocean">
      <div className="ambient-glow w-[500px] h-[500px] bg-teal-500/8 top-1/3 left-1/2 -translate-x-1/2" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-48 h-48 rounded-full bg-white/[0.02] blur-[60px] top-[15%] right-[10%] animate-drift-1" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-16 max-w-3xl mx-auto">
        <div data-el="header" className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-3">
            {data.heading}
          </h2>
          {data.subheading && (
            <p className="text-white/40 text-sm md:text-base">{data.subheading}</p>
          )}
        </div>

        <div className="space-y-4">
          {data.items.map((item, i) => {
            const accent = ACCENT_STYLES[item.accent || 'teal'] || ACCENT_STYLES.teal;
            const icon = ICON_MAP[item.icon];

            return (
              <div key={i} data-el="card" className="transition-transform duration-300 hover:scale-[1.02]">
                <div className="aurora-card rounded-2xl p-5 md:p-6 flex items-start gap-4">
                  <div data-el="card-icon" className={`w-12 h-12 rounded-xl ${accent.bg} border ${accent.border} ${accent.text} flex items-center justify-center shrink-0 icon-hover`}>
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-base md:text-lg mb-1">{item.title}</h3>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
