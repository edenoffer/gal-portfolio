import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './WalkingCat.module.css';

const BASE_SIZE       = 96;   // 3× sprite
const BIG_SIZE        = 128;  // 4× sprite for walkBack
const WALK_SPEED      = 1.6;  // px per frame rightward
const WALK_BACK_SPEED = 2.4;  // px per frame leftward (slightly faster)
const SIT_TIMEOUT     = 3500; // ms before auto-resuming from sit

/**
 * A draggable walking cat sprite.
 *
 * Drag anywhere on screen with mouse or touch.
 * Click (no drag) cycles: walk → sit → jump → walk
 *
 * States
 *   walk     – moves right, normal size
 *   walkBack – moves left, bigger, triggered at right edge
 *   sit      – idle; auto-resumes after SIT_TIMEOUT, or click to jump
 *   jump     – vertical bounce in place
 *   drag     – being dragged (shows sit sprite)
 */
export default function WalkingCat() {
  const [state,   setState  ] = useState('walk');
  const [isBig,   setIsBig  ] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [ready,   setReady  ] = useState(false);

  const outerRef     = useRef(null);
  const stateRef     = useRef('walk');
  const isBigRef     = useRef(false);
  const flippedRef   = useRef(false);
  const prevStateRef = useRef('walk');
  const xRef         = useRef(-BASE_SIZE);
  const yRef         = useRef(0);
  const rafRef       = useRef(null);
  const sitTimer     = useRef(null);

  // Keep refs in sync with state (readable inside RAF/closures without stale values)
  stateRef.current   = state;
  isBigRef.current   = isBig;
  flippedRef.current = flipped;

  // ── Initial position: just above the hero h1 ──────────────────
  useEffect(() => {
    // Disable on mobile — avoids interfering with touch scrolling
    if (window.innerWidth < 768) return;

    const init = () => {
      const h1 = document.querySelector('[data-hero-title]');
      if (!h1) return;
      const r = h1.getBoundingClientRect();
      xRef.current = -BASE_SIZE;
      yRef.current = r.top - BASE_SIZE - 16;
      if (outerRef.current) {
        outerRef.current.style.left = `${xRef.current}px`;
        outerRef.current.style.top  = `${yRef.current}px`;
      }
      setReady(true);
    };
    // One frame delay so layout is settled
    const id = requestAnimationFrame(init);
    return () => cancelAnimationFrame(id);
  }, []);

  // ── RAF walk loop ──────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;

    const tick = () => {
      const el = outerRef.current;
      const s  = stateRef.current;

      if (el && (s === 'walk' || s === 'walkBack')) {
        const sz = isBigRef.current ? BIG_SIZE : BASE_SIZE;

        if (s === 'walk') {
          xRef.current += WALK_SPEED;
          if (xRef.current > window.innerWidth + sz) {
            // Exit right → come back bigger from right, walking left
            xRef.current = window.innerWidth;
            stateRef.current = 'walkBack';
            setState('walkBack');
            setIsBig(true);
            setFlipped(true);
            flippedRef.current = true;
          }
        } else {
          xRef.current -= WALK_BACK_SPEED;
          if (xRef.current < -sz) {
            // Exit left → normal walk right
            xRef.current = -BASE_SIZE;
            stateRef.current = 'walk';
            setState('walk');
            setIsBig(false);
            setFlipped(false);
            flippedRef.current = false;
          }
        }

        el.style.left = `${xRef.current}px`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [ready]);

  // ── Sit auto-resume ────────────────────────────────────────────
  useEffect(() => {
    if (state !== 'sit') return;
    sitTimer.current = setTimeout(() => {
      stateRef.current = 'walk';
      setState('walk');
      setIsBig(false);
      setFlipped(false);
      flippedRef.current = false;
    }, SIT_TIMEOUT);
    return () => clearTimeout(sitTimer.current);
  }, [state]);

  // ── Jump → walk on animation end ──────────────────────────────
  const onAnimEnd = useCallback((e) => {
    if (e.animationName === 'catJump' && stateRef.current === 'jump') {
      stateRef.current = 'walk';
      setState('walk');
      setIsBig(false);
      setFlipped(false);
      flippedRef.current = false;
    }
  }, []);

  // ── Click (fired by pointer-down handler when no drag occurred) ─
  const handleClick = useCallback(() => {
    const s = stateRef.current;
    if (s === 'walk' || s === 'walkBack') {
      prevStateRef.current = s;
      stateRef.current = 'sit';
      setState('sit');
    } else if (s === 'sit') {
      clearTimeout(sitTimer.current);
      stateRef.current = 'jump';
      setState('jump');
    } else if (s === 'jump') {
      stateRef.current = 'walk';
      setState('walk');
      setIsBig(false);
      setFlipped(false);
      flippedRef.current = false;
    }
  }, []);

  // ── Drag (pointer events — works for mouse + touch) ────────────
  const onPointerDown = useCallback((e) => {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();

    const startX    = e.clientX;
    const startY    = e.clientY;
    const catStartX = xRef.current;
    const catStartY = yRef.current;
    let isDragging  = false;
    let lastDx      = 0;

    const onMove = (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!isDragging && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
        isDragging = true;
        prevStateRef.current = stateRef.current;
        stateRef.current = 'drag';
        setState('drag');
        clearTimeout(sitTimer.current);
        if (outerRef.current) outerRef.current.style.cursor = 'grabbing';
      }

      if (isDragging) {
        lastDx = dx;
        xRef.current = catStartX + dx;
        yRef.current = catStartY + dy;

        const el = outerRef.current;
        if (el) {
          el.style.left = `${xRef.current}px`;
          el.style.top  = `${yRef.current}px`;
        }

        // Face the direction of horizontal drag
        const shouldFlip = lastDx < -8;
        if (shouldFlip !== flippedRef.current) {
          flippedRef.current = shouldFlip;
          setFlipped(shouldFlip);
        }
      }
    };

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup',   onUp);

      if (isDragging) {
        // Resume based on final drag direction
        if (lastDx < 0) {
          // Was moving left → resume walkBack
          stateRef.current = 'walkBack';
          setState('walkBack');
          setIsBig(true);
          setFlipped(true);
          flippedRef.current = true;
        } else {
          // Moving right or stationary → walk normally
          stateRef.current = 'walk';
          setState('walk');
          setIsBig(false);
          setFlipped(false);
          flippedRef.current = false;
        }
        if (outerRef.current) outerRef.current.style.cursor = 'grab';
      } else {
        handleClick();
      }
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup',   onUp);
  }, [handleClick]);

  if (!ready) return null;

  const outerClass = [styles.outer, flipped ? styles.flipped : ''].filter(Boolean).join(' ');

  // During drag, show sit sprite (cat looks held)
  const spriteState = state === 'drag' ? 'sit' : state;
  const innerClass  = [
    styles.inner,
    styles[spriteState],
    isBig ? styles.big : '',
  ].filter(Boolean).join(' ');

  return (
    <div ref={outerRef} className={outerClass} aria-hidden="true">
      <div
        className={innerClass}
        onPointerDown={onPointerDown}
        onAnimationEnd={onAnimEnd}
        title="Click or drag!"
      />
    </div>
  );
}
