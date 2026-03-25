// Guest management panel - shows active guests and allows session end
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, UserX, Power, AlertTriangle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { usePresentation } from '../../context/PresentationContext';
import type { SessionGuest } from '../../types';

interface Props {
  onClose: () => void;
  onSessionEnded: () => void;
}

export function GuestPanel({ onClose, onSessionEnded }: Props) {
  const { endSession } = usePresentation();
  const [guests, setGuests] = useState<SessionGuest[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [ending, setEnding] = useState(false);

  useEffect(() => {
    fetchGuests();
    const channel = supabase
      .channel('guest-panel-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'session_guests' }, fetchGuests)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  async function fetchGuests() {
    const { data } = await supabase
      .from('session_guests')
      .select('*')
      .eq('is_active', true)
      .order('joined_at', { ascending: true });
    setGuests(data || []);
  }

  async function removeGuest(id: string) {
    await supabase
      .from('session_guests')
      .update({ is_active: false, left_at: new Date().toISOString() })
      .eq('id', id);
  }

  async function handleEndSession() {
    setEnding(true);
    await endSession();
    setEnding(false);
    onSessionEnded();
    onClose();
  }

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative z-10 w-full sm:max-w-sm mx-4 mb-4 sm:mb-0 bg-[#0e1420] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Users size={15} className="text-teal-400" />
            <span className="text-white font-semibold text-sm">Teilnehmer</span>
            <span className="text-white/30 text-xs">({guests.length})</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        <div className="max-h-64 overflow-y-auto">
          {guests.length === 0 ? (
            <div className="py-8 text-center text-white/25 text-sm">
              Noch keine Teilnehmer
            </div>
          ) : (
            <ul className="divide-y divide-white/[0.04]">
              {guests.map((guest) => (
                <li key={guest.id} className="flex items-center justify-between px-4 py-2.5">
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{guest.display_name}</p>
                    <p className="text-white/25 text-[10px]">
                      {new Date(guest.joined_at).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr
                    </p>
                  </div>
                  <button
                    onClick={() => removeGuest(guest.id)}
                    className="ml-3 shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Teilnehmer entfernen"
                  >
                    <UserX size={13} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="px-4 py-3 border-t border-white/[0.06]">
          <AnimatePresence mode="wait">
            {!showConfirm ? (
              <motion.button
                key="end-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowConfirm(true)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition-all"
              >
                <Power size={14} />
                Session beenden
              </motion.button>
            ) : (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-amber-400/80 text-xs mb-2">
                  <AlertTriangle size={12} />
                  <span>Alle Teilnehmer werden abgemeldet.</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 py-2 rounded-xl bg-white/[0.05] text-white/50 text-xs font-semibold hover:bg-white/10 transition-colors"
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={handleEndSession}
                    disabled={ending}
                    className="flex-1 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500/30 transition-colors disabled:opacity-50"
                  >
                    {ending ? 'Beende...' : 'Ja, beenden'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
