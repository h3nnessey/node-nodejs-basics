import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import { getResolvedPath } from '../utils/path/getResolvedPath.js';
import { validateError } from '../utils/error/validateError.js';

const FILE_PATH = getResolvedPath(import.meta.url, './files/fileToCalculateHashFor.txt');

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
