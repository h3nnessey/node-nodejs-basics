import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';
import { getResolvedPath } from '../utils/path/getResolvedPath.js';

const WORKER_PATH = getResolvedPath(import.meta.url, './worker.js');
const INITIAL_N = 10;

const createWorker = (workerPath, workerData) =>
  new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, { workerData });

    worker.on('message', resolve);
    worker.on('error', reject);
  });

const mapWorkerResults = (results) =>
  results.map(({ status, value }) => {
    const isFailed = status === 'rejected';

    return {
      status: isFailed ? 'error' : 'resolved',
      data: isFailed ? null : value,
    };
  });

const performCalculations = async () => {
  const workers = cpus().map((_, index) =>
    createWorker(WORKER_PATH, { n: INITIAL_N + index }),
  );

  const workerResults = await Promise.allSettled(workers);
  const mappedResults = mapWorkerResults(workerResults);

  console.log(mappedResults);
};

await performCalculations();
