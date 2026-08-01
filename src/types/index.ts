/**
 * NEXUS COUNTDOWN — Core Type Definitions
 * 
 * Shared interfaces and types used throughout the application.
 * Every component, hook, and utility references these types.
 */

/* ─────────────────────────────────────────────
 * Experience Phases
 * ───────────────────────────────────────────── */

/** The sequential phases of the countdown experience */
export type ExperiencePhase =
  | 'loading'        // Assets loading
  | 'landing'        // Entry animation sequence
  | 'counting'       // Normal countdown
  | 'tenseconds'     // Last 10 seconds — cinematic buildup
  | 'final'          // 3-2-1 — maximum intensity
  | 'zero'           // 0 — blackout
  | 'reveal'         // The big reveal animation
  | 'postreveal';    // Interactive post-reveal experience

/* ─────────────────────────────────────────────
 * Cursor
 * ───────────────────────────────────────────── */

/** Cursor visual states */
export type CursorVariant =
  | 'default'        // Standard circle
  | 'hover-button'   // Expanded for buttons
  | 'hover-link'     // Morphed pill shape
  | 'hover-3d'       // Light distortion ring
  | 'hidden';        // Completely hidden

/** Cursor position with physics values */
export interface CursorState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  variant: CursorVariant;
  isVisible: boolean;
  scale: number;
}

/* ─────────────────────────────────────────────
 * Countdown
 * ───────────────────────────────────────────── */

/** Countdown time segments */
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isComplete: boolean;
}

/* ─────────────────────────────────────────────
 * Configuration
 * ───────────────────────────────────────────── */

/** Theme color palette */
export interface ThemeColors {
  bg: string;
  surface: string;
  surfaceElevated: string;
  accent: string;
  accentSecondary: string;
  accentGlow: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  border: string;
  particleColor: string;
  ringColor: string;
  sphereColor: string;
  beamColor: string;
}

/** Theme definition */
export interface ThemeDefinition {
  name: string;
  label: string;
  colors: ThemeColors;
}

/** Clue item configuration */
export interface ClueConfig {
  id: string;
  title: string;
  content: string;
  icon?: string;
  unlockDate?: string;
  locked: boolean;
  passwordProtected?: boolean;
  password?: string;
}

/** Timeline milestone configuration */
export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  icon?: string;
}

/** CTA button configuration */
export interface CTAConfig {
  text: string;
  url: string;
  variant: 'primary' | 'secondary' | 'ghost';
}

/** Social link configuration */
export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

/** Footer link */
export interface FooterLink {
  text: string;
  url: string;
}

/** Scene quality presets */
export type QualityPreset = 'low' | 'medium' | 'high' | 'ultra';

/** Full application configuration */
export interface NexusConfig {
  meta: {
    title: string;
    subtitle: string;
    description: string;
    ogImage?: string;
    favicon?: string;
    url?: string;
  };
  countdown: {
    targetDate: string;
    timezone: string;
    revealTitle: string;
    revealSubtitle: string;
  };
  theme: {
    active: string;
  };
  cursor: {
    enabled: boolean;
    size: number;
    glowColor: string;
    magneticStrength: number;
    expandScale: number;
  };
  scene: {
    particleCount: number;
    ringCount: number;
    bloomIntensity: number;
    qualityPreset: QualityPreset;
    enablePostProcessing: boolean;
  };
  clues: ClueConfig[];
  timeline: TimelineItem[];
  cta: CTAConfig[];
  social: SocialLink[];
  footer: {
    text: string;
    links: FooterLink[];
  };
  audio: {
    enabled: boolean;
    ambientUrl?: string;
  };
  features: {
    commandPalette: boolean;
    shareButtons: boolean;
    visitorCounter: boolean;
    pwa: boolean;
    easterEggs: boolean;
    musicToggle: boolean;
    timeline: boolean;
    clues: boolean;
  };
}

/* ─────────────────────────────────────────────
 * 3D Scene
 * ───────────────────────────────────────────── */

/** Mouse position normalized to [-1, 1] */
export interface NormalizedMouse {
  x: number;
  y: number;
}

/** Adaptive quality state */
export interface QualityState {
  particleCount: number;
  enableBloom: boolean;
  enablePostProcessing: boolean;
  pixelRatio: number;
  shadowMapSize: number;
}
