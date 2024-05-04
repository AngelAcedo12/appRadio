import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoReocmendation } from '../models/DTOs/DtoRecomendation';
import { catchError, Observable } from 'rxjs';
import enviroment from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from './notification-service.service';

@Injectable({
  providedIn: 'root'
})
export class RecomendationsServiceService {

  constructor(private http:HttpClient, private cookieService : CookieService, private notificationService:NotificationService) { }

  getRandomRecomendations(actualUser : string | undefined ) : Observable<DtoReocmendation[]>{
    
    if(actualUser == undefined) {
      this.notificationService.openSnackBarError({
        message:"Usuario actual undefined",
        duration:500,
        
      })


      return new Observable<DtoReocmendation[]>(subscriber=>{
        subscriber.error("User not found")
      })

    }
    
    
    const token = this.cookieService.get("oauth-token-app-radio")
    return this.http.post<DtoReocmendation[]>(`${enviroment.base_url_local}api/recomendations`,{
      token:token,
      actualUser:actualUser
    })
  }



}
