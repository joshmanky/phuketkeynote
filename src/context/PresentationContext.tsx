// Presentation state with Supabase Realtime sync, guest management, and session lifecycle
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { TOTAL_SLIDES } from '../data/slides';
import type { PresentationState } from '../types';

interface PresentationContextValue {
  currentSlide: number;
  isLive: boolean;
  sessionEnded: boolean;
  totalSlides: number;
  guestCount: number;
  isAdmin: boolean;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  toggleLive: () => void;
  endSession: () => Promise<void>;
  resetSession: () => Promise<void>;
}

const PresentationCtx = createContext<PresentationContextValue | null>(null);

export function usePresentation() {
  const ctx = useContext(PresentationCtx);
  if (!ctx) throw new Error('usePresentation must be used within PresentationProvider');
  return ctx;
}

interface Props {
  mode: 'admin' | 'viewer';
  children: React.ReactNode;
}

export function PresentationProvider({ mode, children }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const isAdmin = mode === 'admin';

  const fetchState = useCallback(async () => {
    const { data } = await supabase
      .from('presentation_state')
      .select('*')
      .limit(1)
      .maybeSingle();
    if (data) {
      const state = data as PresentationState;
      if (!isAdmin) {
        setCurrentSlide(state.current_slide_index);
        setIsLive(state.is_live);
        setSessionEnded(state.session_ended ?? false);
      }
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  useEffect(() => {
    if (isAdmin) return;
    const interval = setInterval(fetchState, 4000);
    return () => clearInterval(interval);
  }, [isAdmin, fetchState]);

  useEffect(() => {
    const channel = supabase
      .channel('presentation-sync')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'presentation_state',
      }, (payload) => {
        const newState = payload.new as PresentationState;
        if (!isAdmin) {
          setCurrentSlide(newState.current_slide_index);
          setIsLive(newState.is_live);
          setSessionEnded(newState.session_ended ?? false);
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [isAdmin]);

  useEffect(() => {
    (async () => {
      const { count } = await supabase
        .from('session_guests')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);
      setGuestCount(count || 0);
    })();
    const channel = supabase
      .channel('guests-sync')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'session_guests',
      }, async () => {
        const { count } = await supabase
          .from('session_guests')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true);
        setGuestCount(count || 0);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const syncToDb = useCallback(async (slideIndex: number, live?: boolean, ended?: boolean) => {
    const updates: Record<string, unknown> = {
      current_slide_index: slideIndex,
      transition_direction: 'forward',
      updated_at: new Date().toISOString(),
    };
    if (live !== undefined) updates.is_live = live;
    if (ended !== undefined) updates.session_ended = ended;
    await supabase.from('presentation_state').update(updates).gte('current_slide_index', 0);
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= TOTAL_SLIDES) return;
    setCurrentSlide(index);
    if (isAdmin && isLive) syncToDb(index);
  }, [isAdmin, isLive, syncToDb]);

  const nextSlide = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
  const prevSlide = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  const toggleLive = useCallback(async () => {
    const newLive = !isLive;
    setIsLive(newLive);
    if (newLive) {
      await syncToDb(currentSlide, true, false);
    } else {
      await syncToDb(currentSlide, false);
    }
  }, [isLive, currentSlide, syncToDb]);

  const endSession = useCallback(async () => {
    await syncToDb(currentSlide, false, true);
    setIsLive(false);
    await supabase
      .from('session_guests')
      .update({ is_active: false, left_at: new Date().toISOString() })
      .neq('id', '00000000-0000-0000-0000-000000000000');
  }, [currentSlide, syncToDb]);

  const resetSession = useCallback(async () => {
    setSessionEnded(false);
    await syncToDb(currentSlide, false, false);
  }, [currentSlide, syncToDb]);

  return (
    <PresentationCtx.Provider value={{
      currentSlide, isLive, sessionEnded, totalSlides: TOTAL_SLIDES, guestCount, isAdmin,
      goToSlide, nextSlide, prevSlide, toggleLive, endSession, resetSession,
    }}>
      {children}
    </PresentationCtx.Provider>
  );
}
