import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import styles from './Nav.module.css';

export default function Nav({ theme, onToggleTheme }) {
  const { pathname } = useLocation();

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.brand} data-cursor="">
        <span className={styles.name}>Gal Michalevicz</span>
        <span className={styles.title}>3D Animator</span>
      </Link>

      <div className={styles.right}>
        <ul className={styles.links}>
          <li>
            <Link
              to="/"
              className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
              data-cursor=""
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`${styles.link} ${pathname === '/about' ? styles.active : ''}`}
              data-cursor=""
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`${styles.link} ${pathname === '/contact' ? styles.active : ''}`}
              data-cursor=""
            >
              Contact
            </Link>
          </li>
        </ul>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </nav>
  );
}
