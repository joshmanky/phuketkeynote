// Presentation state management with Supabase Realtime sync
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { SLIDES, TOTAL_SLIDES, TRANSITION_DURATION } from '../data/slides';
import type { PresentationState } from '../types';

interface PresentationContextValue {
  currentSlide: number;
  previousSlide: number | null;
  isLive: boolean;
  isTransitioning: boolean;
  transitionDirection: 'forward' | 'backward';
  totalSlides: number;
  guestCount: number;
  isAdmin: boolean;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  toggleLive: () => void;
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
  const [previousSlide, setPreviousSlide] = useState<number | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');
  const [guestCount, setGuestCount] = useState(0);
  const transitionTimer = useRef<ReturnType<typeof setTimeout>>();
  const isAdmin = mode === 'admin';

  useEffect(() => {
    (async () => {
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
        } else {
          setCurrentSlide(state.current_slide_index);
          setIsLive(state.is_live);
        }
      }
    })();
  }, [isAdmin]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {});
    return () => subscription.unsubscribe();
  }, []);

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
          const dir = newState.transition_direction as 'forward' | 'backward';
          triggerTransition(newState.current_slide_index, dir);
          setIsLive(newState.is_live);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin, currentSlide]);

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

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const triggerTransition = useCallback((targetSlide: number, dir: 'forward' | 'backward') => {
    if (targetSlide === currentSlide) return;
    if (isTransitioning) return;

    const transitionType = SLIDES[targetSlide]?.transition || 'mindflow';
    const duration = TRANSITION_DURATION[transitionType] || 800;

    setPreviousSlide(currentSlide);
    setTransitionDirection(dir);
    setIsTransitioning(true);

    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => {
      setCurrentSlide(targetSlide);
      setPreviousSlide(null);
      setIsTransitioning(false);
    }, duration);
  }, [currentSlide, isTransitioning]);

  const syncToDb = useCallback(async (slideIndex: number, dir: 'forward' | 'backward', live?: boolean) => {
    const updates: Record<string, unknown> = {
      current_slide_index: slideIndex,
      transition_direction: dir,
      updated_at: new Date().toISOString(),
    };
    if (live !== undefined) updates.is_live = live;

    await supabase
      .from('presentation_state')
      .update(updates)
      .gte('current_slide_index', 0);
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= TOTAL_SLIDES) return;
    if (isTransitioning) return;

    const dir: 'forward' | 'backward' = index > currentSlide ? 'forward' : 'backward';
    triggerTransition(index, dir);

    if (isAdmin && isLive) {
      syncToDb(index, dir);
    }
  }, [currentSlide, isAdmin, isLive, isTransitioning, triggerTransition, syncToDb]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  const toggleLive = useCallback(async () => {
    const newLive = !isLive;
    setIsLive(newLive);
    await syncToDb(currentSlide, transitionDirection, newLive);
  }, [isLive, currentSlide, transitionDirection, syncToDb]);

  return (
    <PresentationCtx.Provider
      value={{
        currentSlide,
        previousSlide,
        isLive,
        isTransitioning,
        transitionDirection,
        totalSlides: TOTAL_SLIDES,
        guestCount,
        isAdmin,
        goToSlide,
        nextSlide,
        prevSlide,
        toggleLive,
      }}
    >
      {children}
    </PresentationCtx.Provider>
  );
}
