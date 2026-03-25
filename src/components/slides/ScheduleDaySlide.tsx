// Schedule day slide - Template E: timeline layout with connecting line
import { motion } from 'framer-motion';
import { MapPin, Users, Star } from 'lucide-react';
import { staggerContainer, fadeUp } from '../../lib/animations';
import type { TripDayData, ScheduleEvent } from '../../types';

interface Props {
  day: TripDayData;
  dayIndex: number;
  totalDays: number;
}

export function ScheduleDaySlide({ day, dayIndex, totalDays }: Props) {
  const isFreeDay = day.events.some(e => e.type === 'free_day');

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center overflow-y-auto" style={{ background: '#080d18', willChange: 'transform, opacity' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/[0.05] blur-[100px] -top-20 right-0" />
      </div>

      <motion.div
        className="relative z-10 w-full px-6 md:px-12 py-8 md:py-12 max-w-3xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8 md:mb-10">
          <div className="w-16 h-16 md:w-18 md:h-18 rounded-2xl bg-gradient-to-br from-cyan-500/15 to-teal-500/15 border border-cyan-500/15 flex flex-col items-center justify-center shrink-0">
            <span className="text-white font-black text-2xl md:text-3xl leading-none">{day.dayNumber}</span>
            <span className="text-cyan-400/70 text-[10px] font-bold">{day.month}</span>
          </div>
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-white">{day.dayOfWeekFull}</h2>
            <p className="text-white/25 text-xs md:text-sm mt-0.5">
              Tag {dayIndex + 1} von {totalDays}
            </p>
          </div>
        </motion.div>

        {isFreeDay ? (
          <FreeDayContent event={day.events[0]} />
        ) : (
          <TimelineEvents events={day.events} />
        )}
      </motion.div>
    </div>
  );
}

function FreeDayContent({ event }: { event: ScheduleEvent }) {
  return (
    <motion.div variants={fadeUp} className="text-center py-12 md:py-20">
      <div className="text-6xl md:text-7xl mb-6">{'\u{1F3DD}\uFE0F'}</div>
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{event.name}</h3>
      <p className="text-white/35 text-sm md:text-base max-w-md mx-auto">{event.description}</p>
    </motion.div>
  );
}

function TimelineEvents({ events }: { events: ScheduleEvent[] }) {
  return (
    <div className="relative">
      <div className="absolute left-[68px] md:left-[76px] top-2 bottom-2 w-px bg-white/[0.06]" />
      <div className="space-y-1">
        {events.map((event, i) => (
          <TimelineItem key={i} event={event} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ event }: { event: ScheduleEvent }) {
  const isPickup = event.type === 'pickup';
  const isActivity = event.type === 'activity';

  return (
    <motion.div variants={fadeUp} className="relative flex gap-4 md:gap-5">
      <div className="w-14 md:w-16 shrink-0 text-right pt-3">
        {event.startTime && (
          <span className={`text-xs md:text-sm font-bold ${isPickup ? 'text-red-400' : 'text-teal-400/70'}`}>
            {event.startTime}
          </span>
        )}
      </div>

      <div className="relative z-10 pt-3.5 shrink-0">
        <div className={`w-2.5 h-2.5 rounded-full ${
          isPickup ? 'bg-red-400 ring-[3px] ring-red-400/20' : 'bg-white/20'
        }`} />
      </div>

      <div className={`flex-1 pb-5 border-b border-white/[0.04] ${isPickup ? 'bg-red-500/[0.03] -mx-3 px-3 rounded-lg border-red-500/10' : ''}`}>
        {isPickup && (
          <div className="pt-2 mb-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-500/15 border border-red-500/20 text-red-400 text-[9px] font-bold uppercase tracking-wider">
              Abholzeit
            </span>
          </div>
        )}
        <div className={isPickup ? '' : 'pt-2'}>
          <h4 className="text-white font-bold text-sm md:text-base leading-snug mb-1">{event.name}</h4>
          {event.description && (
            <p className="text-white/35 text-xs md:text-sm leading-relaxed mb-2">{event.description}</p>
          )}
          <div className="flex flex-wrap items-center gap-2">
            {event.location && (
              <span className="text-white/20 text-[10px] md:text-xs flex items-center gap-1">
                <MapPin size={9} />
                {event.location}
              </span>
            )}
            {event.endTime && (
              <span className="text-white/20 text-[10px] md:text-xs">
                bis {event.endTime} Uhr
              </span>
            )}
            {event.guideIncluded && (
              <span className="text-teal-400/50 text-[10px] bg-teal-500/8 rounded px-1.5 py-0.5 flex items-center gap-1">
                <Users size={8} />
                Guide inkl.
              </span>
            )}
          </div>
          {isActivity && event.benefits && event.benefits.length > 0 && (
            <div className="mt-2.5 pt-2.5 border-t border-white/[0.04] space-y-1">
              {event.benefits.map((b, bi) => (
                <div key={bi} className="flex items-start gap-1.5">
                  <Star size={9} className="text-amber-400/40 shrink-0 mt-0.5" />
                  <span className="text-white/30 text-[10px] md:text-xs leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
