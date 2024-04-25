import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import enviroment from '../env/enviroments';
import { DtoUserSave } from '../models/DTOs/DtoUserSave';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private http : HttpClient, private cookieService : CookieService) { }

  state = signal(false)


  register(userSave : DtoUserSave){
    this.http.post<any>(`${enviroment.base_url_local}api/user`,userSave, {observe:"response"}).subscribe( (res) => {
     
    let token = res.headers.get("oauth-token-app-radio")
    if(token != null){

      this.cookieService.set("oauth-token-app-radio",token) 
    }
    if(res.body.status==true){

      window.location.href = "radio"
    }

      
    }
    )
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
function res(value: any): void {
  throw new Error('Function not implemented.');
}

