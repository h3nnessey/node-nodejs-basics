import { writeFile } from 'node:fs/promises';
import { getResolvedPath } from '../utils/path/getResolvedPath.js';
import { FileSystemError } from '../utils/error/FileSystemError.js';

const FILE_PATH = getResolvedPath(import.meta.url, './files/fresh.txt');
const CONTENT = 'I am fresh and young';

const create = async () => {
  try {
    await writeFile(FILE_PATH, CONTENT, { flag: 'wx+' });
  } catch {
    throw new FileSystemError();
  }
};

await create();
