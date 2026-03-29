import styles from './ThemeToggle.module.css';

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      className={styles.toggle}
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      data-cursor=""
    >
      <span className={styles.indicator} data-theme-active={theme} />
      <span className={styles.label}>{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
}
