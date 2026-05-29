import { EditorShell } from '../editor/EditorShell';
import { t } from '../../i18n/i18n';
import styles from './WritingWorkspace.module.css';

export function WritingWorkspace() {
  return (
    <main className={styles.workspace} aria-label={t('app.title')}>
      <header className={styles.header}>
        <div>
          <p className={styles.editorName}>{t('editor.title')}</p>
          <h1 className={styles.appTitle}>{t('app.title')}</h1>
        </div>
        <div className={styles.sceneMeta} aria-label={t('editor.sceneLabel')}>
          <span className={styles.sceneLabel}>{t('editor.sceneLabel')}</span>
          <strong>{t('editor.mockSceneTitle')}</strong>
        </div>
      </header>
      <EditorShell sceneTitle={t('editor.mockSceneTitle')} />
    </main>
  );
}
