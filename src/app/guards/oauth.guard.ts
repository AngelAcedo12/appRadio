import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OauthService } from '../services/oauth.service';

export const oauthGuard: CanActivateFn = (route, state) => {

  const cookiesService = inject(CookieService)
  const oauthService = inject(OauthService)
  const token = cookiesService.get("oauth-token-app-radio")
  console.log(token)
  if(token.length<=0 ){
    window.location.href = "oauth/logIn"
    return false;
  }else{
    oauthService.logInWhitToken(token)
    return true;
  }



};
