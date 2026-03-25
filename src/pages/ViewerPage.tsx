// Viewer page - synchronized read-only presentation view
import { PresentationProvider, usePresentation } from '../context/PresentationContext';
import { SlideTransition } from '../components/presentation/SlideTransition';
import { Radio, Users, ArrowLeft } from 'lucide-react';

interface Props {
  guestName: string;
  onLeave: () => void;
}

const DISPLAY_MODE_KEY = '__display__';

function ViewerContent({ guestName, onLeave }: Props) {
  const { isLive, guestCount, currentSlide, totalSlides } = usePresentation();
  const isDisplayMode = guestName === DISPLAY_MODE_KEY;

  if (!isLive && !isDisplayMode) {
    return <WaitingLobby guestName={guestName} guestCount={guestCount} onLeave={onLeave} />;
  }

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-0 left-0 right-0 z-40 h-0.5 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {isLive && (
        <div className="absolute top-3 left-3 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-500/25">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse-live" />
          <span className="text-red-400 text-[10px] font-bold tracking-wider">LIVE</span>
        </div>
      )}

      {!isDisplayMode && (
        <div className="absolute top-3 right-3 z-40 flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
            <Users size={11} className="text-teal-400" />
            <span className="text-white/50 text-[10px] font-bold">{guestCount}</span>
          </div>
          <div className="px-2.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
            <span className="text-white/30 text-[10px]">{guestName}</span>
          </div>
        </div>
      )}

      <SlideTransition />
    </div>
  );
}

function WaitingLobby({ guestName, guestCount, onLeave }: { guestName: string; guestCount: number; onLeave: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden" style={{ background: '#080d18' }}>
      <div className="absolute w-[500px] h-[500px] rounded-full bg-teal-500/[0.05] blur-[100px] top-1/3 left-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-md">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <Radio size={24} className="text-white/15" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-3">Warte auf den Presenter...</h2>
        <p className="text-white/25 text-sm mb-8">
          Die Praesentation hat noch nicht begonnen. Du wirst automatisch verbunden, sobald es losgeht.
        </p>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/15 flex items-center justify-center">
                <Users size={13} className="text-teal-400" />
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-semibold">{guestName}</p>
                <p className="text-white/25 text-[10px]">Du bist dabei</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-bold text-lg">{guestCount}</p>
              <p className="text-white/25 text-[10px]">Gaeste</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400/50 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400/30 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400/15 animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>

        <button
          onClick={onLeave}
          className="inline-flex items-center gap-2 text-white/20 text-xs hover:text-white/40 transition-colors"
        >
          <ArrowLeft size={12} />
          Session verlassen
        </button>
      </div>
    </div>
  );
}

export function ViewerPage({ guestName, onLeave }: Props) {
  return (
    <PresentationProvider mode="viewer">
      <ViewerContent guestName={guestName} onLeave={onLeave} />
    </PresentationProvider>
  );
}
