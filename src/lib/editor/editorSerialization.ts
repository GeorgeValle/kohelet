import type { Editor, JSONContent } from '@tiptap/react';

export const emptyDoc: JSONContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
    },
  ],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function normalizeDoc(content: unknown): JSONContent {
  if (!isRecord(content) || content.type !== 'doc') {
    return emptyDoc;
  }

  if ('content' in content && !Array.isArray(content.content)) {
    return emptyDoc;
  }

  return content as JSONContent;
}

export function getEditorJson(editor: Editor | null | undefined): JSONContent {
  if (!editor) {
    return emptyDoc;
  }

  return normalizeDoc(editor.getJSON());
}
