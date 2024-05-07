import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import enviroment from '../../environments/environment';
import {io,Manager} from 'socket.io-client';
import { NotificationService } from './notification-service.service';
import { Socket } from 'socket.io';






@Injectable({
  providedIn: 'root'
})
export class TransmisionServiceSocketService {

  
  
  constructor(private notificationService: NotificationService, private http: HttpClient) {
    
  }
  
  getConnection() {
    return this.http.get<any>(`${enviroment.base_url_local}api/transmision`).toPromise().then((data) => {
      return data
    }).catch((err) => {
      this.notificationService.openSnackBarError({
        message: "Error al conectar con el servidor",
        duration: 2000,
      })
    })
  }

}
