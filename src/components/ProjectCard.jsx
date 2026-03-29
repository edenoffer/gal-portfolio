import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/work/${project.id}`}
      className={styles.card}
      data-cursor="View"
    >
      <div className={styles.thumb}>
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.title} className={styles.img} />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderIndex}>{project.index}</span>
          </div>
        )}
        <div className={styles.overlay}>
          <p className={styles.overlayTitle}>{project.title.replace('\n', ' ')}</p>
          <div className={styles.overlayRoles}>
            {project.roles.map((r) => (
              <span key={r} className="tag">{r}</span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.meta}>
        <span className={styles.metaIndex}>{project.index}</span>
        <div className={styles.metaMain}>
          <h3 className={styles.title}>{project.title.split('\n')[0]}</h3>
          {project.subtitle && (
            <p className={styles.subtitle}>{project.subtitle}</p>
          )}
        </div>
        <span className={styles.year}>{project.year}</span>
      </div>
    </Link>
  );
}
