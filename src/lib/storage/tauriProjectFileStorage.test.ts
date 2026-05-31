import { describe, expect, it, vi } from 'vitest';
import { createInitialProject } from '../model/createInitialProject';
import { openProjectFromPath, saveProjectToPath, type TauriProjectFileInvoker } from './tauriProjectFileStorage';

const now = new Date('2026-05-30T00:00:00.000Z');

function makeProject() {
  return createInitialProject({ now });
}

describe('tauri project file storage boundary', () => {
  it('opens a project by reading raw text through a Tauri command', async () => {
    const project = makeProject();
    const serialized = JSON.stringify(project);
    const invoker = vi.fn<TauriProjectFileInvoker>(async () => serialized);

    const opened = await openProjectFromPath('/safe/story.kohelet', invoker);

    expect(invoker).toHaveBeenCalledWith('read_project_file_text', { path: '/safe/story.kohelet' });
    expect(opened.storyWorld.id).toBe(project.storyWorld.id);
  });

  it('saves a validated project by writing serialized text through a Tauri command', async () => {
    const invoker = vi.fn<TauriProjectFileInvoker>(async () => undefined);

    await saveProjectToPath('/safe/story.kohelet', makeProject(), invoker);

    expect(invoker).toHaveBeenCalledOnce();
    expect(invoker).toHaveBeenCalledWith(
      'write_project_file_text',
      expect.objectContaining({
        path: '/safe/story.kohelet',
        contents: expect.stringContaining('"app": "kohelet"'),
      }),
    );
  });

  it('maps Tauri not_found read failures to typed storage errors', async () => {
    const invoker = vi.fn<TauriProjectFileInvoker>(async () => {
      throw { code: 'not_found', message: 'missing file', path: '/missing/story.kohelet' };
    });

    await expect(openProjectFromPath('/missing/story.kohelet', invoker)).rejects.toMatchObject({
      category: 'file_not_found',
    });
  });

  it('maps Tauri permission write failures to typed storage errors', async () => {
    const invoker = vi.fn<TauriProjectFileInvoker>(async () => {
      throw { code: 'permission_denied', message: 'readonly', path: '/readonly/story.kohelet' };
    });

    await expect(saveProjectToPath('/readonly/story.kohelet', makeProject(), invoker)).rejects.toMatchObject({
      category: 'permission_denied',
    });
  });
});
