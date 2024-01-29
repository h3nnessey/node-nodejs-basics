import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { EOL } from 'node:os';
import { validateError } from '../utils/error/validateError.js';

class ReverseChunkTransform extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    const reversedChunk = chunk.toString().trim().split('').reverse().join('');

    callback(null, reversedChunk + EOL);
  }
}

const transform = async () => {
  const transformStream = new ReverseChunkTransform();

  try {
    await pipeline(process.stdin, transformStream, process.stdout);
  } catch (error) {
    console.error(validateError(error, 'Failed to transform data'));
  }
};

await transform();
