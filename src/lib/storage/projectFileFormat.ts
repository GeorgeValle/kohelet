import type { KoheletProjectFile } from '../model/project';
import { readFailed } from './storageErrors';

export const PROJECT_FILE_APP = 'kohelet';
export const PROJECT_FILE_SCHEMA_VERSION = 1;

export function serializeProjectFile(projectFile: KoheletProjectFile): string {
  return `${JSON.stringify(sortObjectKeys(projectFile), null, 2)}\n`;
}

export function parseProjectFile(raw: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch (error) {
    throw readFailed('Project file is not valid JSON.', error);
  }
}

function sortObjectKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortObjectKeys);
  }

  if (!isRecord(value)) {
    return value;
  }

  return Object.keys(value)
    .sort()
    .reduce<Record<string, unknown>>((sorted, key) => {
      sorted[key] = sortObjectKeys(value[key]);
      return sorted;
    }, {});
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
