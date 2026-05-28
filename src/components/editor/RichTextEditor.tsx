import { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';

import { editorExtensions } from '../../lib/editor/editorExtensions';
import { emptyDoc } from '../../lib/editor/editorSerialization';
import styles from './RichTextEditor.module.css';

export const RichTextEditor = ({
  onReady,
}: {
  onReady: (editor: ReturnType<typeof useEditor>) => void;
}) => {
  const editor = useEditor({
    extensions: editorExtensions,
    content: emptyDoc(),
  });

  useEffect(() => {
    onReady(editor);
  }, [editor, onReady]);

  return (
    <div className={styles.root}>
      <EditorContent editor={editor} />
    </div>
  );
};
