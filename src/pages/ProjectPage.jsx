import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { projects } from '../data/projects';
import LazyVideo from '../components/LazyVideo';
import styles from './ProjectPage.module.css';

function MediaItem({ item }) {
  if (item.type === 'embed') {
    return (
      <div className={styles.embedWrap}>
        <iframe
          src={item.src}
          title={item.alt || 'Video'}
          allow="autoplay; fullscreen"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }
  if (item.type === 'video') {
    const wrapClass = item.aspect === 'square' ? styles.videoWrapSquare
      : item.aspect === 'portrait' ? styles.videoWrapPortrait
      : styles.videoWrap;
    const objectFit = item.aspect === 'square' ? 'contain' : 'cover';
    return (
      <div className={wrapClass}>
        <LazyVideo src={item.src} poster={item.poster} alt={item.alt} objectFit={objectFit} />
      </div>
    );
  }
  // Default: image — span: 'full' for panoramic/ultra-wide strips
  const imgClass = item.span === 'full'
    ? `${styles.galleryImg} ${styles.galleryImgFull}`
    : styles.galleryImg;
  return (
    <img
      src={item.src}
      alt={item.alt || ''}
      className={imgClass}
      loading="lazy"
      decoding="async"
    />
  );
}

export default function ProjectPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      document.title = `${project.title.replace('\n', ' ')} — Gal Michalevicz`;
    }
    return () => { document.title = 'Gal Michalevicz — 3D Animator'; };
  }, [id, project]);

  if (!project) {
    return (
      <main className={styles.page}>
        <p className={styles.notFound}>Project not found.</p>
        <Link to="/" className={styles.back}>← Back to work</Link>
      </main>
    );
  }

  const currentIndex = projects.findIndex((p) => p.id === id);
  const prev = projects[currentIndex - 1] || null;
  const next = projects[currentIndex + 1] || null;

  const embedItem = project.gallery?.find((g) => g.type === 'embed');
  const images = project.gallery?.filter((g) => g.type === 'image') || [];
  const videos = project.gallery?.filter((g) => g.type === 'video') || [];

  // Hero priority: embed > first video > reelUrl > first image > placeholder
  // Animations always appear at the top of the page
  const heroVideo = !embedItem ? videos[0] : null;
  const heroImage = !embedItem && !heroVideo && !project.reelUrl ? images[0] : null;
  const remainingVideos = heroVideo ? videos.slice(1) : videos;
  const remainingImages = heroImage ? images.slice(1) : images;

  // Split remaining clips into typed groups for correct aspect rendering
  const squareClips = remainingVideos.filter((v) => v.aspect === 'square');
  const portraitClips = remainingVideos.filter((v) => v.aspect === 'portrait');
  const landscapeClips = remainingVideos.filter((v) => !v.aspect);

  return (
    <main className={styles.page}>
      {/* Back */}
      <div className={styles.topBar}>
        <Link to="/" className={styles.back} data-cursor="">
          <span className={styles.backArrow}>←</span>
          All Work
        </Link>
        <span className={styles.projectNum}>{project.index} / 0{projects.length}</span>
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerMeta}>
          <span className="mono">{project.type}</span>
          <span className="mono">{project.year}</span>
        </div>
        <h1 className={styles.title}>{project.title}</h1>
        {project.subtitle && <p className={styles.subtitle}>{project.subtitle}</p>}
        <div className={styles.tags}>
          {project.roles.map((r) => <span key={r} className="tag">{r}</span>)}
          {project.tools.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
      </header>

      <hr className={styles.rule} />

      {/* Hero — embed > first video > reel > first image > placeholder */}
      <section className={styles.media}>
        {embedItem ? (
          <div className={styles.embedWrap}>
            <iframe src={embedItem.src} title={project.title} allow="autoplay; fullscreen" allowFullScreen />
          </div>
        ) : heroVideo ? (
          <div className={heroVideo.aspect === 'square' ? styles.videoWrapHeroSquare
            : heroVideo.aspect === 'portrait' ? styles.videoWrapPortrait
            : styles.videoWrap}>
            <LazyVideo
              src={heroVideo.src}
              poster={heroVideo.poster}
              alt={heroVideo.alt}
              objectFit={heroVideo.aspect === 'square' ? 'contain' : 'cover'}
            />
          </div>
        ) : project.reelUrl ? (
          <div className={styles.embedWrap}>
            <iframe src={project.reelUrl} title={project.title} allow="autoplay; fullscreen" allowFullScreen />
          </div>
        ) : heroImage ? (
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            className={heroImage.span === 'full' ? styles.heroImgFull : styles.heroImg}
            loading="eager"
            decoding="async"
          />
        ) : (
          <div className={styles.mediaPlaceholder}>
            <span className={styles.mediaPlaceholderNum}>{project.index}</span>
          </div>
        )}
      </section>

      {/* Description */}
      <section className={styles.description}>
        {project.description.map((para, i) => (
          <p key={i} className={styles.para}>{para}</p>
        ))}
      </section>

      {/* Process */}
      {project.process.length > 0 && (
        <section className={styles.process}>
          <div className={styles.processHeader}>
            <span className="mono">Process</span>
          </div>
          <div className={styles.processGrid}>
            {project.process.map((step, i) => (
              <div key={i} className={styles.processStep}>
                <div className={styles.processThumb}>
                  {step.image ? (
                    <img src={step.image} alt={step.label} loading="lazy" decoding="async" />
                  ) : (
                    <div className={styles.processPlaceholder} />
                  )}
                </div>
                <span className={styles.processLabel}>{step.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Character animations — square clips */}
      {squareClips.length > 0 && (
        <section className={styles.gallery}>
          <div className={styles.galleryHeader}>
            <span className="mono">Animations</span>
          </div>
          <div className={styles.videoGridSquare}>
            {squareClips.map((item, i) => (
              <MediaItem key={i} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Gameplay footage — portrait clips */}
      {portraitClips.length > 0 && (
        <section className={styles.gallery}>
          <div className={styles.galleryHeader}>
            <span className="mono">Gameplay</span>
          </div>
          <div className={styles.videoGridPortrait}>
            {portraitClips.map((item, i) => (
              <MediaItem key={i} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Landscape clips — standard 16:9 */}
      {landscapeClips.length > 0 && (
        <section className={styles.gallery}>
          <div className={styles.galleryHeader}>
            <span className="mono">Clips</span>
          </div>
          <div className={styles.videoGrid}>
            {landscapeClips.map((item, i) => (
              <MediaItem key={i} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Gallery — images (remaining after hero if image was used) */}
      {remainingImages.length > 0 && (
        <section className={styles.gallery}>
          <div className={styles.galleryHeader}>
            <span className="mono">Gallery</span>
          </div>
          <div className={styles.galleryGrid}>
            {remainingImages.map((item, i) => (
              <MediaItem key={i} item={item} />
            ))}
          </div>
        </section>
      )}

      <hr className={styles.rule} />

      {/* Adjacent navigation */}
      <nav className={styles.adjacent}>
        {prev ? (
          <Link to={`/work/${prev.id}`} className={styles.adjLink} data-cursor="">
            <span className="mono">← Prev</span>
            <span className={styles.adjTitle}>{prev.title.split('\n')[0]}</span>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/work/${next.id}`} className={`${styles.adjLink} ${styles.adjRight}`} data-cursor="">
            <span className="mono">Next →</span>
            <span className={styles.adjTitle}>{next.title.split('\n')[0]}</span>
          </Link>
        ) : <div />}
      </nav>
    </main>
  );
}
