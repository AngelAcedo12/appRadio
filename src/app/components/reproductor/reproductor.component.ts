import { AfterViewInit, Component, computed, Input, OnInit, signal, Signal, SimpleChanges } from '@angular/core';
import { ReproductorServiceService } from '../../services/reproductor-service.service';
import { Station } from 'radio-browser-api';
import { Sign } from 'crypto';
import { of } from 'rxjs';
import { Coords } from '../../models/Coords';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrl: './reproductor.component.css'
})
export class ReproductorComponent implements AfterViewInit, OnInit {

  @Input() isAtransmision : boolean = false
  modeCar = signal(false)
  coords : Coords[]= []


  constructor(public reproductorService:ReproductorServiceService, public notificationService: NotificationService){


  }
  ngOnInit(): void {
    setInterval(()=>{
      this.determineMode()
    },10000)


  }
  
  ngAfterViewInit(): void {



     
      this.reproductorService.addListertToAudio()
      if(this.reproductorService.actualStation!=undefined){
      this.reproductorService.loadStationInLocalStorage()
        
    

  }
}

  state : Signal<boolean> = signal(false)
  stateOpen = signal(false)





async  determineMode(){

    let speed = 0
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          if (position.coords.speed !== null) {
            const speed = position.coords.speed; // velocidad en metros por segundo
            this.notificationService.openSnackBar({
              message: "Velocidad de movimiento: "+speed+" m/s",
              closeMessage: "Cerrar"
            })

          } else {
            this.notificationService.openSnackBar({
              message: "No se pudo determinar la velocidad de movimiento.",
              closeMessage: "Cerrar"
            })
            
          }
        },
        (error) => {

          console.log("Error al obtener la posición actual:", error);
        }
        
      );
    } else {
      this.notificationService.openSnackBar({
        message: "Geolocalización no está disponible en este navegador.",
        closeMessage: "Cerrar"

      })
      console.log("Geolocalización no está disponible en este navegador.");
    }
  
    
    
    return this.modeCar
  
    
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
