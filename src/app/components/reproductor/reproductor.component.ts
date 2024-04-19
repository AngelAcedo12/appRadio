import { Component, computed, signal, Signal, SimpleChanges } from '@angular/core';
import { ReproductorServiceService } from '../../services/reproductor-service.service';
import { Station } from 'radio-browser-api';
import { Sign } from 'crypto';
import { of } from 'rxjs';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrl: './reproductor.component.css'
})
export class ReproductorComponent {

  constructor(public reproductorService:ReproductorServiceService){


  }

  state : Signal<boolean> = signal(false)
  stateOpen = signal(false)


  openOrClose(){
    if(this.stateOpen()){
      document.getElementById("rep")?.classList.replace("open","close")
      this.stateOpen.update(() => false)
    }else{
      document.getElementById("rep")?.classList.replace("close","open")
      this.stateOpen.update(()=>true)
    }
  }


  setState(){
    if(this.reproductorService.actualStation!=undefined && this.reproductorService.state()){
      document.getElementById("rep")?.classList.replace("desactive","active")
    }else{
      document.getElementById("rep")?.classList.replace("active","desactive")
    }
  }
  
  play(){
    this.reproductorService.resume()
    document.getElementById("rep")?.classList.replace("desactive","active")
  }
  pause(){
    this.reproductorService.pause()
    document.getElementById("rep")?.classList.replace("active","desactive")
  }


}
