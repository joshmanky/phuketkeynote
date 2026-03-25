// Admin presenter page with slide controls, live sync, and custom cursor
import { PresentationProvider, usePresentation } from '../context/PresentationContext';
import { SlideTransition } from '../components/presentation/SlideTransition';
import { AdminControls } from '../components/presentation/AdminControls';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import { CustomCursor } from '../components/ui/CustomCursor';

interface Props {
  onLogout: () => void;
}

function PresenterContent({ onLogout: _onLogout }: Props) {
  const { nextSlide, prevSlide, toggleLive, isLive, currentSlide, totalSlides } = usePresentation();

  useKeyboardNav({
    onNext: nextSlide,
    onPrev: prevSlide,
    onToggleLive: toggleLive,
    enabled: true,
  });

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-0 left-0 right-0 z-40 h-1 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {isLive && (
        <div className="absolute top-3 right-3 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30">
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse-live" />
          <span className="text-red-400 text-xs font-bold">LIVE</span>
        </div>
      )}

      <SlideTransition />
      <AdminControls />
      <CustomCursor />
    </div>
  );
}

export function PresenterPage({ onLogout }: Props) {
  return (
    <PresentationProvider mode="admin">
      <PresenterContent onLogout={onLogout} />
    </PresentationProvider>
  );
}
