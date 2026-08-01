/**
 * NEXUS COUNTDOWN — Application State Store
 * 
 * Manages global application state shared between the 3D scene and DOM.
 * Uses Zustand for lightweight, performant state management.
 */

import { create } from 'zustand';
import type { ExperiencePhase, CursorVariant, NormalizedMouse } from '../types';

interface AppState {
  /* ─── Experience Phase ─────────────────────────── */
  phase: ExperiencePhase;
  setPhase: (phase: ExperiencePhase) => void;

  /* ─── Theme ────────────────────────────────────── */
  activeTheme: string;
  setActiveTheme: (theme: string) => void;

  /* ─── Cursor ───────────────────────────────────── */
  cursorVariant: CursorVariant;
  setCursorVariant: (variant: CursorVariant) => void;

  /* ─── Mouse (normalized) ───────────────────────── */
  mouse: NormalizedMouse;
  setMouse: (mouse: NormalizedMouse) => void;

  /* ─── Landing Complete ─────────────────────────── */
  landingComplete: boolean;
  setLandingComplete: (complete: boolean) => void;

  /* ─── Sound ────────────────────────────────────── */
  soundEnabled: boolean;
  toggleSound: () => void;

  /* ─── Command Palette ──────────────────────────── */
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;

  /* ─── Reduced Motion ───────────────────────────── */
  prefersReducedMotion: boolean;
  setPrefersReducedMotion: (value: boolean) => void;

  /* ─── Quality ──────────────────────────────────── */
  adaptiveQuality: number; // 0-1, where 1 is full quality
  setAdaptiveQuality: (quality: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  phase: 'loading',
  setPhase: (phase) => set({ phase }),

  activeTheme: 'obsidian',
  setActiveTheme: (activeTheme) => set({ activeTheme }),

  mouse: { x: 0, y: 0 },
  setMouse: (mouse) => set({ mouse }),

  cursorVariant: 'default',
  setCursorVariant: (cursorVariant) => set({ cursorVariant }),

  landingComplete: false,
  setLandingComplete: (landingComplete) => set({ landingComplete }),

  soundEnabled: false,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  commandPaletteOpen: false,
  setCommandPaletteOpen: (commandPaletteOpen) => set({ commandPaletteOpen }),
  toggleCommandPalette: () =>
    set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),

  prefersReducedMotion: false,
  setPrefersReducedMotion: (prefersReducedMotion) => set({ prefersReducedMotion }),

  adaptiveQuality: 1,
  setAdaptiveQuality: (adaptiveQuality) => set({ adaptiveQuality }),
}));
