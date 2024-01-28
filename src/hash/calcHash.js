import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import { getPathToFile } from '../utils/path/getPathToFile.js';
import { validateError } from '../utils/error/validateError.js';

const FILE_PATH = getPathToFile(import.meta.url, './files/fileToCalculateHashFor.txt');

const calculateHash = async () => {
  const hash = createHash('sha256');
  const readStream = createReadStream(FILE_PATH);

  try {
    await pipeline(readStream, hash);

    console.log(hash.digest('hex'));
  } catch (error) {
    console.error(validateError(error, 'Failed to calculate hash'));
  }
};

await calculateHash();
