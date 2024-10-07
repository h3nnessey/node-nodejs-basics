import { readFile } from 'node:fs/promises';
import { getResolvedPath } from '../utils/path/getResolvedPath.js';
import { FileSystemError } from '../utils/error/FileSystemError.js';

const FILE_PATH = getResolvedPath(import.meta.url, './files/fileToRead.txt');

const read = async () => {
  try {
    const content = await readFile(FILE_PATH, 'utf-8');

    console.log(content);
  } catch {
    throw new FileSystemError();
  }
};

await read();
