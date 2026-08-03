/**
 * NEXUS COUNTDOWN — Central Configuration
 * 
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  This is the SINGLE SOURCE OF TRUTH for the entire app.    ║
 * ║  Every text, color, timing, feature toggle, and URL        ║
 * ║  is defined here. No hardcoded values anywhere else.       ║
 * ╚══════════════════════════════════════════════════════════════╝
 * 
 * To customize the countdown experience, edit the values below.
 * No code changes are required anywhere else.
 */

import type { NexusConfig } from '../types';

export const nexusConfig: NexusConfig = {

  /* ─── Meta / SEO ─────────────────────────────────────────── */
  meta: {
    title: 'NEXUS',
    subtitle: 'Something extraordinary is approaching.',
    description: 'The world\'s most premium countdown experience. An immersive digital journey into the future.',
    ogImage: '/og-image.png',
    favicon: '/favicon.svg',
    url: 'https://nexus-countdown.dev',
  },

  /* ─── Countdown ──────────────────────────────────────────── */
  countdown: {
    targetDate: '2026-08-03T03:30:00.000Z', // Aug 3, 2026, 9:00 AM IST
    timezone: 'Asia/Kolkata',
    revealTitle: 'THE WAIT IS OVER',
    revealSubtitle: 'A new chapter begins.',
  },

  /* ─── Theme ──────────────────────────────────────────────── */
  theme: {
    active: 'obsidian',
  },

  /* ─── Custom Cursor ──────────────────────────────────────── */
  cursor: {
    enabled: true,
    size: 32,
    glowColor: 'rgba(59, 130, 246, 0.4)',
    magneticStrength: 0.3,
    expandScale: 2.5,
  },

  /* ─── 3D Scene ───────────────────────────────────────────── */
  scene: {
    particleCount: 800,
    ringCount: 4,
    bloomIntensity: 1.2,
    qualityPreset: 'high',
    enablePostProcessing: true,
  },

  /* ─── Clues ──────────────────────────────────────────────── */
  clues: [
    {
      id: 'clue-1',
      title: 'The Architecture',
      content: 'Built on a foundation that transcends conventional boundaries.',
      locked: false,
    },
    {
      id: 'clue-2',
      title: 'The Signal',
      content: 'Every pattern leads to a single convergence point.',
      locked: true,
      unlockDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'clue-3',
      title: 'The Catalyst',
      content: 'When the last variable aligns, everything changes.',
      locked: true,
      passwordProtected: true,
      password: 'nexus',
    },
  ],

  /* ─── Timeline ───────────────────────────────────────────── */
  timeline: [
    {
      id: 'milestone-1',
      title: 'Inception',
      description: 'The seed of an idea takes root.',
      date: '2025-01-15',
      completed: true,
    },
    {
      id: 'milestone-2',
      title: 'Foundation',
      description: 'Core architecture established.',
      date: '2025-06-01',
      completed: true,
    },
    {
      id: 'milestone-3',
      title: 'Convergence',
      description: 'All systems align.',
      date: '2025-09-01',
      completed: false,
    },
    {
      id: 'milestone-4',
      title: 'Emergence',
      description: 'The veil is lifted.',
      date: '2025-12-01',
      completed: false,
    },
  ],

  /* ─── Call to Action ─────────────────────────────────────── */
  cta: [
    { text: 'Enter the Future', url: '#', variant: 'primary' },
    { text: 'Learn More', url: '#', variant: 'secondary' },
  ],

  /* ─── Social Links ──────────────────────────────────────── */
  social: [
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/abhishekgoswami-ai/', label: 'Connect on LinkedIn' },
    { platform: 'instagram', url: 'https://www.instagram.com/abhishekgoswamii_/', label: 'Follow on Instagram' },
  ],

  /* ─── Footer ─────────────────────────────────────────────── */
  footer: {
    text: '© 2025 NEXUS. All rights reserved.',
    links: [
      { text: 'Privacy', url: '#' },
      { text: 'Terms', url: '#' },
    ],
  },

  /* ─── Audio ──────────────────────────────────────────────── */
  audio: {
    enabled: false,
    ambientUrl: undefined,
  },

  /* ─── Feature Toggles ───────────────────────────────────── */
  features: {
    commandPalette: true,
    shareButtons: true,
    visitorCounter: false,
    pwa: false,
    easterEggs: true,
    musicToggle: false,
    timeline: true,
    clues: true,
  },
};
