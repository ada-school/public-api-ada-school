/**
 * @license
 * Copyright 2024 Ada School
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

declare namespace Express {
  export interface Request {
    jwt?: {
      userId: string;
      schoolId: string;
      userRoles: ReadonlyArray<string>;
    };
  }
}
