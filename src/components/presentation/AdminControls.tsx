// Presenter controls with slide navigation, live toggle, and overview modal
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Radio, Circle, Users, Grid3x3 as Grid3X3, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePresentation } from '../../context/PresentationContext';
import { SLIDES } from '../../data/slides';

export function AdminControls() {
  const { currentSlide, totalSlides, isLive, guestCount, nextSlide, prevSlide, goToSlide, toggleLive } = usePresentation();
  const [showOverview, setShowOverview] = useState(false);

  return (
    <>
      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/[0.08] shadow-2xl">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => setShowOverview(true)}
            className="min-w-[80px] text-center px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors"
          >
            <span className="text-white font-bold text-sm tabular-nums">{currentSlide + 1}</span>
            <span className="text-white/30 text-sm"> / {totalSlides}</span>
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>

          <div className="w-px h-7 bg-white/10 mx-1" />

          <button
            onClick={toggleLive}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              isLive
                ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                : 'bg-teal-500/15 text-teal-400 border border-teal-500/25 hover:bg-teal-500/25'
            }`}
          >
            {isLive ? <Radio size={12} className="animate-pulse-live" /> : <Circle size={12} />}
            {isLive ? 'LIVE' : 'Go Live'}
          </button>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5">
            <Users size={12} className="text-teal-400" />
            <span className="text-white font-bold text-xs tabular-nums">{guestCount}</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showOverview && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-xl flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Grid3X3 size={16} className="text-teal-400" />
                <span className="text-white font-semibold text-sm">Slide-Uebersicht</span>
              </div>
              <button
                onClick={() => setShowOverview(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {SLIDES.map((slide, i) => (
                  <motion.button
                    key={slide.id}
                    onClick={() => { goToSlide(i); setShowOverview(false); }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className={`aspect-video rounded-xl border p-3 text-left transition-all hover:scale-[1.03] ${
                      i === currentSlide
                        ? 'border-teal-400/60 bg-teal-500/10'
                        : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15'
                    }`}
                  >
                    <span className={`text-[10px] font-bold ${i === currentSlide ? 'text-teal-400' : 'text-white/30'}`}>
                      {i + 1}
                    </span>
                    <p className="text-white/50 text-[10px] mt-1 line-clamp-2 leading-tight">
                      {getSlideLabel(slide.type, slide.data)}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
