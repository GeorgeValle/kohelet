import { describe, expect, it, vi } from 'vitest';
import { emptyDoc } from '../editor/editorSerialization';
import { createInitialProject } from '../model/createInitialProject';
import type { KoheletProjectFile } from '../model/project';
import { migrateProjectFile } from './migrations';
import { PROJECT_FILE_APP, PROJECT_FILE_SCHEMA_VERSION, parseProjectFile, serializeProjectFile } from './projectFileFormat';
import { openProjectFromText, prepareProjectForSave, saveProjectFile } from './projectStorage';
import { validateProjectFile } from './projectValidation';
import { KoheletStorageError } from './storageErrors';

const now = new Date('2026-05-30T00:00:00.000Z');

function makeProject(): KoheletProjectFile {
  return createInitialProject({ now });
}

describe('project local storage', () => {
  it('serializes a valid project with an empty scene as readable JSON', () => {
    const serialized = serializeProjectFile(makeProject());

    expect(serialized).toContain(`"app": "${PROJECT_FILE_APP}"`);
    expect(serialized).toContain(`"schemaVersion": ${PROJECT_FILE_SCHEMA_VERSION}`);
    expect(serialized).toContain('"content": {');
    expect(serialized).toContain('\n  "app"');
    expect(serialized.endsWith('\n')).toBe(true);
  });

  it('parses and validates a valid .kohelet project file', () => {
    const project = openProjectFromText(serializeProjectFile(makeProject()));

    expect(project.app).toBe(PROJECT_FILE_APP);
    expect(project.schemaVersion).toBe(PROJECT_FILE_SCHEMA_VERSION);
    expect(project.storyWorld.works[0]?.scenes[0]?.content).toEqual(emptyDoc);
  });

  it('rejects an incorrect app value', () => {
    const invalidProject = { ...makeProject(), app: 'other-app' };

    expect(() => validateProjectFile(invalidProject)).toThrow(KoheletStorageError);
    expect(() => validateProjectFile(invalidProject)).toThrow(/app must be kohelet/);
  });

  it('rejects a future schemaVersion before mutating the project', () => {
    const futureProject = { ...makeProject(), schemaVersion: PROJECT_FILE_SCHEMA_VERSION + 1 };

    expect(() => migrateProjectFile(futureProject)).toThrow(KoheletStorageError);
    expect(() => openProjectFromText(JSON.stringify(futureProject))).toThrow(/Unsupported Kohelet project schema version/);
  });

  it('rejects a scene without content', () => {
    const project = makeProject();
    const scene = project.storyWorld.works[0]?.scenes[0];
    if (!scene) {
      throw new Error('Test project must include a scene.');
    }
    const sceneWithoutContent = { ...scene } as Partial<typeof scene>;
    delete sceneWithoutContent.content;
    project.storyWorld.works[0]!.scenes = [sceneWithoutContent as typeof scene];

    expect(() => validateProjectFile(project)).toThrow(/content is required/);
  });

  it('preserves structured Scene.content during a roundtrip', () => {
    const project = makeProject();
    const content = {
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Texto seguro' }] }],
    };
    project.storyWorld.works[0]!.scenes[0]!.content = content;

    const roundtripped = openProjectFromText(prepareProjectForSave(project));

    expect(roundtripped.storyWorld.works[0]?.scenes[0]?.content).toEqual(content);
  });

  it('rejects a scene whose workId does not point to an existing Work', () => {
    const project = makeProject();
    project.storyWorld.works[0]!.scenes[0]!.workId = 'missing-work';

    expect(() => validateProjectFile(project)).toThrow(/workId must match its containing Work/);
  });

  it('rejects a scene whose workId points to a different existing containing Work', () => {
    const project = makeProject();
    const firstWork = project.storyWorld.works[0];
    if (!firstWork) {
      throw new Error('Test project must include a first Work.');
    }
    const secondWork = {
      ...firstWork,
      id: 'work-second',
      order: 1,
      scenes: [],
    };
    project.storyWorld.works = [firstWork, secondWork];
    firstWork.scenes[0]!.workId = secondWork.id;

    expect(() => validateProjectFile(project)).toThrow(/workId must match its containing Work/);
  });

  it('rejects scene content that cannot be serialized', () => {
    const project = makeProject();
    const circularContent: Record<string, unknown> = { type: 'doc' };
    circularContent.self = circularContent;
    project.storyWorld.works[0]!.scenes[0]!.content = circularContent;

    expect(() => validateProjectFile(project)).toThrow(/content must be serializable/);
  });

  it('maps validation failures to typed invalid_schema errors', () => {
    try {
      validateProjectFile({ app: PROJECT_FILE_APP, schemaVersion: PROJECT_FILE_SCHEMA_VERSION });
      throw new Error('Expected validation to fail.');
    } catch (error) {
      expect(error).toBeInstanceOf(KoheletStorageError);
      expect((error as KoheletStorageError).category).toBe('invalid_schema');
    }
  });

  it('confirms that the initial factory creates a valid KoheletProjectFile', () => {
    const project = validateProjectFile(makeProject());

    expect(project.app).toBe(PROJECT_FILE_APP);
    expect(project.storyWorld.works).toHaveLength(1);
    expect(project.storyWorld.works[0]?.scenes).toHaveLength(1);
    expect(project.storyWorld.works[0]?.scenes[0]?.content).toEqual(emptyDoc);
  });

  it('wraps writer failures at the filesystem boundary', async () => {
    const writer = {
      writeProjectFile: vi.fn(() => {
        throw new Error('disk unavailable');
      }),
    };

    await expect(saveProjectFile(makeProject(), writer)).rejects.toMatchObject({ category: 'write_failed' });
    expect(writer.writeProjectFile).toHaveBeenCalledOnce();
  });

  it('parses raw JSON into unknown before validation', () => {
    const parsed = parseProjectFile(serializeProjectFile(makeProject()));

    expect(validateProjectFile(parsed).app).toBe(PROJECT_FILE_APP);
  });
});
