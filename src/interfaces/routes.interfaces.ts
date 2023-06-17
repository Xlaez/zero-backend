import { Router } from '@dolphjs/core';

export interface Routes {
  path?: string;
  router: typeof Router;
}
