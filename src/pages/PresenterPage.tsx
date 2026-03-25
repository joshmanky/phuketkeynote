// Admin presenter page with slide controls and progress bar
import { PresentationProvider, usePresentation } from '../context/PresentationContext';
import { SlideTransition } from '../components/presentation/SlideTransition';
import { AdminControls } from '../components/presentation/AdminControls';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import { ArrowLeft, X } from 'lucide-react';

interface Props {
  displayMode: boolean;
  onLogout: () => void;
}

function PresenterContent({ displayMode, onLogout }: Props) {
  const { nextSlide, prevSlide, toggleLive, isLive, currentSlide, totalSlides } = usePresentation();

  useKeyboardNav({
    onNext: nextSlide,
    onPrev: prevSlide,
    onToggleLive: toggleLive,
    enabled: true,
  });

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-0 left-0 right-0 z-40 h-[3px] bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {displayMode && (
        <>
          <button
            onClick={onLogout}
            className="absolute top-4 left-4 z-40 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-sm border border-white/[0.08] text-white/40 hover:text-white hover:bg-black/60 hover:border-white/15 transition-all text-xs font-medium"
          >
            <ArrowLeft size={13} />
            Zuruck
          </button>
          <button
            onClick={onLogout}
            className="absolute top-4 right-4 z-40 w-8 h-8 flex items-center justify-center rounded-xl bg-black/40 backdrop-blur-sm border border-white/[0.08] text-white/30 hover:text-white hover:bg-black/60 hover:border-white/15 transition-all"
          >
            <X size={14} />
          </button>
        </>
      )}

      {isLive && !displayMode && (
        <div className="absolute top-3 right-3 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-500/25">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse-live" />
          <span className="text-red-400 text-[10px] font-bold tracking-wider">LIVE</span>
        </div>
      )}

      <SlideTransition />
      <AdminControls displayMode={displayMode} onLogout={onLogout} />
    </div>
  );
}

export function PresenterPage({ displayMode, onLogout }: Props) {
  return (
    <PresentationProvider mode="admin">
      <PresenterContent displayMode={displayMode} onLogout={onLogout} />
    </PresentationProvider>
  );
}
