import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, Signal } from '@angular/core';
import enviroment from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { DtoHistory } from '../models/DTOs/DtoHistory';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient , private cookieService: CookieService) {

  }

  history : Signal<DtoHistory | undefined> = signal(undefined)


  getHistory() {
    const token = this.cookieService.get("oauth-token-app-radio")
    const headers = {
  
       'Authorization': `${token}`
      
    }
    console.log("Cargando historial")
    return this.http.post<DtoHistory>(`${enviroment.base_url_local}api/user/history/findHistory`,{
      headers: headers
    }).subscribe((data) => {
     
      this.history = computed(() => data)
      
    }
    )
  }

}
