import { useEffect, useRef, useState } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
  const cursorRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState('');
  const pos = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) {
        setHovered(true);
        setLabel(el.dataset.cursor || '');
      }
    };

    const onLeave = (e) => {
      if (!e.target.closest('[data-cursor]')) {
        setHovered(false);
        setLabel('');
      }
    };

    const animate = () => {
      const ease = 0.12;
      current.current.x += (pos.current.x - current.current.x) * ease;
      current.current.y += (pos.current.y - current.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} ${hovered ? styles.hovered : ''}`}
    >
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
