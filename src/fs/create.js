import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { getDirname } from '../utils/path/getDirname.js';
import { FileSystemError } from '../utils/error/FileSystemError.js';

const __dirname = getDirname(import.meta.url);
const CONTENT = 'I am fresh and young';
const DESTINATION = resolve(__dirname, './files/fresh.txt');

const create = async () => {
  try {
    await writeFile(DESTINATION, CONTENT, { flag: 'wx+' });
  } catch {
    throw new FileSystemError();
  }
};

await create();
