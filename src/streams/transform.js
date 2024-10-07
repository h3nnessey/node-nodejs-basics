import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { EOL } from 'node:os';
import { validateError } from '../utils/error/validateError.js';

class ReverseStream extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    const reversedChunk = this.#reverseChunk(chunk);

    callback(null, reversedChunk + EOL);
  }

  #reverseChunk(chunk) {
    return chunk.toString().trim().split('').reverse().join('');
  }
}

const transform = async () => {
  const reverseStream = new ReverseStream();

  try {
    await pipeline(process.stdin, reverseStream, process.stdout);
  } catch (error) {
    console.error(validateError(error, 'Failed to transform data'));
  }
};

await transform();
