import type { ID, ISODateString } from './ids';
import type { Scene, SceneStatus } from './scene';

export type StoryWorldType =
  | 'standalone'
  | 'trilogy'
  | 'saga'
  | 'series'
  | 'anthology'
  | 'shared_universe'
  | 'custom';

export type WorkType = 'short_story' | 'novella' | 'light_novel' | 'novel' | 'long_novel' | 'custom';

export type StructureMode = 'scene_only' | 'chapters_and_scenes' | 'parts_chapters_and_scenes' | 'custom';

export type NarrativeCore = {
  dramaticPremise?: string;
  authorPremise?: string;
  centralQuestion?: string;
  mainTheme?: string;
  centralConflict?: string;
  narrativePromise?: string;
  expectedResolution?: string;
  logline?: string;
};

export type ProjectSettings = {
  locale: 'es-AR';
};

export type Part = {
  id: ID;
  workId: ID;
  title: string;
  order: number;
  summary?: string;
  chapterIds: ID[];
  status: SceneStatus;
};

export type Chapter = {
  id: ID;
  workId: ID;
  partId?: ID;
  title: string;
  order: number;
  summary?: string;
  sceneIds: ID[];
  status: SceneStatus;
};

export type Work = {
  id: ID;
  storyWorldId: ID;
  title: string;
  order: number;
  type: WorkType;
  structureMode: StructureMode;
  narrativeCore?: NarrativeCore;
  parts: Part[];
  chapters: Chapter[];
  scenes: Scene[];
  wordGoal?: number;
  status: SceneStatus;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type StoryWorld = {
  id: ID;
  title: string;
  description?: string;
  type: StoryWorldType;
  narrativeCore?: NarrativeCore;
  works: Work[];
  characters: unknown[];
  places: unknown[];
  plotLines: unknown[];
  notes: unknown[];
  references: unknown[];
  continuityNotes: unknown[];
  settings: ProjectSettings;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};
