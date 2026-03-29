import { useEffect, useRef } from 'react';
import ProjectCard from '../components/ProjectCard';
import WalkingCat from '../components/WalkingCat';
import { projects, REEL_URL } from '../data/projects';
import styles from './Home.module.css';

export default function Home() {
  const gridRef = useRef(null);

  // Stagger cards on mount
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('[data-card]');
    if (!cards) return;
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 200 + i * 80);
    });
  }, []);

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} data-hero-section>
        <div className={styles.heroInner}>
          <h1 className={styles.heroName} data-hero-title>Gal<br />Michalevicz</h1>
          <div className={styles.heroMeta}>
            <p className={styles.heroRole}>3D Animator</p>
            <p className={styles.heroTools}>Blender · Spine 2D · Unity · Amsterdam</p>
          </div>
        </div>
        <WalkingCat />
        <div className={styles.heroRule} />
      </section>

      {/* Reel */}
      <section className={styles.reel}>
        <div className={styles.reelHeader}>
          <span className="mono">Reel '25</span>
        </div>
        <div className={styles.reelEmbed}>
          {REEL_URL ? (
            <iframe
              src={REEL_URL}
              title="Gal Michalevicz — Showreel 2025"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              loading="eager"
            />
          ) : (
            <div className={styles.reelPlaceholder}>
              <span className={styles.reelPlaceholderText}>Showreel</span>
              <p className={styles.reelPlaceholderSub}>Set REEL_URL in src/data/projects.js with your Vimeo or YouTube embed link</p>
            </div>
          )}
        </div>
      </section>

      {/* Work grid */}
      <section className={styles.work}>
        <div className={styles.workHeader}>
          <span className="mono">Selected Work</span>
          <span className="mono">{projects.length} Projects</span>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {projects.map((project) => (
            <div key={project.id} data-card>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
