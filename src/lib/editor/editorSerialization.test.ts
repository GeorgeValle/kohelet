import { describe, expect, it } from 'vitest';
import { emptyDoc, getEditorJson, normalizeDoc } from './editorSerialization';

describe('editorSerialization', () => {
  it('provides a valid empty Tiptap document', () => {
    expect(emptyDoc).toEqual({
      type: 'doc',
      content: [{ type: 'paragraph' }],
    });
  });

  it('normalizes invalid content to the empty document', () => {
    expect(normalizeDoc(undefined)).toBe(emptyDoc);
    expect(normalizeDoc({ type: 'paragraph' })).toBe(emptyDoc);
    expect(normalizeDoc({ type: 'doc', content: 'invalid' })).toBe(emptyDoc);
  });

  it('keeps structured document JSON', () => {
    const doc = {
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Una escena' }] }],
    };

    expect(normalizeDoc(doc)).toBe(doc);
  });

  it('returns an empty document when the editor is missing', () => {
    expect(getEditorJson(null)).toBe(emptyDoc);
  });
});
