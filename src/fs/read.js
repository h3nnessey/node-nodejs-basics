import { readFile } from 'node:fs/promises';
import { getPathToFile } from '../utils/path/getPathToFile.js';
import { FileSystemError } from '../utils/error/FileSystemError.js';

const FILE_PATH = getPathToFile(import.meta.url, './files/fileToRead.txt');

const read = async () => {
  try {
    const content = await readFile(FILE_PATH, 'utf-8');

    console.log(content);
  } catch {
    throw new FileSystemError();
  }
};

await read();
