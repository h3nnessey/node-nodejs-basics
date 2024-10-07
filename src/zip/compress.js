import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, constants } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { getResolvedPath } from '../utils/path/getResolvedPath.js';
import { validateError } from '../utils/error/validateError.js';

const { url } = import.meta;
const SOURCE_PATH = getResolvedPath(url, './files/fileToCompress.txt');
const DESTINATION_PATH = getResolvedPath(url, './files/archive.gz');

const compress = async () => {
  const brotliCompress = createBrotliCompress({
    params: {
      [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MIN_QUALITY,
    },
  });

  const readStream = createReadStream(SOURCE_PATH);
  const writeStream = createWriteStream(DESTINATION_PATH);

  try {
    await pipeline(readStream, brotliCompress, writeStream);
  } catch (error) {
    console.error(validateError(error, 'Failed to compress file'));
  }
};

await compress();
