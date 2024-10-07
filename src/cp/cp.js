import { spawn } from 'node:child_process';
import { EOL } from 'node:os';
import { getResolvedPath } from '../utils/path/getResolvedPath.js';

const SCRIPT_PATH = getResolvedPath(import.meta.url, './files/script.js');

const spawnChildProcess = async (args) => {
  const childProcess = spawn('node', [SCRIPT_PATH, ...args], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  });

  // the stdin of the child process receives input data from the stdin of the master process
  process.stdin.on('data', (chunk) =>
    childProcess.stdin.write(chunk.toString().trim()),
  );

  // the stdout of the child process sends data to the stdout of the master process
  childProcess.stdout.pipe(process.stdout);

  // notification about closing a child process when you type CLOSE in the console (see ./files/script.js)
  childProcess.on('exit', (code) =>
    process.stdout.write(`Child process terminated with code ${code + EOL}`),
  );

  // IPC (there is no such requirement in the terms of reference)
  childProcess.on('message', (data) =>
    console.log('[IPC] Received from child process: ', data),
  );
  childProcess.send('Hello, child!');
};

spawnChildProcess(['--write', '--some', '--arguments', '--here']);
