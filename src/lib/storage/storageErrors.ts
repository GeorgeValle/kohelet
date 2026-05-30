export type StorageErrorCategory = 'invalid_schema' | 'unsupported_schema_version' | 'read_failed' | 'write_failed';

export class KoheletStorageError extends Error {
  readonly category: StorageErrorCategory;
  readonly details?: unknown;

  constructor(category: StorageErrorCategory, message: string, details?: unknown) {
    super(message);
    this.name = 'KoheletStorageError';
    this.category = category;
    this.details = details;
  }
}

export function invalidSchema(message: string, details?: unknown): KoheletStorageError {
  return new KoheletStorageError('invalid_schema', message, details);
}

export function unsupportedSchemaVersion(version: unknown): KoheletStorageError {
  return new KoheletStorageError('unsupported_schema_version', 'Unsupported Kohelet project schema version.', { version });
}

export function readFailed(message: string, details?: unknown): KoheletStorageError {
  return new KoheletStorageError('read_failed', message, details);
}

export function writeFailed(message: string, details?: unknown): KoheletStorageError {
  return new KoheletStorageError('write_failed', message, details);
}
