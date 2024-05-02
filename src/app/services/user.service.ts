import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, Signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DtoProfile } from '../models/DTOs/DtoProfile';
import enviroment from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private cookieService: CookieService) { }


  profile : Signal<DtoProfile | undefined > =  signal(undefined); 


  getProfileWithName(name:string){
      
    this.http.post<DtoProfile>(`${enviroment.base_url_local}api/user/getProfileByName`,{
      body:{
        name:name
      }
      
    }).subscribe((data)=>{  
      console.log(data)
      this.profile = computed(()=>data)
    })
  }

  getProfileWithToken(){
    let token = this.cookieService.get("oauth-token-app-radio")

    this.http.post<DtoProfile>(`${enviroment.base_url_local}api/user/getProfileByToken`,{
      body:{
        token:token
      }
    }).subscribe((data)=>{
      console.log(data)
      this.profile = computed(()=>data)
    })
  }

}
