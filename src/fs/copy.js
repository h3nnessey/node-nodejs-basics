import { readdir, copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { getResolvedPath, isExists } from '../utils/path/index.js';
import { FileSystemError } from '../utils/error/FileSystemError.js';

const { url } = import.meta;
const SOURCE_PATH = getResolvedPath(url, './files');
const DESTINATION_PATH = getResolvedPath(url, './files_copy');

const copyRecursive = async (source, destination) => {
  try {
    const directoryContent = await readdir(source, { withFileTypes: true });

    await mkdir(destination, { recursive: true });

    const copyPromises = directoryContent.map((item) => {
      const src = resolve(source, item.name);
      const dest = resolve(destination, item.name);

      return item.isFile() ? copyFile(src, dest) : copyRecursive(src, dest);
    });

    Promise.all(copyPromises);
  } catch {
    throw new FileSystemError();
  }
};

const copy = async () => {
  const isFilesCopyExists = await isExists(DESTINATION_PATH);

  if (isFilesCopyExists) throw new FileSystemError();

  await copyRecursive(SOURCE_PATH, DESTINATION_PATH);
};

await copy();
