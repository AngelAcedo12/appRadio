import { Component } from '@angular/core';
import {  TransmisionSocketService } from '../../../services/transmisionSocket.service';
import { OauthService } from '../../../services/oauth.service';

@Component({
  selector: 'app-transmision',
  templateUrl: './transmision.component.html',
  styleUrl: './transmision.component.css'
})
export class TransmisionComponent {


  constructor(public transmisionService:TransmisionSocketService, private oauthService : OauthService) { }

  ngOnInit(): void {
  
  }

  joinToTransmision(transmisionName : string){

    let user =this.oauthService.userSave()
    if( user != undefined){
      let userName =  user.name
      this.transmisionService.conectedSocket(transmisionName,userName);
    }


  }

  startTransmision(){
    let user =this.oauthService.userSave()
    if( user != undefined){
      let userName =  user.name
      this.transmisionService.startTransmisionAudio(userName);
    }

  }
  stopTransmision(){  
    this.transmisionService.stopTransmisionAudio();
    
  }



}
