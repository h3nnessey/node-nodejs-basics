import { readdir } from 'node:fs/promises';
import { FileSystemError } from '../utils/error/FileSystemError.js';
import { getResolvedPath } from '../utils/path/getResolvedPath.js';

const DIR_PATH = getResolvedPath(import.meta.url, './files');

const list = async () => {
  try {
    const files = await readdir(DIR_PATH);

    console.table(files);
  } catch {
    throw new FileSystemError();
  }
};

await list();
