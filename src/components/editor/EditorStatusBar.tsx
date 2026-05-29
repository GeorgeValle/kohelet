import { t } from '../../i18n/i18n';
import styles from './EditorStatusBar.module.css';

type EditorStatusBarProps = {
  wordCount: number;
};

export function EditorStatusBar({ wordCount }: EditorStatusBarProps) {
  return (
    <footer className={styles.statusBar} aria-label={t('editor.status.label')}>
      <span>{t('editor.status.saved')}</span>
      <span>{t('editor.status.words', { count: wordCount })}</span>
    </footer>
  );
}
