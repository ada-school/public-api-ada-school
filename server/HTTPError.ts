export interface HTTPError extends Error {
    status?: number;
    errors?: Array<{ message: string }>;
  }
  