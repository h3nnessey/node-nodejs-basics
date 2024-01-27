import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const transform = async () => {
  const tstream = new Transform({
    transform(chunk, encoding, callback) {
      const reversedChunk = chunk.toString().trim().split('').reverse().join('');

      callback(null, reversedChunk + '\n');
    },
  });

  try {
    await pipeline(process.stdin, tstream, process.stdout);
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Failed to transform data');
  }
};

await transform();
