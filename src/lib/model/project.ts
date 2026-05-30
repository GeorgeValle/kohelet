import type { ISODateString } from './ids';
import type { StoryWorld } from './storyWorld';

export type KoheletProjectFile = {
  app: 'kohelet';
  schemaVersion: 1;
  appVersion?: string;
  savedAt: ISODateString;
  storyWorld: StoryWorld;
};

export type { ID, ISODateString } from './ids';
export type { Scene, SceneStatus, SceneType } from './scene';
export type { Chapter, Part, StoryWorld, StoryWorldType, StructureMode, Work, WorkType } from './storyWorld';
