import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, Signal, signal} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import enviroment from '../env/enviroments';
import { DtoUserSave } from '../models/DTOs/DtoUserSave';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private http : HttpClient, private cookieService : CookieService) { }

  state = signal(false)
  
  userSave : Signal<DtoUserSave | undefined> = signal(undefined)
  logInState  = signal(false)

  register(userSave : DtoUserSave){
    this.http.post<any>(`${enviroment.base_url_local}api/user`,userSave, {observe:"response"}).subscribe( (res) => {
     
      let token = res.body.token
  
    if(token != null){

        this.cookieService.set("oauth-token-app-radio",token, {path:"/",expires:1}) 
        this.logInState.update(() => true)
    }
    if(res.body.status==true){

      window.location.href = "radio"
    }

      
    }
    )
  }

  login(email:string,password:string){
    console.log("Holi")
  return this.http.get<any>(`${enviroment.base_url_local}api/user?email=${email}&password=${password}`,{observe:"response"}
    ).subscribe( res => {
      console.log(res.body.result)

      let token = res.body.token

      if(token != null){
       
        this.cookieService.set("oauth-token-app-radio",token,{path:"/",expires:1}) 
        console.log("TOKEN GUARDADO")
      }
      if(res.body.status==true){
        this.userSave = computed(() => res.body.result.user) 
        this.logInState.update(() => true)
       return true
      }
      return false
    } 
    )
  }
  logInWhitToken(TOKEN:string){ 
    const body={
      "token": TOKEN
    }
    this.http.post<any>(`${enviroment.base_url_local}api/user/logWhitToken`,body).subscribe( res => { 
        this.userSave = computed(() => res.result.user) 
        this.logInState.update(() => true)
    } )
  }
  

  checkToken(){

    const cookie= this.cookieService.get("oauth-token-app-radio")
    if(cookie != null){
      return true
    }
    return false;
  }
}


