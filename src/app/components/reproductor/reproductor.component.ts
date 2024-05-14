import { AfterViewInit, Component, computed, effect, Input, OnInit, signal, Signal, SimpleChanges } from '@angular/core';
import { ReproductorServiceService } from '../../services/reproductor-service.service';
import { Station } from 'radio-browser-api';
import { Sign } from 'crypto';
import { Observable, of } from 'rxjs';
import { Coords } from '../../models/Coords';
import { NotificationService } from '../../services/notification-service.service';
import { SpeedTraker } from '../../utils/speedTraker';
import { LocationRadiosService } from '../../services/location-radios.service';
@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrl: './reproductor.component.css'
})
export class ReproductorComponent implements AfterViewInit {

  @Input() isAtransmision : boolean = false
  modeCar = signal(false)
  coords : Coords[]= []
  volumeBar = signal(false)
  recomendations : Station[] = []
  constructor(public reproductorService:ReproductorServiceService,
    public locationService:LocationRadiosService, private notificationService: NotificationService){

  }
  openBar(){
    this.volumeBar.update(() => this.volumeBar() ? false : true )
  }
  updateModeCar(){
    this.modeCar() ? this.modeCar.update(() => false) : this.modeCar.update(() => true) 
  }
  setModeCar(boolean: boolean){
    this.modeCar.update(() => boolean)

  }
  
  ngAfterViewInit(): void {
      this.reproductorService.addListertToAudio()
      if(this.reproductorService.actualStation!=undefined){
      this.reproductorService.loadStationInLocalStorage()
        
  
  }
}

  state : Signal<boolean> = signal(false)
  stateOpen = signal(false)




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
