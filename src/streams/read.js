import { resolve } from 'node:path';
import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { getDirname } from '../utils/path/getDirname.js';

const __dirname = getDirname(import.meta.url);
const FILE_PATH = resolve(__dirname, './files/fileToRead.txt');

const read = async () => {
  const rstream = createReadStream(FILE_PATH, 'utf-8');

  try {
    await pipeline(rstream, process.stdout);
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Failed to read file');
  }
};

await read();
