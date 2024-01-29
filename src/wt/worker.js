import { workerData, parentPort } from 'node:worker_threads';

const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  const result = nthFibonacci(workerData.n);

  // To check the output { status: 'error', data: null } uncomment this code
  // if (Math.random() > 0.5) {
  //   throw new Error('Failed to calculate nth Fibonacci');
  // }

  parentPort.postMessage(result);
};

sendResult();
