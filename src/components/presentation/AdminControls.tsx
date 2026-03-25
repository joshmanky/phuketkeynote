// Presenter controls: slide navigation, live toggle, guest management - mobile-optimized
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Radio, Circle, Users, Grid3x3 as Grid3X3, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePresentation } from '../../context/PresentationContext';
import { GuestPanel } from './GuestPanel';
import { SLIDES } from '../../data/slides';

interface Props {
  displayMode: boolean;
}

export function AdminControls({ displayMode }: Props) {
  const { currentSlide, totalSlides, isLive, guestCount, nextSlide, prevSlide, goToSlide, toggleLive } = usePresentation();
  const [showOverview, setShowOverview] = useState(false);
  const [showGuests, setShowGuests] = useState(false);

  return (
    <>
      <motion.div
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[calc(100%-2rem)]"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="rounded-2xl bg-black/75 backdrop-blur-2xl border border-white/[0.08] shadow-2xl overflow-hidden">
          <div className="flex items-center justify-center gap-1 px-2 pt-2.5 pb-2">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 active:bg-white/15 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => setShowOverview(true)}
              className="min-w-[80px] sm:min-w-[88px] text-center px-3 py-2 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors"
            >
              <span className="text-white font-bold text-base sm:text-sm tabular-nums">{currentSlide + 1}</span>
              <span className="text-white/30 text-base sm:text-sm"> / {totalSlides}</span>
            </button>

            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 active:bg-white/15 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {!displayMode && (
            <div className="flex items-center justify-center gap-2 px-3 pb-2.5 border-t border-white/[0.06] pt-2">
              <button
                onClick={toggleLive}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 sm:py-2 rounded-xl text-xs font-bold transition-all ${
                  isLive
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 active:bg-red-500/40'
                    : 'bg-teal-500/15 text-teal-400 border border-teal-500/25 hover:bg-teal-500/25 active:bg-teal-500/35'
                }`}
              >
                {isLive ? <Radio size={13} className="animate-pulse-live" /> : <Circle size={13} />}
                {isLive ? 'LIVE' : 'Go Live'}
              </button>

              <button
                onClick={() => setShowGuests(true)}
                className="flex items-center gap-1.5 px-3 py-2.5 sm:py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 active:bg-white/15 transition-colors border border-white/[0.06]"
              >
                <Users size={14} className="text-teal-400" />
                <span className="text-white font-bold text-xs tabular-nums">{guestCount}</span>
              </button>

              <button
                onClick={() => setShowOverview(true)}
                className="w-11 h-[38px] sm:w-10 sm:h-9 rounded-xl flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors border border-white/[0.06]"
              >
                <Grid3X3 size={15} />
              </button>
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showOverview && (
          <SlideOverview
            currentSlide={currentSlide}
            onSelect={(i) => { goToSlide(i); setShowOverview(false); }}
            onClose={() => setShowOverview(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGuests && (
          <GuestPanel
            onClose={() => setShowGuests(false)}
            onSessionEnded={() => setShowGuests(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function SlideOverview({ currentSlide, onSelect, onClose }: {
  currentSlide: number;
  onSelect: (i: number) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-xl flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Grid3X3 size={16} className="text-teal-400" />
          <span className="text-white font-semibold text-sm">Slide-Uebersicht</span>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
          {SLIDES.map((slide, i) => (
            <motion.button
              key={slide.id}
              onClick={() => onSelect(i)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className={`aspect-video rounded-xl border p-2.5 sm:p-3 text-left transition-all active:scale-95 hover:scale-[1.03] ${
                i === currentSlide
                  ? 'border-teal-400/60 bg-teal-500/10'
                  : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15'
              }`}
            >
              <span className={`text-[11px] font-bold ${i === currentSlide ? 'text-teal-400' : 'text-white/30'}`}>
                {i + 1}
              </span>
              <p className="text-white/50 text-[10px] mt-0.5 sm:mt-1 line-clamp-2 leading-tight">
                {getSlideLabel(slide.type, slide.data)}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function getSlideLabel(type: string, data: Record<string, unknown>): string {
  switch (type) {
    case 'title': return data.title as string || 'Title';
    case 'statement': return (data as { heading?: string }).heading || 'Statement';
    case 'timezone': return 'Zeitverschiebung';
    case 'infocard': return (data as { heading?: string }).heading || 'Info';
    case 'warning': return 'Abholzeiten';
    case 'schedule': return `Tag ${(data.dayIndex as number) + 1}`;
    case 'metrics': return (data as { heading?: string }).heading || 'Metrics';
    case 'closing': return 'Abschluss';
    default: return type;
  }
}
