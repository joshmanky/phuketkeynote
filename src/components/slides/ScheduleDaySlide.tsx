// Schedule day slide with GSAP staggered event card reveals
import { useEffect, useRef, useCallback } from 'react';
import { MapPin, Clock, Star, Users } from 'lucide-react';
import gsap from 'gsap';
import type { TripDayData, ScheduleEvent } from '../../types';

const EVENT_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  checkin: { bg: 'bg-green-500/10', border: 'border-green-500/25', text: 'text-green-400' },
  checkout: { bg: 'bg-rose-500/10', border: 'border-rose-500/25', text: 'text-rose-400' },
  pickup: { bg: 'bg-red-500/15', border: 'border-red-500/40', text: 'text-red-400' },
  dinner: { bg: 'bg-amber-500/10', border: 'border-amber-500/25', text: 'text-amber-400' },
  activity: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/25', text: 'text-cyan-400' },
  free_day: { bg: 'bg-teal-500/10', border: 'border-teal-500/25', text: 'text-teal-400' },
  mastermind: { bg: 'bg-orange-500/10', border: 'border-orange-500/25', text: 'text-orange-400' },
  opening: { bg: 'bg-sky-500/10', border: 'border-sky-500/25', text: 'text-sky-400' },
  hint: { bg: 'bg-slate-500/10', border: 'border-slate-500/25', text: 'text-slate-400' },
};

const EVENT_EMOJI: Record<string, string> = {
  checkin: '\u{1F6EC}',
  checkout: '\u{1F6EB}',
  pickup: '\u{1F690}',
  dinner: '\u{1F37D}\uFE0F',
  activity: '\u26A1',
  free_day: '\u{1F3DD}\uFE0F',
  mastermind: '\u{1F9E0}',
  opening: '\u{1F3AF}',
  hint: '\u{1F6F5}',
};

interface Props {
  day: TripDayData;
  dayIndex: number;
  totalDays: number;
}

export function ScheduleDaySlide({ day, dayIndex, totalDays }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isFreeDay = day.events.some(e => e.type === 'free_day');

  const animate = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({ delay: 0.15 });
    const header = container.querySelector('[data-el="header"]');
    const dayBadge = container.querySelector('[data-el="day-badge"]');
    const cards = container.querySelectorAll('[data-el="event-card"]');
    const freeContent = container.querySelector('[data-el="free-content"]');

    if (dayBadge) {
      gsap.set(dayBadge, { opacity: 0, scale: 0.7, rotate: -10 });
      tl.to(dayBadge, { opacity: 1, scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(2)' }, 0.1);
    }

    if (header) {
      gsap.set(header, { opacity: 0, x: -30 });
      tl.to(header, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, 0.3);
    }

    if (freeContent) {
      gsap.set(freeContent, { opacity: 0, scale: 0.9 });
      tl.to(freeContent, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, 0.5);
    }

    gsap.set(cards, { opacity: 0, y: 30, scale: 0.96 });
    tl.to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1 }, 0.5);

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    const cleanup = animate();
    return cleanup;
  }, [animate]);

  return (
    <div ref={containerRef} className="slide-base gradient-bg-ocean overflow-y-auto">
      <div className="ambient-glow w-[400px] h-[400px] bg-cyan-500/8 -top-20 right-0" />

      <div className="relative z-10 w-full px-4 md:px-12 py-8 md:py-12 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6 md:mb-10">
          <div data-el="day-badge" className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/20 flex flex-col items-center justify-center shrink-0">
            <span className="text-white font-black text-2xl md:text-3xl leading-none">{day.dayNumber}</span>
            <span className="text-cyan-400 text-xs font-semibold">{day.month}</span>
          </div>
          <div data-el="header">
            <h2 className="text-2xl md:text-4xl font-black text-white">{day.dayOfWeekFull}</h2>
            <p className="text-white/30 text-xs md:text-sm mt-1">
              Tag {dayIndex + 1} von {totalDays} &middot; {day.date}
            </p>
          </div>
        </div>

        {isFreeDay ? (
          <FreeDayContent event={day.events[0]} />
        ) : (
          <div className="space-y-3">
            {day.events.map((event, i) => (
              <div key={i} data-el="event-card">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FreeDayContent({ event }: { event: ScheduleEvent }) {
  return (
    <div data-el="free-content" className="text-center py-8 md:py-16">
      <div className="text-6xl md:text-8xl mb-6">{'\u{1F3DD}\uFE0F'}</div>
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{event.name}</h3>
      <p className="text-white/40 text-sm md:text-base max-w-md mx-auto">{event.description}</p>
    </div>
  );
}

function EventCard({ event }: { event: ScheduleEvent }) {
  const style = EVENT_STYLES[event.type] || EVENT_STYLES.activity;
  const emoji = EVENT_EMOJI[event.type] || '\u{1F4C5}';
  const isPickup = event.type === 'pickup';

  return (
    <div className={`rounded-xl border ${style.border} ${style.bg} overflow-hidden ${isPickup ? 'ring-1 ring-red-500/20' : ''}`}>
      {isPickup && (
        <div className="flex items-center gap-2 px-4 py-1.5 bg-red-500/20 border-b border-red-500/30">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse-live" />
          <span className="text-red-400 text-xs font-bold tracking-wide uppercase">Abholzeit</span>
          <span className="text-red-300/60 text-xs">&ndash; Puenktlichkeit erforderlich!</span>
        </div>
      )}

      <div className="p-4 flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl ${style.bg} border ${style.border} flex items-center justify-center text-lg shrink-0`}>
          {emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            {event.startTime && (
              <span className={`text-xs font-bold ${style.text}`}>
                <Clock size={10} className="inline mr-1" />
                {event.endTime
                  ? `${event.startTime} – ${event.endTime} Uhr`
                  : `ab ${event.startTime} Uhr`
                }
              </span>
            )}
            {event.category && (
              <span className="text-xs text-white/30 bg-white/5 rounded-full px-2 py-0.5">
                {event.category}
              </span>
            )}
            {event.guideIncluded && (
              <span className="text-xs text-teal-400/70 bg-teal-500/10 rounded-full px-2 py-0.5 border border-teal-500/15">
                <Users size={10} className="inline mr-1" />
                Guide inkl.
              </span>
            )}
          </div>

          <h4 className="text-white font-bold text-sm md:text-base leading-tight mb-1">
            {event.name}
          </h4>

          {event.description && (
            <p className="text-white/40 text-xs md:text-sm leading-relaxed mb-2">{event.description}</p>
          )}

          {event.location && (
            <p className="text-white/30 text-xs flex items-center gap-1">
              <MapPin size={10} />
              {event.location}
            </p>
          )}

          {event.benefits && event.benefits.length > 0 && (
            <div className="mt-3 pt-3 border-t border-white/5 space-y-1.5">
              {event.benefits.map((b, bi) => (
                <div key={bi} className="flex items-start gap-2">
                  <Star size={10} className="text-amber-400/60 shrink-0 mt-0.5" />
                  <span className="text-white/40 text-xs leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
