// Guest landing page - enter name to join presentation session
import { useState } from 'react';
import { Users, ArrowRight, Lock, Monitor } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Props {
  onJoin: (guestName: string) => void;
  onAdminClick: () => void;
  onViewPresentation: () => void;
}

export function LandingPage({ onJoin, onAdminClick, onViewPresentation }: Props) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Bitte gib deinen Namen ein');
      return;
    }

    setLoading(true);
    setError('');

    const { error: dbError } = await supabase
      .from('session_guests')
      .insert({ display_name: trimmed });

    if (dbError) {
      setError('Fehler beim Beitreten. Bitte versuche es erneut.');
      setLoading(false);
      return;
    }

    sessionStorage.setItem('guest_name', trimmed);
    onJoin(trimmed);
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gradient-bg-ocean relative overflow-hidden">
      <div className="ambient-glow w-[500px] h-[500px] bg-teal-500/10 -top-20 right-0" />
      <div className="ambient-glow w-[400px] h-[400px] bg-cyan-500/8 bottom-0 -left-20" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-1 h-1 rounded-full bg-teal-400/30 top-[20%] left-[30%] animate-particle-1" />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/20 top-[65%] left-[70%] animate-particle-2" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-glow-pulse" />
            <span className="text-white/50 text-xs font-medium tracking-wide">LIVE PRESENTATION</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            Leader Trip 2026
          </h1>
          <p className="text-white/40 text-sm">
            Phuket, Thailand &middot; 25. Marz &ndash; 1. April
          </p>
        </div>

        <form onSubmit={handleJoin} className="space-y-4">
          <div className="glass-card-strong rounded-2xl p-6">
            <label className="block mb-4">
              <span className="text-white/60 text-sm font-medium block mb-2">Dein Name</span>
              <div className="relative">
                <Users size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type="text"
                  value={name}
                  onChange={e => { setName(e.target.value); setError(''); }}
                  placeholder="Vor- und Nachname"
                  className="w-full bg-white/[0.06] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/20 transition-all"
                  autoFocus
                  disabled={loading}
                />
              </div>
            </label>

            {error && (
              <p className="text-red-400 text-xs mb-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full flex items-center justify-center gap-2 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 text-teal-400 font-semibold text-sm rounded-xl py-3 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-teal-400/30 border-t-teal-400 rounded-full animate-spin" />
              ) : (
                <>
                  Session beitreten
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-4">
          <button
            onClick={onViewPresentation}
            className="w-full flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white/60 hover:text-white/80 font-medium text-sm rounded-xl py-3 transition-all"
          >
            <Monitor size={16} />
            Prasentation Ansehen
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onAdminClick}
            className="inline-flex items-center gap-2 text-white/20 text-xs hover:text-white/40 transition-colors"
          >
            <Lock size={12} />
            Admin-Login
          </button>
        </div>
      </div>
    </div>
  );
}
