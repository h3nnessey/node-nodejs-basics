import { writeFile } from 'node:fs/promises';
import { getPathToFile } from '../utils/path/getPathToFile.js';
import { FileSystemError } from '../utils/error/FileSystemError.js';

const FILE_PATH = getPathToFile(import.meta.url, './files/fresh.txt');
const CONTENT = 'I am fresh and young';

const create = async () => {
  try {
    await writeFile(FILE_PATH, CONTENT, { flag: 'wx+' });
  } catch {
    throw new FileSystemError();
  }
};

await create();
