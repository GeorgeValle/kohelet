import type { KoheletProjectFile } from '../model/project';
import type { SceneStatus, SceneType } from '../model/scene';
import type { StoryWorldType, StructureMode, WorkType } from '../model/storyWorld';
import { PROJECT_FILE_APP, PROJECT_FILE_SCHEMA_VERSION } from './projectFileFormat';
import { invalidSchema, unsupportedSchemaVersion } from './storageErrors';

const STORY_WORLD_TYPES = ['standalone', 'trilogy', 'saga', 'series', 'anthology', 'shared_universe', 'custom'] as const;
const WORK_TYPES = ['short_story', 'novella', 'light_novel', 'novel', 'long_novel', 'custom'] as const;
const STRUCTURE_MODES = ['scene_only', 'chapters_and_scenes', 'parts_chapters_and_scenes', 'custom'] as const;
const SCENE_TYPES = ['conflict', 'revelation', 'decision', 'tension', 'transition', 'reaction', 'free'] as const;
const SCENE_STATUSES = ['planned', 'draft', 'revision', 'final'] as const;

export function validateProjectFile(candidate: unknown): KoheletProjectFile {
  const projectFile = requireRecord(candidate, 'Project file must be an object.');

  if (projectFile.app !== PROJECT_FILE_APP) {
    throw invalidSchema('Project file app must be kohelet.', { app: projectFile.app });
  }

  if (projectFile.schemaVersion !== PROJECT_FILE_SCHEMA_VERSION) {
    if (typeof projectFile.schemaVersion === 'number' && projectFile.schemaVersion > PROJECT_FILE_SCHEMA_VERSION) {
      throw unsupportedSchemaVersion(projectFile.schemaVersion);
    }

    throw invalidSchema('Project file schemaVersion must be 1.', { schemaVersion: projectFile.schemaVersion });
  }

  requireString(projectFile.savedAt, 'Project file savedAt must be a string.');
  const storyWorld = requireRecord(projectFile.storyWorld, 'Project file storyWorld must be an object.');
  requireString(storyWorld.id, 'StoryWorld id must be a string.');
  requireString(storyWorld.title, 'StoryWorld title must be a string.');
  requireEnum<StoryWorldType>(storyWorld.type, STORY_WORLD_TYPES, 'StoryWorld type is invalid.');
  requireRecord(storyWorld.settings, 'StoryWorld settings must be an object.');
  const works = requireArray(storyWorld.works, 'StoryWorld works must be an array.');
  const workIds = new Set<string>();

  for (const [workIndex, workValue] of works.entries()) {
    const work = requireRecord(workValue, `Work at index ${workIndex} must be an object.`);
    const workId = requireString(work.id, `Work at index ${workIndex} id must be a string.`);
    workIds.add(workId);
    requireString(work.storyWorldId, `Work ${workId} storyWorldId must be a string.`);
    requireString(work.title, `Work ${workId} title must be a string.`);
    requireNumber(work.order, `Work ${workId} order must be a number.`);
    requireEnum<WorkType>(work.type, WORK_TYPES, `Work ${workId} type is invalid.`);
    requireEnum<StructureMode>(work.structureMode, STRUCTURE_MODES, `Work ${workId} structureMode is invalid.`);
    requireArray(work.parts, `Work ${workId} parts must be an array.`);
    requireArray(work.chapters, `Work ${workId} chapters must be an array.`);
    requireEnum<SceneStatus>(work.status, SCENE_STATUSES, `Work ${workId} status is invalid.`);
    const scenes = requireArray(work.scenes, `Work ${workId} scenes must be an array.`);

    for (const [sceneIndex, sceneValue] of scenes.entries()) {
      const scene = requireRecord(sceneValue, `Scene at index ${sceneIndex} in Work ${workId} must be an object.`);
      requireString(scene.id, `Scene at index ${sceneIndex} id must be a string.`);
      const sceneWorkId = requireString(scene.workId, `Scene ${String(scene.id)} workId must be a string.`);
      if (sceneWorkId !== workId) {
        throw invalidSchema('Scene workId must match its containing Work.', {
          sceneId: scene.id,
          sceneWorkId,
          containingWorkId: workId,
        });
      }
      requireString(scene.title, `Scene ${String(scene.id)} title must be a string.`);
      requireNumber(scene.order, `Scene ${String(scene.id)} order must be a number.`);
      requireEnum<SceneType>(scene.type, SCENE_TYPES, `Scene ${String(scene.id)} type is invalid.`);
      requireEnum<SceneStatus>(scene.status, SCENE_STATUSES, `Scene ${String(scene.id)} status is invalid.`);
      requirePresent(scene, 'content', `Scene ${String(scene.id)} content is required.`);
      requireSerializable(scene.content, `Scene ${String(scene.id)} content must be serializable.`);
    }
  }

  for (const workValue of works) {
    const work = workValue as Record<string, unknown>;
    const scenes = work.scenes as unknown[];

    for (const sceneValue of scenes) {
      const scene = sceneValue as Record<string, unknown>;
      if (!workIds.has(scene.workId as string)) {
        throw invalidSchema('Scene workId must point to an existing Work.', {
          sceneId: scene.id,
          workId: scene.workId,
        });
      }
    }
  }

  return candidate as KoheletProjectFile;
}

function requireRecord(value: unknown, message: string): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw invalidSchema(message);
  }

  return value as Record<string, unknown>;
}

function requireString(value: unknown, message: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    throw invalidSchema(message, { value });
  }

  return value;
}

function requireNumber(value: unknown, message: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw invalidSchema(message, { value });
  }

  return value;
}

function requireArray(value: unknown, message: string): unknown[] {
  if (!Array.isArray(value)) {
    throw invalidSchema(message, { value });
  }

  return value;
}

function requireEnum<T extends string>(value: unknown, values: readonly T[], message: string): T {
  if (typeof value !== 'string' || !values.includes(value as T)) {
    throw invalidSchema(message, { value });
  }

  return value as T;
}

function requirePresent(record: Record<string, unknown>, key: string, message: string): void {
  if (!(key in record)) {
    throw invalidSchema(message);
  }
}

function requireSerializable(value: unknown, message: string): void {
  try {
    const serialized = JSON.stringify(value);
    if (serialized === undefined) {
      throw new TypeError('Value serializes to undefined.');
    }
  } catch (error) {
    throw invalidSchema(message, error);
  }
}
