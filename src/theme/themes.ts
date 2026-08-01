/**
 * NEXUS COUNTDOWN — Theme Definitions
 * 
 * Six premium themes, each with a complete color palette.
 * Changing `nexusConfig.theme.active` switches the entire visual identity.
 */

import type { ThemeDefinition } from '../types';

export const themes: Record<string, ThemeDefinition> = {

  obsidian: {
    name: 'obsidian',
    label: 'Obsidian',
    colors: {
      bg: '#000000',
      surface: '#080808',
      surfaceElevated: '#111111',
      accent: '#3b82f6',
      accentSecondary: '#8b5cf6',
      accentGlow: 'rgba(59, 130, 246, 0.15)',
      text: '#f0f0f0',
      textMuted: '#6b7280',
      textSubtle: '#374151',
      border: 'rgba(255, 255, 255, 0.06)',
      particleColor: '#60a5fa',
      ringColor: '#a0a0a0',
      sphereColor: '#c0c0c0',
      beamColor: '#3b82f6',
    },
  },

  aurora: {
    name: 'aurora',
    label: 'Aurora',
    colors: {
      bg: '#020612',
      surface: '#0a1020',
      surfaceElevated: '#111830',
      accent: '#06d6a0',
      accentSecondary: '#118ab2',
      accentGlow: 'rgba(6, 214, 160, 0.15)',
      text: '#e8f0f0',
      textMuted: '#5c8a8a',
      textSubtle: '#2d4a4a',
      border: 'rgba(6, 214, 160, 0.08)',
      particleColor: '#06d6a0',
      ringColor: '#88ccaa',
      sphereColor: '#a0d0c0',
      beamColor: '#06d6a0',
    },
  },

  nebula: {
    name: 'nebula',
    label: 'Nebula',
    colors: {
      bg: '#0a0010',
      surface: '#120820',
      surfaceElevated: '#1a1030',
      accent: '#c084fc',
      accentSecondary: '#f472b6',
      accentGlow: 'rgba(192, 132, 252, 0.15)',
      text: '#f0e8ff',
      textMuted: '#8b6baa',
      textSubtle: '#4a3060',
      border: 'rgba(192, 132, 252, 0.08)',
      particleColor: '#c084fc',
      ringColor: '#b0a0cc',
      sphereColor: '#c0b0d0',
      beamColor: '#c084fc',
    },
  },

  titanium: {
    name: 'titanium',
    label: 'Titanium',
    colors: {
      bg: '#0c0c0c',
      surface: '#141414',
      surfaceElevated: '#1c1c1c',
      accent: '#a0a0a0',
      accentSecondary: '#707070',
      accentGlow: 'rgba(160, 160, 160, 0.12)',
      text: '#e8e8e8',
      textMuted: '#808080',
      textSubtle: '#404040',
      border: 'rgba(255, 255, 255, 0.05)',
      particleColor: '#b0b0b0',
      ringColor: '#c0c0c0',
      sphereColor: '#d0d0d0',
      beamColor: '#a0a0a0',
    },
  },

  midnight: {
    name: 'midnight',
    label: 'Midnight',
    colors: {
      bg: '#000510',
      surface: '#040a18',
      surfaceElevated: '#0a1428',
      accent: '#60a5fa',
      accentSecondary: '#3b82f6',
      accentGlow: 'rgba(96, 165, 250, 0.15)',
      text: '#e0e8ff',
      textMuted: '#5070a0',
      textSubtle: '#283a60',
      border: 'rgba(96, 165, 250, 0.06)',
      particleColor: '#93c5fd',
      ringColor: '#8090b0',
      sphereColor: '#a0b0d0',
      beamColor: '#60a5fa',
    },
  },

  minimal: {
    name: 'minimal',
    label: 'Minimal',
    colors: {
      bg: '#050505',
      surface: '#0a0a0a',
      surfaceElevated: '#141414',
      accent: '#ffffff',
      accentSecondary: '#e0e0e0',
      accentGlow: 'rgba(255, 255, 255, 0.08)',
      text: '#ffffff',
      textMuted: '#888888',
      textSubtle: '#444444',
      border: 'rgba(255, 255, 255, 0.04)',
      particleColor: '#ffffff',
      ringColor: '#888888',
      sphereColor: '#cccccc',
      beamColor: '#ffffff',
    },
  },
};

/**
 * Apply a theme by setting CSS custom properties on the document root.
 * This instantly updates the entire visual identity.
 */
export function applyTheme(themeName: string): void {
  const theme = themes[themeName];
  if (!theme) return;

  const root = document.documentElement;
  const { colors } = theme;

  root.setAttribute('data-theme', themeName);

  Object.entries(colors).forEach(([key, value]) => {
    /* Convert camelCase to kebab-case for CSS variable names */
    const cssVar = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    root.style.setProperty(cssVar, value);
  });
}

/** Get current theme definition */
export function getTheme(themeName: string): ThemeDefinition {
  return themes[themeName] || themes.obsidian;
}
