import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, Signal, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import enviroment from '../../environments/environment';
import { DtoUserSave } from '../models/DTOs/DtoUserSave';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  state = signal(false)

  userSave: Signal<DtoUserSave | undefined> = signal(undefined)
  logInState = signal(false)
 


  register(userSave: DtoUserSave) {
   return this.http.post<any>(`${enviroment.base_url_local}api/user`, userSave).pipe(
    catchError(err => {
      console.log(err)
      return err
    }))
  }

  login(email: string, password: string) {
  
   return this.http.get<any>(`${enviroment.base_url_local}api/user?email=${email}&password=${password}`).pipe(
    catchError(err => {
      console.log(err)
      return err
    })
  )
    
  }
  logInWhitToken(TOKEN: string) {

    const body = {
      "token": TOKEN
    }

   return this.http.post<any>(`${enviroment.base_url_local}api/user/logWhitToken`, body).pipe(
    catchError(err => {
      console.log(err)
      return err
    })
   )

  }


  checkToken() {

    const cookie = this.cookieService.get("oauth-token-app-radio")
    if (cookie != null) {
      return true
    }
    return false;

  }
}


