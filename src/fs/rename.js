import { rename as renameFile } from 'node:fs/promises';
import { getResolvedPath } from '../utils/path/getResolvedPath.js';
import { FileSystemError } from '../utils/error/FileSystemError.js';

const { url } = import.meta;
const OLD_PATH = getResolvedPath(url, './files/wrongFilename.txt');
const NEW_PATH = getResolvedPath(url, './files/properFilename.md');

const rename = async () => {
  try {
    await renameFile(OLD_PATH, NEW_PATH);
  } catch {
    throw new FileSystemError();
  }
};

await rename();
