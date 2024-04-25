import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import enviroment from '../env/enviroments';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private http : HttpClient, private cookieService : CookieService) { }

  state = signal(false)


  register(){

  }

  login(email:string,password:string){
    console.log(email,password)
    this.http.get<any>(`${enviroment.base_url_local}api/user?email=${email}&password=${password}`
    ).subscribe( res => {
      console.log(res)
    } 
    )


  }
  

  checkToken(){

    const cookie= this.cookieService.get("oauth-token-app-radio")
    console.log(cookie)
    return false;
  }
}
