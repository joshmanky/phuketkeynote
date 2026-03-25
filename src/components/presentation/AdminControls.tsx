// Floating admin controls for slide navigation and live toggle
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Radio, Circle, Users, Grid3x3 as Grid3X3, X } from 'lucide-react';
import { usePresentation } from '../../context/PresentationContext';
import { SLIDES } from '../../data/slides';

export function AdminControls() {
  const { currentSlide, totalSlides, isLive, guestCount, nextSlide, prevSlide, goToSlide, toggleLive } = usePresentation();
  const [showOverview, setShowOverview] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center p-4">
        <div className="glass-card-strong rounded-2xl flex items-center gap-2 px-4 py-3 max-w-lg w-full">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => setShowOverview(true)}
            className="flex-1 text-center px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors"
          >
            <span className="text-white font-bold text-sm">{currentSlide + 1}</span>
            <span className="text-white/30 text-sm"> / {totalSlides}</span>
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>

          <div className="w-px h-8 bg-white/10 mx-1" />

          <button
            onClick={toggleLive}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              isLive
                ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                : 'bg-teal-500/20 text-teal-400 border border-teal-500/30 hover:bg-teal-500/30'
            }`}
          >
            {isLive ? <Radio size={14} className="animate-pulse-live" /> : <Circle size={14} />}
            {isLive ? 'LIVE' : 'Go Live'}
          </button>

          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5">
            <Users size={14} className="text-teal-400" />
            <span className="text-white font-bold text-sm">{guestCount}</span>
          </div>
        </div>
      </div>

      {showOverview && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-lg flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Grid3X3 size={18} className="text-teal-400" />
              <span className="text-white font-semibold">Slide-Uebersicht</span>
            </div>
            <button
              onClick={() => setShowOverview(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => { goToSlide(i); setShowOverview(false); }}
                  className={`aspect-video rounded-xl border-2 p-3 text-left transition-all hover:scale-105 ${
                    i === currentSlide
                      ? 'border-teal-400 bg-teal-500/10'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                  }`}
                >
                  <span className={`text-xs font-bold ${i === currentSlide ? 'text-teal-400' : 'text-white/40'}`}>
                    {i + 1}
                  </span>
                  <p className="text-white/70 text-xs mt-1 line-clamp-2">
                    {getSlideLabel(slide.type, slide.data)}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function getSlideLabel(type: string, data: Record<string, unknown>): string {
  switch (type) {
    case 'title': return data.title as string || 'Title';
    case 'statement': return (data as { heading?: string }).heading || 'Statement';
    case 'timezone': return 'Zeitverschiebung';
    case 'infocard': return (data as { heading?: string }).heading || 'Info';
    case 'warning': return 'Abholzeiten-Warnung';
    case 'schedule': return `Tag ${(data.dayIndex as number) + 1}`;
    case 'closing': return 'Abschluss';
    default: return type;
  }
}
