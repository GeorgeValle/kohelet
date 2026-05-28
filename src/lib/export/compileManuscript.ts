import type { Scene } from '../model/sceneModel';

export const compileManuscript = (scenes: Scene[]) =>
  [...scenes]
    .sort((a, b) => a.order - b.order)
    .map((scene) => `# ${scene.title}\n${scene.content.content.length ? '...' : ''}`)
    .join('\n\n');
