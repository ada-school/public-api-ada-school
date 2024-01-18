export interface HTTPError extends Error {
  status?: number;
  errors?: { message: string }[];
}

