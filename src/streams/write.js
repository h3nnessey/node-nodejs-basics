import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { getPathToFile } from '../utils/path/getPathToFile.js';
import { validateError } from '../utils/error/validateError.js';

const FILE_PATH = getPathToFile(import.meta.url, './files/fileToWrite.txt');

const write = async () => {
  const writeStream = createWriteStream(FILE_PATH, 'utf-8');

  try {
    await pipeline(process.stdin, writeStream);
  } catch (error) {
    console.error(validateError(error, 'Failed to write data'));
  }
};

await write();
