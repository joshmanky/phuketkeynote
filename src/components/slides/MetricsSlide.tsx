// Metrics slide with GSAP animated counters, progress bars, and key stats display
import { useEffect, useRef, useCallback } from 'react';
import { Ticket, Target, Trophy, TrendingUp } from 'lucide-react';
import gsap from 'gsap';

const ICON_MAP: Record<string, React.ReactNode> = {
  ticket: <Ticket size={22} />,
  target: <Target size={22} />,
  trophy: <Trophy size={22} />,
  'trending-up': <TrendingUp size={22} />,
};

export interface MetricItem {
  icon: string;
  label: string;
  value: string;
  subtitle?: string;
  accent?: string;
  highlight?: boolean;
}

export interface MetricsSlideData {
  heading: string;
  subheading?: string;
  metrics: MetricItem[];
  body?: string[];
}

interface Props {
  data: MetricsSlideData;
}

const ACCENT_MAP: Record<string, { bg: string; border: string; text: string; bar: string }> = {
  teal: { bg: 'bg-teal-500/15', border: 'border-teal-500/25', text: 'text-teal-400', bar: 'bg-teal-500' },
  amber: { bg: 'bg-amber-500/15', border: 'border-amber-500/25', text: 'text-amber-400', bar: 'bg-amber-500' },
  green: { bg: 'bg-emerald-500/15', border: 'border-emerald-500/25', text: 'text-emerald-400', bar: 'bg-emerald-500' },
  red: { bg: 'bg-red-500/15', border: 'border-red-500/25', text: 'text-red-400', bar: 'bg-red-500' },
};

export function MetricsSlide({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({ delay: 0.15 });
    const header = container.querySelector('[data-el="header"]');
    const cards = container.querySelectorAll('[data-el="metric-card"]');
    const bodyEls = container.querySelectorAll('[data-el="body-text"]');

    gsap.set(header, { opacity: 0, y: 30 });
    gsap.set(cards, { opacity: 0, y: 40, scale: 0.92 });
    gsap.set(bodyEls, { opacity: 0, y: 20 });

    tl.to(header, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.1);
    tl.to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.1 }, 0.4);

    cards.forEach((card, i) => {
      const valueEl = card.querySelector('[data-el="metric-value"]');
      if (valueEl) {
        gsap.set(valueEl, { opacity: 0, scale: 0.6 });
        tl.to(valueEl, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2.5)' }, 0.6 + i * 0.1);
      }
      const bar = card.querySelector('[data-el="progress-bar"]');
      if (bar) {
        gsap.set(bar, { scaleX: 0, transformOrigin: 'left' });
        tl.to(bar, { scaleX: 1, duration: 0.8, ease: 'power3.out' }, 0.8 + i * 0.1);
      }
    });

    tl.to(bodyEls, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1 }, '-=0.3');

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
        <div className="absolute w-56 h-56 rounded-full bg-white/[0.015] blur-[80px] bottom-[20%] left-[10%] animate-drift-2" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-16 max-w-3xl mx-auto">
        <div data-el="header" className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-3">
            {data.heading}
          </h2>
          {data.subheading && (
            <p className="text-white/40 text-sm md:text-base">{data.subheading}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8">
          {data.metrics.map((metric, i) => {
            const accent = ACCENT_MAP[metric.accent || 'teal'] || ACCENT_MAP.teal;
            const icon = ICON_MAP[metric.icon];

            return (
              <div
                key={i}
                data-el="metric-card"
                className={`aurora-card rounded-2xl p-4 md:p-5 ${metric.highlight ? 'col-span-2' : ''}`}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-9 h-9 rounded-xl ${accent.bg} border ${accent.border} ${accent.text} flex items-center justify-center shrink-0`}>
                    {icon}
                  </div>
                  <span className="text-white/50 text-xs md:text-sm font-medium uppercase tracking-wide">
                    {metric.label}
                  </span>
                </div>
                <div data-el="metric-value" className="mb-1">
                  <span className={`text-2xl md:text-3xl font-black ${accent.text}`}>
                    {metric.value}
                  </span>
                </div>
                {metric.subtitle && (
                  <p className="text-white/40 text-xs md:text-sm">{metric.subtitle}</p>
                )}
              </div>
            );
          })}
        </div>

        {data.body && data.body.length > 0 && (
          <div className="space-y-3">
            {data.body.map((text, i) => (
              <p key={i} data-el="body-text" className="text-white/50 text-sm md:text-base leading-relaxed text-center">
                {text}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
