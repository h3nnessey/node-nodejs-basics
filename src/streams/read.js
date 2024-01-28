import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { getResolvedPath } from '../utils/path/getResolvedPath.js';
import { validateError } from '../utils/error/validateError.js';

const FILE_PATH = getResolvedPath(import.meta.url, './files/fileToRead.txt');

const read = async () => {
  const readStream = createReadStream(FILE_PATH, 'utf-8');

  try {
    await pipeline(readStream, process.stdout);
  } catch (error) {
    console.error(validateError(error, 'Failed to read data'));
  }
};

await read();
