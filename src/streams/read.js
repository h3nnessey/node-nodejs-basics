import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { getPathToFile } from '../utils/path/getPathToFile.js';
import { validateError } from '../utils/error/validateError.js';

const FILE_PATH = getPathToFile(import.meta.url, './files/fileToRead.txt');

const read = async () => {
  const readStream = createReadStream(FILE_PATH, 'utf-8');

  try {
    await pipeline(readStream, process.stdout);
  } catch (error) {
    console.error(validateError(error, 'Failed to read data'));
  }
};

await read();
