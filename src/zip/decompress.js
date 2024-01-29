import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliDecompress, constants } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { getResolvedPath } from '../utils/path/getResolvedPath.js';
import { validateError } from '../utils/error/validateError.js';

const { url } = import.meta;
const SOURCE_PATH = getResolvedPath(url, './files/archive.gz');
const DESTINATION_PATH = getResolvedPath(url, './files/fileToCompress.txt');

const decompress = async () => {
  const brotliDecompress = createBrotliDecompress();

  const readStream = createReadStream(SOURCE_PATH);
  const writeStream = createWriteStream(DESTINATION_PATH);

  try {
    await pipeline(readStream, brotliDecompress, writeStream);
  } catch (error) {
    console.error(validateError(error, 'Failed to decompress file'));
  }
};

await decompress();
