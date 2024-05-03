import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, Signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DtoProfile } from '../models/DTOs/DtoProfile';
import enviroment from '../../environments/environment';
import { catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private cookieService: CookieService, private _snackBar: MatSnackBar) { }


  profile : Signal<DtoProfile | undefined > =  signal(undefined); 


  getProfileWithName(name:string){
      
    this.http.post<any>(`${enviroment.base_url_local}api/user/getProfileByName`,{
      body:{
        name:name
      }
    }).subscribe((data)=>{  

      this.profile = computed(()=>data.profile.profile)
    })
  }

  getProfileWithToken(){
    let token = this.cookieService.get("oauth-token-app-radio")

    this.http.post<any>(`${enviroment.base_url_local}api/user/getProfileByToken`,{
      body:{
        token:token
      }
    }).subscribe((data)=>{
    
      this.profile = computed(()=>data.profile)
    })
  }
  
  changePassword(newPassword:string | null,confirmNewPassword:string | null){
    
    if(newPassword != confirmNewPassword || newPassword == null || confirmNewPassword == null){
      this.openSnackBar("Las contraseñas no coinciden")
      return
    }
    
    let token = this.cookieService.get("oauth-token-app-radio")
    
    this.http.put<any>(`${enviroment.base_url_local}api/user/changePassword`,{
      body:{
        token:token,
        password:newPassword
      }
    }).pipe(
      catchError(err=>{
        console.log(err)
        this.openSnackBar("Error al iniciar sesión")
        return err
      })
    ).subscribe((data)=>{
      console.log(data)
      this.openSnackBar("Contraseña cambiada")
      setTimeout(() => {
        window.location.href = "radio"
      }, 1000);
    })
  }
  editProfile(name: string  | null, imgProfileSelected: string | null) {

    if(name == null || imgProfileSelected == null){
      this.openSnackBar("Error al editar perfil")
      return
    }
    let token = this.cookieService.get("oauth-token-app-radio")
  
    this.http.put<any>(`${enviroment.base_url_local}api/user/editProfile`, {
      body: {
        token: token,
        name: name,
        imgProfileSelected: imgProfileSelected
      }
    }).pipe(
      catchError(err => {
        console.log(err)
        this.openSnackBar("Error al editar perfil")
        return err
      })
    ).subscribe((data) => {
      console.log(data)
      this.openSnackBar("Perfil editado")
      setTimeout(() => {
        window.location.href = "radio"
      }, 1000);
    })


  }

  openSnackBar(message: string) {
    this._snackBar.open(message,"",{
      duration:  1000,
    });
  }

  
}
