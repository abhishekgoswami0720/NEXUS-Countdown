/**
 * NEXUS COUNTDOWN — Math & Animation Utilities
 * 
 * Reusable pure functions for interpolation, clamping,
 * range mapping, and easing throughout the application.
 */

/** Linear interpolation between two values */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Map a value from one range to another */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

/** Smooth damping (spring-like interpolation) */
export function damp(
  current: number,
  target: number,
  smoothing: number,
  delta: number,
): number {
  return lerp(current, target, 1 - Math.exp(-smoothing * delta));
}

/** Normalize a value from [0, max] to [0, 1] */
export function normalize(value: number, max: number): number {
  return clamp(value / max, 0, 1);
}

/** Convert degrees to radians */
export function degToRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/** Convert radians to degrees */
export function radToDeg(radians: number): number {
  return radians * (180 / Math.PI);
}

/** Generate a random float between min and max */
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/** Generate a random integer between min and max (inclusive) */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Ease-out cubic */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Ease-in-out cubic */
export function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Format a number with leading zeros */
export function padZero(num: number, length: number = 2): string {
  return String(num).padStart(length, '0');
}

/** Calculate distance between two 2D points */
export function distance2D(
  x1: number, y1: number,
  x2: number, y2: number,
): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
