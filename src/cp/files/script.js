const args = process.argv.slice(2);

console.log(`Total number of arguments is ${args.length}`);
console.log(`Arguments: ${JSON.stringify(args)}`);

const echoInput = (chunk) => {
  const chunkStringified = chunk.toString();
  if (chunkStringified.includes('CLOSE')) process.exit(0);
  process.stdout.write(`Received from master process: ${chunk.toString()}\n`);
};

process.stdin.on('data', echoInput);

// IPC (there is no such requirement in the terms of reference)
process.on('message', (data) =>
  console.log('[IPC] Received from master process: ', data),
);
process.send('Hello, master!');
