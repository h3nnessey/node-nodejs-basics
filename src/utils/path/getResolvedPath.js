import { resolve } from 'node:path';
import { getDirname } from './getDirname.js';

export const getResolvedPath = (fileURL, ...paths) => resolve(getDirname(fileURL), ...paths);
