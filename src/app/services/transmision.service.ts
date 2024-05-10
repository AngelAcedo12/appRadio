import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import enviroment from '../../environments/environment';
import { DtoTranmision, Transmision } from '../models/DTOs/DtoTransmision';
import { Token } from '@angular/compiler';
import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from './notification-service.service';
import { catchError } from 'rxjs';
import { TransmisionSocketService } from './transmisionSocket.service';

@Injectable({
  providedIn: 'root'
})
export class TransmisionService {

  constructor(private http: HttpClient, private cookieService: CookieService, private notificationSerivice: NotificationService) { }
  
  transmisionList = signal([] as DtoTranmision[]);


  getTransmisions(){
     this.http.get<DtoTranmision[]>(`${enviroment.base_url_local}api/transmision/getTranmision`).subscribe((data : any) => {

      this.transmisionList.update( () => data.data)
      console.log(data)
     });
  }

  createTransmision(transmision:Transmision){
    this.http.post(`${enviroment.base_url_local}api/transmision/createTransmision`,{
      transmision:transmision,
      token: this.cookieService.get('oauth-token-app-radio')
    }).pipe(
      catchError((error)=>{

        this.notificationSerivice.openSnackBar({
          message: error.error.message,
          duration: 5000,
          closeMessage: 'Cerrar'
        })
        return error
      })

    ).subscribe((data: any)=>{
        console.log(data)
        
          this.notificationSerivice.openSnackBar({
            message: data.message,
            duration: 5000,
          })

         
        
    })

  }
  removeTransmision(nameUser: string){
    
    if(nameUser === undefined || nameUser === null || nameUser === "" || nameUser === ''){
      this.notificationSerivice.openSnackBar({
        message: "No se pudo terminar la transmision",
        duration: 5000,
      })
      
    }else{

      this.http.delete(`${enviroment.base_url_local}api/transmision/removeTransmision?nameUser=${nameUser}`,).subscribe((data : any)=>{
        this.notificationSerivice.openSnackBar({
          message: data.message,
          duration: 5000,
        })
      }
      )
    }

  }
}
