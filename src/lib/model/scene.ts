import type { ID, ISODateString } from './ids';

export type SceneStatus = 'planned' | 'draft' | 'revision' | 'final';

export type SceneType = 'conflict' | 'revelation' | 'decision' | 'tension' | 'transition' | 'reaction' | 'free';

export type Scene = {
  id: ID;
  workId: ID;
  partId?: ID;
  chapterId?: ID;
  title: string;
  order: number;
  type: SceneType;
  customTypeLabel?: string;
  synopsis?: string;
  goal?: string;
  conflict?: string;
  outcome?: string;
  povCharacterId?: ID;
  placeId?: ID;
  timelineLabel?: string;
  involvedCharacterIds: ID[];
  plotLineIds: ID[];
  referenceIds: ID[];
  notes?: string;
  wordGoal?: number;
  status: SceneStatus;
  content: unknown;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};
