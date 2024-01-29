export const validateError = (error, message) =>
  error instanceof Error ? error.message : message;
