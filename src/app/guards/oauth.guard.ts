import { computed, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OauthService } from '../services/oauth.service';

export const oauthGuard: CanActivateFn = (route, state) => {

  const cookiesService = inject(CookieService)
  const oauthService = inject(OauthService)
  const router = inject(Router)
  const token = cookiesService.get("oauth-token-app-radio") 

  if(token.length<=0 ){
    setTimeout(() => {
      window.location.href = "oauth/log-in"
    },100)

    return false;
  }else{
    oauthService.logInWhitToken(token).subscribe(res => {

      oauthService.userSave = computed(() => res.findUserInDb)

      oauthService.logInState.update(() => res.status)
      return res;
      
    })
    return true;
  }
  
};
