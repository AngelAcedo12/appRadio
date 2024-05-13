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
export class ReproductorComponent implements AfterViewInit, OnInit {

  @Input() isAtransmision : boolean = false
  modeCar = signal(false)
  coords : Coords[]= []
  speedTraker = new Observable<SpeedTraker>((observer) => observer.next(new SpeedTraker(40)))
  recomendations : Station[] = []
  constructor(public reproductorService:ReproductorServiceService,
     public notificationService: NotificationService,public locationService:LocationRadiosService){


  }
  ngOnInit(): void {
    this.getRecomendations()
    this.speedTraker.subscribe((speedTraker) => {
      speedTraker.breakSpeedLimit.subscribe((value) => {
          if (value) {
              this.notificationService.openSnackBar({
                  message: "Has superado el limite de velocidad, cambiando a modo conducción 🚧",
                  closeMessage: "Cerrar",
              })
              document.getElementsByTagName("body")[0].style.overflow="hidden"
          }
          
          this.modeCar.update(() => value)
      })
    })
    

  }
  
  ngAfterViewInit(): void {
      this.reproductorService.addListertToAudio()
      if(this.reproductorService.actualStation!=undefined){
      this.reproductorService.loadStationInLocalStorage()
        
  
  }
}

  state : Signal<boolean> = signal(false)
  stateOpen = signal(false)


getRecomendations(){

  this.locationService.recomendations().then((data) => {
    this.recomendations = data
  })
  
}


async  determineMode(){

    let speed = 0


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
