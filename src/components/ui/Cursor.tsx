/**
 * NEXUS COUNTDOWN — Custom Cursor
 * 
 * Premium glass cursor with physics interpolation.
 * Features: animated border, soft glow, magnetic interaction,
 * context-aware state changes, and smooth spring physics.
 * 
 * Disabled on pure touch devices (no mouse pointer).
 * Works correctly on hybrid devices (touchscreen laptops).
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import { useAppStore } from '../../stores/appStore';
import { nexusConfig } from '../../config/nexus.config';
import { lerp } from '../../utils/math';

/**
 * Detect if this device is touch-ONLY (no mouse).
 * We use the CSS media query `(hover: none)` which is the most reliable
 * method — it returns true only on devices where the primary pointer
 * cannot hover (phones, tablets), NOT on touchscreen laptops.
 */
function useIsTouchOnly(): boolean {
  const [isTouchOnly, setIsTouchOnly] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(hover: none) and (pointer: coarse)');
    setIsTouchOnly(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsTouchOnly(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isTouchOnly;
}

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const scaleRef = useRef(1);
  const targetScaleRef = useRef(1);
  const rafRef = useRef<number>(0);
  const hasMovedRef = useRef(false);

  const cursorVariant = useAppStore((s) => s.cursorVariant);
  const setCursorVariant = useAppStore((s) => s.setCursorVariant);
  const phase = useAppStore((s) => s.phase);

  const isTouchOnly = useIsTouchOnly();
  const disabled = isTouchOnly || !nexusConfig.cursor.enabled;

  /** Add/remove the class that hides the native cursor */
  useEffect(() => {
    if (disabled) {
      document.body.classList.remove('custom-cursor-active');
    } else {
      document.body.classList.add('custom-cursor-active');
    }
    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, [disabled]);

  /** Physics animation loop — runs at display refresh rate */
  const animate = useCallback(() => {
    if (!cursorRef.current || !cursorDotRef.current) return;

    /* Spring interpolation — smooth follow */
    posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.15);
    posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.15);
    scaleRef.current = lerp(scaleRef.current, targetScaleRef.current, 0.12);

    /* Apply transform — GPU accelerated */
    const x = posRef.current.x;
    const y = posRef.current.y;
    const s = scaleRef.current;

    cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
    cursorDotRef.current.style.transform = `translate3d(${targetRef.current.x}px, ${targetRef.current.y}px, 0)`;

    /* Show cursor once mouse has moved */
    if (hasMovedRef.current) {
      cursorRef.current.style.opacity = '1';
      cursorDotRef.current.style.opacity = '1';
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  /** Track mouse movement */
  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      if (!hasMovedRef.current) {
        /* Snap to first position immediately (no lerp from -100,-100) */
        posRef.current.x = e.clientX;
        posRef.current.y = e.clientY;
        hasMovedRef.current = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate, disabled]);

  /** Update scale based on cursor variant */
  useEffect(() => {
    switch (cursorVariant) {
      case 'hover-button':
        targetScaleRef.current = nexusConfig.cursor.expandScale;
        break;
      case 'hover-link':
        targetScaleRef.current = 1.8;
        break;
      case 'hover-3d':
        targetScaleRef.current = 2.2;
        break;
      case 'hidden':
        targetScaleRef.current = 0;
        break;
      default:
        targetScaleRef.current = 1;
    }
  }, [cursorVariant]);

  /** Set up context-aware cursor states */
  useEffect(() => {
    if (disabled) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, .nexus-btn')) {
        setCursorVariant('hover-button');
      } else if (target.closest('a, .nexus-link')) {
        setCursorVariant('hover-link');
      } else if (target.closest('#scene-container')) {
        setCursorVariant('hover-3d');
      } else {
        setCursorVariant('default');
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, [setCursorVariant, disabled]);

  /* Don't render on touch-only devices */
  if (disabled) return null;

  const cursorGlow = phase === 'tenseconds' ? 'var(--color-accent)' :
    phase === 'final' ? '#ff4040' :
      'var(--color-accent)';

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="nexus-cursor"
        style={{
          '--cursor-glow': cursorGlow,
          '--cursor-size': `${nexusConfig.cursor.size}px`,
          opacity: 0,
        } as React.CSSProperties}
      />
      {/* Inner dot — tracks mouse directly */}
      <div ref={cursorDotRef} className="nexus-cursor-dot" style={{ opacity: 0 }} />
    </>
  );
}
