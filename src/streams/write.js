import { resolve } from 'node:path';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { getDirname } from '../utils/path/getDirname.js';

const __dirname = getDirname(import.meta.url);
const FILE_PATH = resolve(__dirname, './files/fileToWrite.txt');

const write = async () => {
  const wstream = createWriteStream(FILE_PATH, 'utf-8');

  try {
    await pipeline(process.stdin, wstream);
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Failed to write file');
  }
};

await write();
