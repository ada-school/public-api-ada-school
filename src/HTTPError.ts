/**
 * @license
 * Copyright 2024 Ada School
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

type HTTPErrorOptions = {
  status?: number;
  message?: string;
  code?: number;
  errors?: any;
  module?: string;
};

export class HTTPError extends Error {
  status: number;
  code: number | undefined = undefined;
  errors: any;
  module: string | undefined = undefined;

  constructor({ status, message, code, errors, module }: HTTPErrorOptions) {
    super(message);
    this.status = status ?? 500;
    this.code = code;
    this.errors = errors;
    this.module = module;
  }
}
