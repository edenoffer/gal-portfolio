import { useEffect, useRef } from 'react';
import styles from './LazyVideo.module.css';

/**
 * Video that only loads + plays when scrolled into view.
 * Uses preload="none" by default, then swaps to preload="auto" and plays.
 */
export default function LazyVideo({ src, poster, alt, className, objectFit = 'cover' }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (video.preload === 'none') {
              video.preload = 'auto';
              video.load();
            }
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={className || styles.video}
      style={objectFit !== 'cover' ? { objectFit } : undefined}
      src={src}
      poster={poster}
      preload="none"
      autoPlay={false}
      muted
      loop
      playsInline
      aria-label={alt}
    />
  );
}
