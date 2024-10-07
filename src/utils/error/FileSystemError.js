export class FileSystemError extends Error {
  constructor() {
    super('FS operation failed');
  }
}
