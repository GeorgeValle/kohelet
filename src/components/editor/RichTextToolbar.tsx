import type { Editor } from '@tiptap/react';
import {
  canRedo,
  canUndo,
  isBoldActive,
  isHeadingActive,
  isItalicActive,
  isParagraphActive,
  redo,
  setParagraph,
  toggleBold,
  toggleHeading,
  toggleItalic,
  undo,
} from '../../lib/editor/editorCommands';
import { t } from '../../i18n/i18n';
import styles from './RichTextToolbar.module.css';

type RichTextToolbarProps = {
  editor: Editor | null;
};

type ToolbarButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  pressed?: boolean;
};

function ToolbarButton({ label, onClick, disabled = false, pressed }: ToolbarButtonProps) {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      aria-pressed={pressed}
    >
      {label}
    </button>
  );
}

export function RichTextToolbar({ editor }: RichTextToolbarProps) {
  return (
    <div className={styles.toolbar} role="toolbar" aria-label={t('editor.toolbar.label')}>
      <div className={styles.group}>
        <ToolbarButton
          label={t('editor.toolbar.paragraph')}
          onClick={() => setParagraph(editor)}
          pressed={isParagraphActive(editor)}
        />
        <ToolbarButton
          label={t('editor.toolbar.heading')}
          onClick={() => toggleHeading(editor)}
          pressed={isHeadingActive(editor)}
        />
      </div>
      <div className={styles.group}>
        <ToolbarButton
          label={t('editor.toolbar.bold')}
          onClick={() => toggleBold(editor)}
          pressed={isBoldActive(editor)}
        />
        <ToolbarButton
          label={t('editor.toolbar.italic')}
          onClick={() => toggleItalic(editor)}
          pressed={isItalicActive(editor)}
        />
      </div>
      <div className={styles.group}>
        <ToolbarButton label={t('editor.toolbar.undo')} onClick={() => undo(editor)} disabled={!canUndo(editor)} />
        <ToolbarButton label={t('editor.toolbar.redo')} onClick={() => redo(editor)} disabled={!canRedo(editor)} />
      </div>
    </div>
  );
}
