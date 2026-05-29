import { useMemo, useState } from 'react';
import { useEditor } from '@tiptap/react';
import type { JSONContent } from '@tiptap/react';
import { editorExtensions } from '../../lib/editor/editorExtensions';
import { normalizeDoc } from '../../lib/editor/editorSerialization';
import { wordCountFromText } from '../../lib/writing/wordCount';
import { t } from '../../i18n/i18n';
import { EditorStatusBar } from './EditorStatusBar';
import { RichTextEditor } from './RichTextEditor';
import { RichTextToolbar } from './RichTextToolbar';
import styles from './EditorShell.module.css';

type EditorShellProps = {
  sceneTitle: string;
  initialContent?: unknown;
};

export function EditorShell({ sceneTitle, initialContent }: EditorShellProps) {
  const content = useMemo(() => normalizeDoc(initialContent), [initialContent]);
  const [wordCount, setWordCount] = useState(() => wordCountFromContent(content));
  const [isEmpty, setIsEmpty] = useState(() => !extractText(content));

  const editor = useEditor({
    extensions: editorExtensions,
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        'aria-label': t('editor.title'),
      },
    },
    onUpdate: ({ editor: activeEditor }) => {
      setWordCount(wordCountFromText(activeEditor.getText()));
      setIsEmpty(activeEditor.isEmpty);
    },
  });

  return (
    <section className={styles.shell} aria-labelledby="sofer-editor-title">
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>{t('editor.title')}</p>
          <h2 className={styles.title} id="sofer-editor-title">
            {sceneTitle}
          </h2>
        </div>
      </header>
      <RichTextToolbar editor={editor} />
      <RichTextEditor
        editor={editor}
        label={t('editor.title')}
        placeholder={t('editor.placeholder')}
        isEmpty={isEmpty}
      />
      <EditorStatusBar wordCount={wordCount} />
    </section>
  );
}

function wordCountFromContent(content: JSONContent): number {
  return wordCountFromText(extractText(content));
}

function extractText(content: JSONContent): string {
  const text = typeof content.text === 'string' ? content.text : '';
  const childText = Array.isArray(content.content) ? content.content.map(extractText).join(' ') : '';

  return `${text} ${childText}`.trim();
}
