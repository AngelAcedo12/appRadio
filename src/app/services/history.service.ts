import { HttpClient } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import enviroment from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient , private cookieService: CookieService) {

  }

  history : Signal<>


  getHistory() {
    const token = this.cookieService.get("oauth-token-app-radio")
    const headers = {
  
       'Authorization': `${token}`
      
    }
    return this.http.get<any>(`${enviroment}api/user/history`,{
      headers: headers
    })
  }

}
