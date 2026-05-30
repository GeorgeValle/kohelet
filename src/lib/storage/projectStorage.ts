import type { KoheletProjectFile } from '../model/project';
import { migrateProjectFile } from './migrations';
import { parseProjectFile, serializeProjectFile } from './projectFileFormat';
import { validateProjectFile } from './projectValidation';
import { writeFailed } from './storageErrors';

export type ProjectFileWriter = {
  writeProjectFile: (serializedProjectFile: string) => Promise<void> | void;
};

export function openProjectFromText(raw: string): KoheletProjectFile {
  const parsed = parseProjectFile(raw);
  const migrated = migrateProjectFile(parsed);

  return validateProjectFile(migrated);
}

export function prepareProjectForSave(projectFile: KoheletProjectFile): string {
  const validated = validateProjectFile(projectFile);

  return serializeProjectFile(validated);
}

export async function saveProjectFile(projectFile: KoheletProjectFile, writer: ProjectFileWriter): Promise<void> {
  const serialized = prepareProjectForSave(projectFile);

  try {
    await writer.writeProjectFile(serialized);
  } catch (error) {
    throw writeFailed('Project file could not be written by the storage boundary.', error);
  }
}
