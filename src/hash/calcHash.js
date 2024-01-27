import { resolve } from 'node:path';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import { getDirname } from '../utils/path/getDirname.js';

const __dirname = getDirname(import.meta.url);
const FILE_PATH = resolve(__dirname, './files/fileToCalculateHashFor.txt');

const calculateHash = async () => {
  const hash = createHash('sha256');
  const rstream = createReadStream(FILE_PATH);

  try {
    await pipeline(rstream, hash);

    console.log(hash.digest('hex'));
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Failed to calculate hash');
  }
};

await calculateHash();
