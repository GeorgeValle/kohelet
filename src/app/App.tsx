import { t } from '../i18n/i18n';
import styles from './App.module.css';

export function App() {
  return (
    <main className={styles.root} aria-label={t('app.shellLabel')}>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>{t('app.editorName')}</p>
        <h1 className={styles.title}>Kohelet</h1>
        <p className={styles.subtitle}>{t('app.tagline')}</p>
        <p className={styles.status}>{t('app.foundationStatus')}</p>
      </section>
    </main>
  );
}
