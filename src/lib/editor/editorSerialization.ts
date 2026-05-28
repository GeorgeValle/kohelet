export type RichTextContent = { type: 'doc'; content: unknown[] };
export const emptyDoc = (): RichTextContent => ({ type: 'doc', content: [{ type: 'paragraph' }] });
export const normalizeDoc = (input: unknown): RichTextContent => (typeof input === 'object' && input !== null && (input as { type?: string }).type === 'doc' ? (input as RichTextContent) : emptyDoc());
