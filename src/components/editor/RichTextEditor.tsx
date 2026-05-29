import { EditorContent, type Editor } from '@tiptap/react';
import styles from './RichTextEditor.module.css';

type RichTextEditorProps = {
  editor: Editor | null;
  label: string;
  placeholder: string;
  isEmpty: boolean;
};

export function RichTextEditor({ editor, label, placeholder, isEmpty }: RichTextEditorProps) {
  return (
    <section className={styles.surface} aria-label={label}>
      {isEmpty ? <p className={styles.placeholder}>{placeholder}</p> : null}
      <EditorContent editor={editor} className={styles.editor} aria-label={label} />
    </section>
  );
}
