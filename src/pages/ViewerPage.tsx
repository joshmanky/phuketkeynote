// Viewer page - synchronized read-only presentation view
import { PresentationProvider, usePresentation } from '../context/PresentationContext';
import { SlideTransition } from '../components/presentation/SlideTransition';
import { Radio, Users, ArrowLeft } from 'lucide-react';

interface Props {
  guestName: string;
  onLeave: () => void;
}

function ViewerContent({ guestName, onLeave }: Props) {
  const { isLive, guestCount, currentSlide, totalSlides } = usePresentation();

  if (!isLive) {
    return <WaitingLobby guestName={guestName} guestCount={guestCount} onLeave={onLeave} />;
  }

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-0 left-0 right-0 z-40 h-0.5 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      <div className="absolute top-3 left-3 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30">
        <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse-live" />
        <span className="text-red-400 text-xs font-bold">LIVE</span>
      </div>

      <div className="absolute top-3 right-3 z-40 flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card">
          <Users size={12} className="text-teal-400" />
          <span className="text-white/60 text-xs font-semibold">{guestCount}</span>
        </div>
        <div className="px-3 py-1.5 rounded-full glass-card">
          <span className="text-white/40 text-xs">{guestName}</span>
        </div>
      </div>

      <SlideTransition />
    </div>
  );
}

function WaitingLobby({ guestName, guestCount, onLeave }: { guestName: string; guestCount: number; onLeave: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center gradient-bg-ocean relative overflow-hidden">
      <div className="ambient-glow w-[500px] h-[500px] bg-teal-500/8 top-1/3 left-1/2 -translate-x-1/2" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-1 h-1 rounded-full bg-teal-400/30 top-[25%] left-[25%] animate-particle-1" />
        <div className="absolute w-1 h-1 rounded-full bg-cyan-400/20 top-[60%] left-[75%] animate-particle-2" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-md">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] mb-4">
            <Radio size={28} className="text-white/20" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">Warte auf den Presenter...</h2>
        <p className="text-white/30 text-sm mb-8">
          Die Praesentation hat noch nicht begonnen. Du wirst automatisch verbunden, sobald es losgeht.
        </p>

        <div className="glass-card rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/20 flex items-center justify-center">
                <Users size={14} className="text-teal-400" />
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-semibold">{guestName}</p>
                <p className="text-white/30 text-xs">Du bist dabei</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-bold text-lg">{guestCount}</p>
              <p className="text-white/30 text-xs">Gaeste</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400/60 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400/40 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400/20 animate-pulse" style={{ animationDelay: '0.6s' }} />
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
