import { Injectable } from '@angular/core';

import enviroment from '../../environments/environment';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { NotificationService } from './notification-service.service';




@Injectable({
  providedIn: 'root'
})
export class TransmisionServiceSocketService {


  constructor(private noficicationService: NotificationService) {
  
  }


  socketConfig : SocketIoConfig= {
    url: `${enviroment.base_url_local}api/transmision`,
    options: {
      
    }
  }
  webSocket : Socket | undefined

  createNewWebSocket(){
      let url = `${enviroment.base_url_local}/api/transmission`;
      this.webSocket =  new Socket(this.socketConfig);
  }

  sendMessage(message: string){
    this.webSocket?.emit('message', message)
  }
  getMessage(){

    return this.webSocket?.fromEvent('message')

  }


}
