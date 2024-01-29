import { access } from 'node:fs/promises';

export const isExists = async (path) =>
  access(path).then(
    () => true,
    () => false,
  );
