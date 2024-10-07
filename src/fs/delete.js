import { unlink } from 'node:fs/promises';
import { FileSystemError } from '../utils/error/FileSystemError.js';
import { getResolvedPath } from '../utils/path/getResolvedPath.js';

const FILE_PATH = getResolvedPath(import.meta.url, './files/fileToRemove.txt');

const remove = async () => {
  try {
    await unlink(FILE_PATH);
  } catch {
    throw new FileSystemError();
  }
};

await remove();
