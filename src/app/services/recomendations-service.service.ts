import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoReocmendation } from '../models/DTOs/DtoRecomendation';
import { catchError, Observable } from 'rxjs';
import enviroment from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RecomendationsServiceService {

  constructor(private http:HttpClient, private cookieService : CookieService) { }


  getRandomRecomendations() : Observable<DtoReocmendation[]>{
    const token = this.cookieService.get("oauth-token-app-radio")
    return this.http.post<DtoReocmendation[]>(`${enviroment.base_url_local}api/recomendations`,{
      token:token
    })
  }

}
