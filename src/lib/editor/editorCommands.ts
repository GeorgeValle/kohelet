import type { Editor } from '@tiptap/react';

function focus(editor: Editor | null) {
  return editor?.chain().focus();
}

export function setParagraph(editor: Editor | null): void {
  focus(editor)?.setParagraph().run();
}

export function toggleHeading(editor: Editor | null): void {
  focus(editor)?.toggleHeading({ level: 2 }).run();
}

export function toggleBold(editor: Editor | null): void {
  focus(editor)?.toggleBold().run();
}

export function toggleItalic(editor: Editor | null): void {
  focus(editor)?.toggleItalic().run();
}

export function undo(editor: Editor | null): void {
  focus(editor)?.undo().run();
}

export function redo(editor: Editor | null): void {
  focus(editor)?.redo().run();
}

export function canUndo(editor: Editor | null): boolean {
  return editor?.can().undo() ?? false;
}

export function canRedo(editor: Editor | null): boolean {
  return editor?.can().redo() ?? false;
}

export function isParagraphActive(editor: Editor | null): boolean {
  return editor?.isActive('paragraph') ?? false;
}

export function isHeadingActive(editor: Editor | null): boolean {
  return editor?.isActive('heading', { level: 2 }) ?? false;
}

export function isBoldActive(editor: Editor | null): boolean {
  return editor?.isActive('bold') ?? false;
}

export function isItalicActive(editor: Editor | null): boolean {
  return editor?.isActive('italic') ?? false;
}
