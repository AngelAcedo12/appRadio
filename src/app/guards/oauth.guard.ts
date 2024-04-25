import { CanActivateFn } from '@angular/router';

export const oauthGuard: CanActivateFn = (route, state) => {
  return true;
};
