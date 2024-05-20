import { Component, inject } from '@angular/core';
import { TransmisionService } from '../../../services/transmision.service';
import { TransmisionSocketService } from '../../../services/transmisionSocket.service';

@Component({
  selector: 'app-layaout',
  templateUrl: './layaout.component.html',
  styleUrl: './layaout.component.css'
})
export class LayaoutComponent {
  
  private transmisionService = inject(TransmisionService)
  private transmisionSocketService = inject(TransmisionSocketService)
  menuCreateState = false


  changeMenuCreateState(){

    this.menuCreateState = this.menuCreateState ? false : true
  } 
  closeTransmision(){
   
    this.transmisionSocketService.stopTransmisionAudio()
  }
}
