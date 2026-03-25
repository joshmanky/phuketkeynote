// Timezone comparison slide with GSAP animated clock counters and card reveals
import { useEffect, useRef, useCallback } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

interface Props {
  phuketTime: string;
  germanyTime: string;
  keyPoints: string[];
  subtitle?: string;
}

export function TimeZoneSlide({ phuketTime, germanyTime, keyPoints, subtitle }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({ delay: 0.15 });
    const header = container.querySelector('[data-el="header"]');
    const clockCards = container.querySelectorAll('[data-el="clock-card"]');
    const arrow = container.querySelector('[data-el="arrow"]');
    const points = container.querySelectorAll('[data-el="point"]');

    gsap.set(header, { opacity: 0, y: 30 });
    gsap.set(clockCards, { opacity: 0, y: 50, scale: 0.85, rotateY: 15 });
    gsap.set(arrow, { opacity: 0, scale: 0 });
    gsap.set(points, { opacity: 0, x: -30 });

    tl.to(header, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.1);
    tl.to(clockCards[0], { opacity: 1, y: 0, scale: 1, rotateY: 0, duration: 0.8, ease: 'power3.out' }, 0.4);
    tl.to(arrow, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, 0.7);
    tl.to(clockCards[1], { opacity: 1, y: 0, scale: 1, rotateY: 0, duration: 0.8, ease: 'power3.out' }, 0.6);

    const phuketTimeEl = container.querySelector('[data-el="phuket-time"]');
    const germanyTimeEl = container.querySelector('[data-el="germany-time"]');
    if (phuketTimeEl) {
      const target = parseInt(phuketTime);
      const obj = { val: 0 };
      tl.to(obj, {
        val: target, duration: 1.2, ease: 'power2.out',
        onUpdate: () => { phuketTimeEl.textContent = Math.round(obj.val).toString().padStart(2, '0') + ':00'; },
      }, 0.5);
    }
    if (germanyTimeEl) {
      const target = parseInt(germanyTime);
      const obj = { val: 0 };
      tl.to(obj, {
        val: target, duration: 1.2, ease: 'power2.out',
        onUpdate: () => { germanyTimeEl.textContent = Math.round(obj.val).toString().padStart(2, '0') + ':00'; },
      }, 0.5);
    }

    tl.to(points, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1 }, 1.3);

    return () => { tl.kill(); };
  }, [phuketTime, germanyTime]);

  useEffect(() => {
    const cleanup = animate();
    return cleanup;
  }, [animate]);

  return (
    <div ref={containerRef} className="slide-base gradient-bg-ocean">
      <div className="ambient-glow w-[500px] h-[500px] bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2" />
      <div className="ambient-glow w-[400px] h-[400px] bg-amber-500/6 bottom-10 right-10" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-40 h-40 rounded-full bg-cyan-500/[0.03] blur-[60px] top-[15%] left-[20%] animate-drift-1" />
        <div className="absolute w-56 h-56 rounded-full bg-amber-500/[0.02] blur-[70px] bottom-[20%] right-[20%] animate-drift-2" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-16 max-w-4xl mx-auto">
        <div data-el="header" className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/25 text-cyan-400 mb-4 icon-hover">
            <Clock size={24} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white">
            Die Zeitverschiebung als Waffe
          </h2>
          {subtitle && (
            <p className="text-white/50 text-sm md:text-base mt-3 max-w-xl mx-auto leading-relaxed">{subtitle}</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-10 md:mb-14">
          <div data-el="clock-card" className="aurora-card glass-card-strong rounded-2xl p-6 md:p-8 text-center min-w-[180px]">
            <p className="text-amber-400/80 text-xs font-bold tracking-[0.2em] uppercase mb-2">Phuket</p>
            <p data-el="phuket-time" className="text-4xl md:text-6xl font-black text-white tabular-nums">00:00</p>
            <p className="text-white/30 text-sm mt-2">Ortszeit</p>
          </div>

          <div data-el="arrow" className="flex items-center gap-2 text-white/20">
            <div className="w-8 h-px bg-white/20 hidden md:block" />
            <ArrowRight size={20} className="rotate-90 md:rotate-0" />
            <div className="w-8 h-px bg-white/20 hidden md:block" />
          </div>

          <div data-el="clock-card" className="aurora-card glass-card-strong rounded-2xl p-6 md:p-8 text-center min-w-[180px]">
            <p className="text-teal-400/80 text-xs font-bold tracking-[0.2em] uppercase mb-2">Deutschland</p>
            <p data-el="germany-time" className="text-4xl md:text-6xl font-black text-white tabular-nums">00:00</p>
            <p className="text-white/30 text-sm mt-2">MEZ</p>
          </div>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          {keyPoints.map((point, i) => (
            <div key={i} data-el="point">
              <div className="flex items-start gap-3 glass-card rounded-xl px-4 py-3">
                <div className="w-6 h-6 rounded-lg bg-teal-500/15 border border-teal-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-teal-400 text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">{point}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
