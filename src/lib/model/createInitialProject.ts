import { emptyDoc } from '../editor/editorSerialization';
import { PROJECT_FILE_APP, PROJECT_FILE_SCHEMA_VERSION } from '../storage/projectFileFormat';
import type { ID } from './ids';
import type { KoheletProjectFile } from './project';

export type CreateInitialProjectOptions = {
  now?: Date;
  storyWorldId?: ID;
  workId?: ID;
  sceneId?: ID;
  storyWorldTitle?: string;
  workTitle?: string;
  sceneTitle?: string;
};

export function createInitialProject(options: CreateInitialProjectOptions = {}): KoheletProjectFile {
  const savedAt = (options.now ?? new Date()).toISOString();
  const storyWorldId = options.storyWorldId ?? 'storyworld-initial';
  const workId = options.workId ?? 'work-initial';
  const sceneId = options.sceneId ?? 'scene-initial';

  return {
    app: PROJECT_FILE_APP,
    schemaVersion: PROJECT_FILE_SCHEMA_VERSION,
    savedAt,
    storyWorld: {
      id: storyWorldId,
      title: options.storyWorldTitle ?? 'Nuevo mundo narrativo',
      type: 'standalone',
      works: [
        {
          id: workId,
          storyWorldId,
          title: options.workTitle ?? 'Nueva obra',
          order: 0,
          type: 'novel',
          structureMode: 'scene_only',
          parts: [],
          chapters: [],
          scenes: [
            {
              id: sceneId,
              workId,
              title: options.sceneTitle ?? 'Escena inicial',
              order: 0,
              type: 'free',
              involvedCharacterIds: [],
              plotLineIds: [],
              referenceIds: [],
              status: 'draft',
              content: emptyDoc,
              createdAt: savedAt,
              updatedAt: savedAt,
            },
          ],
          status: 'draft',
          createdAt: savedAt,
          updatedAt: savedAt,
        },
      ],
      characters: [],
      places: [],
      plotLines: [],
      notes: [],
      references: [],
      continuityNotes: [],
      settings: {
        locale: 'es-AR',
      },
      createdAt: savedAt,
      updatedAt: savedAt,
    },
  };
}
