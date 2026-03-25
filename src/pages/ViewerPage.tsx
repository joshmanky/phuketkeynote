// Viewer page - synchronized read-only presentation view with guest lifecycle management
import { useEffect, useCallback } from 'react';
import { PresentationProvider, usePresentation } from '../context/PresentationContext';
import { SlideTransition } from '../components/presentation/SlideTransition';
import { Radio, Users, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Props {
  guestName: string;
  onLeave: () => void;
}

async function deactivateGuest() {
  const guestId = sessionStorage.getItem('guest_id');
  if (!guestId) return;
  await supabase
    .from('session_guests')
    .update({ is_active: false, left_at: new Date().toISOString() })
    .eq('id', guestId);
}

function ViewerContent({ guestName, onLeave }: Props) {
  const { isLive, sessionEnded, guestCount, currentSlide, totalSlides } = usePresentation();

  const handleLeave = useCallback(async () => {
    await deactivateGuest();
    onLeave();
  }, [onLeave]);

  useEffect(() => {
    const handleUnload = () => {
      const guestId = sessionStorage.getItem('guest_id');
      if (!guestId) return;
      supabase
        .from('session_guests')
        .update({ is_active: false, left_at: new Date().toISOString() })
        .eq('id', guestId);
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  useEffect(() => {
    if (sessionEnded) {
      deactivateGuest().then(() => {
        sessionStorage.removeItem('guest_name');
        sessionStorage.removeItem('guest_id');
        onLeave();
      });
    }
  }, [sessionEnded, onLeave]);

  if (!isLive) {
    return <WaitingLobby guestName={guestName} guestCount={guestCount} onLeave={handleLeave} />;
  }

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-0 left-0 right-0 z-40 h-0.5 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      <div className="absolute top-3 left-3 z-40 flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/25">
        <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse-live" />
        <span className="text-red-400 text-[10px] font-bold tracking-wider">LIVE</span>
      </div>

      <div className="absolute top-3 right-3 z-40 flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
          <Users size={11} className="text-teal-400" />
          <span className="text-white/50 text-[10px] font-bold">{guestCount}</span>
        </div>
        <div className="hidden sm:block px-2.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
          <span className="text-white/30 text-[10px]">{guestName}</span>
        </div>
      </div>

      <SlideTransition />
    </div>
  );
}

function WaitingLobby({ guestName, guestCount, onLeave }: { guestName: string; guestCount: number; onLeave: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden" style={{ background: '#080d18' }}>
      <div className="absolute w-[400px] h-[400px] rounded-full bg-teal-500/[0.05] blur-[100px] top-1/3 left-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 text-center px-6 w-full max-w-sm">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <Radio size={20} className="text-white/15" />
          </div>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-white mb-2">Warte auf den Presenter...</h2>
        <p className="text-white/25 text-sm mb-6 leading-relaxed">
          Die Praesentation hat noch nicht begonnen. Du wirst automatisch verbunden, sobald es losgeht.
        </p>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-teal-500/10 border border-teal-500/15 flex items-center justify-center">
                <Users size={13} className="text-teal-400" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-white text-sm font-semibold truncate max-w-[140px]">{guestName}</p>
                <p className="text-white/25 text-[10px]">Du bist dabei</p>
              </div>
            </div>
            <div className="text-right shrink-0 ml-2">
              <p className="text-white font-bold text-lg">{guestCount}</p>
              <p className="text-white/25 text-[10px]">Gaeste</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400/50 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400/30 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400/15 animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>

        <button
          onClick={onLeave}
          className="inline-flex items-center gap-2 text-white/20 text-xs hover:text-white/40 transition-colors py-2"
        >
          <LogOut size={12} />
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
