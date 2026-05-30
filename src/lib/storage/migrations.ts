import { PROJECT_FILE_SCHEMA_VERSION } from './projectFileFormat';
import { invalidSchema, unsupportedSchemaVersion } from './storageErrors';

type VersionedProjectCandidate = {
  schemaVersion: unknown;
};

export function migrateProjectFile(candidate: unknown): unknown {
  const versioned = readSchemaVersion(candidate);

  if (versioned.schemaVersion === PROJECT_FILE_SCHEMA_VERSION) {
    return candidate;
  }

  if (typeof versioned.schemaVersion === 'number' && versioned.schemaVersion > PROJECT_FILE_SCHEMA_VERSION) {
    throw unsupportedSchemaVersion(versioned.schemaVersion);
  }

  throw unsupportedSchemaVersion(versioned.schemaVersion);
}

function readSchemaVersion(candidate: unknown): VersionedProjectCandidate {
  if (!isRecord(candidate) || !('schemaVersion' in candidate)) {
    throw invalidSchema('Project file is missing schemaVersion.');
  }

  return { schemaVersion: candidate.schemaVersion };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
