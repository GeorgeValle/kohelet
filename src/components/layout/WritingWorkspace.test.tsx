import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { t } from '../../i18n/i18n';
import { WritingWorkspace } from './WritingWorkspace';

vi.mock('@tiptap/starter-kit', () => ({
  default: {
    configure: () => ({}),
  },
}));

vi.mock('@tiptap/react', () => ({
  EditorContent: ({ className, 'aria-label': ariaLabel }: { className?: string; 'aria-label'?: string }) => (
    <div className={className} aria-label={ariaLabel} contentEditable suppressContentEditableWarning />
  ),
  useEditor: () => ({
    getText: () => '',
    chain: () => ({
      focus: () => ({
        setParagraph: () => ({ run: () => true }),
        toggleHeading: () => ({ run: () => true }),
        toggleBold: () => ({ run: () => true }),
        toggleItalic: () => ({ run: () => true }),
        undo: () => ({ run: () => true }),
        redo: () => ({ run: () => true }),
      }),
    }),
    can: () => ({ undo: () => false, redo: () => false }),
    isActive: () => false,
  }),
}));

describe('WritingWorkspace', () => {
  it('renders the minimal Sofer writing workspace', () => {
    render(<WritingWorkspace />);

    expect(screen.getByRole('main', { name: t('app.title') })).toBeTruthy();
    expect(screen.getByRole('heading', { name: t('app.title'), level: 1 })).toBeTruthy();
    expect(screen.getByRole('heading', { name: t('editor.mockSceneTitle'), level: 2 })).toBeTruthy();
    expect(screen.getByRole('toolbar', { name: t('editor.toolbar.label') })).toBeTruthy();
    expect(screen.getByText(t('editor.placeholder'))).toBeTruthy();
    expect(screen.getByText(t('editor.status.words', { count: 0 }))).toBeTruthy();
  });
});
