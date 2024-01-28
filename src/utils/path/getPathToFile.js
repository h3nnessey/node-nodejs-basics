import { resolve } from 'node:path';
import { getDirname } from './getDirname.js';

export const getPathToFile = (fileURL, ...paths) => resolve(getDirname(fileURL), ...paths);
