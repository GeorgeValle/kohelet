import { t } from '../../i18n/i18n';
export const EditorStatusBar=({words}:{words:number})=><footer>{t('editor.status.saved')} · {t('editor.status.words',{count:words})}</footer>;
