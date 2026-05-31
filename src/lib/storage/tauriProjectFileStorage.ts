import { invoke } from '@tauri-apps/api/core';
import type { KoheletProjectFile } from '../model/project';
import { openProjectFromText, saveProjectFile } from './projectStorage';
import { fileNotFound, KoheletStorageError, permissionDenied, readFailed, writeFailed } from './storageErrors';

export type TauriProjectFileCommand = 'read_project_file_text' | 'write_project_file_text';

export type TauriProjectFileInvoker = <T>(command: TauriProjectFileCommand, args: Record<string, unknown>) => Promise<T>;

type TauriProjectFileErrorCode = 'not_found' | 'permission_denied' | 'invalid_path' | 'read_failed' | 'write_failed';

type TauriProjectFileCommandError = {
  code: TauriProjectFileErrorCode;
  message?: string;
  path?: string;
};

const defaultInvoker: TauriProjectFileInvoker = (command, args) => invoke(command, args);

export async function openProjectFromPath(
  path: string,
  invoker: TauriProjectFileInvoker = defaultInvoker,
): Promise<KoheletProjectFile> {
  let rawProjectFile: string;

  try {
    rawProjectFile = await invoker<string>('read_project_file_text', { path });
  } catch (error) {
    throw mapTauriReadError(error, path);
  }

  return openProjectFromText(rawProjectFile);
}

export async function saveProjectToPath(
  path: string,
  projectFile: KoheletProjectFile,
  invoker: TauriProjectFileInvoker = defaultInvoker,
): Promise<void> {
  await saveProjectFile(projectFile, {
    writeProjectFile: async (serializedProjectFile) => {
      try {
        await invoker<void>('write_project_file_text', { path, contents: serializedProjectFile });
      } catch (error) {
        throw mapTauriWriteError(error, path);
      }
    },
  });
}

function mapTauriReadError(error: unknown, path: string): KoheletStorageError {
  const commandError = readCommandError(error);

  if (commandError?.code === 'not_found') {
    return fileNotFound('Project file could not be found.', { path, cause: commandError });
  }

  if (commandError?.code === 'permission_denied') {
    return permissionDenied('Permission denied while reading project file.', { path, cause: commandError });
  }

  return readFailed('Project file could not be read from the Tauri filesystem boundary.', { path, cause: error });
}

function mapTauriWriteError(error: unknown, path: string): KoheletStorageError {
  const commandError = readCommandError(error);

  if (commandError?.code === 'not_found') {
    return fileNotFound('Project file destination could not be found.', { path, cause: commandError });
  }

  if (commandError?.code === 'permission_denied') {
    return permissionDenied('Permission denied while writing project file.', { path, cause: commandError });
  }

  return writeFailed('Project file could not be written through the Tauri filesystem boundary.', { path, cause: error });
}

function readCommandError(error: unknown): TauriProjectFileCommandError | undefined {
  if (!isRecord(error)) {
    return undefined;
  }

  const code = error.code;
  if (
    code !== 'not_found' &&
    code !== 'permission_denied' &&
    code !== 'invalid_path' &&
    code !== 'read_failed' &&
    code !== 'write_failed'
  ) {
    return undefined;
  }

  return {
    code,
    message: typeof error.message === 'string' ? error.message : undefined,
    path: typeof error.path === 'string' ? error.path : undefined,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
