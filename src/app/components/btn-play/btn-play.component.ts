import { Component, inject, Input, signal, Signal } from '@angular/core';
import { ReproductorServiceService } from '../../services/reproductor-service.service';
import { Station } from 'radio-browser-api';

@Component({
  selector: 'app-btn-play',
  templateUrl: './btn-play.component.html',
  styleUrl: './btn-play.component.css'
})
export class BtnPlayComponent {

  public reproductorService = inject(ReproductorServiceService) 

  

  @Input({required:true}) urlImg : String | undefined
  @Input({required:true}) station : Station | undefined



  play(){
    this.reproductorService.play(this.station?.url!,this.station!)
    document.getElementById("rep")?.classList.replace("desactive","active")

  }
  pause(){
    this.reproductorService.pause();
    document.getElementById("rep")?.classList.replace("active","desactive")

  }

}
