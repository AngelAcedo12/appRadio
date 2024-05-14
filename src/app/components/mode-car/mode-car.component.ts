import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { SpeedTraker } from '../../utils/speedTraker';
import { NotificationService } from '../../services/notification-service.service';
import { ReproductorServiceService } from '../../services/reproductor-service.service';
import { LocationRadiosService } from '../../services/location-radios.service';
import { Station } from 'radio-browser-api';


@Component({
  selector: 'app-mode-car',
  templateUrl: './mode-car.component.html',
  styleUrl: './mode-car.component.css'
})
export class ModeCarComponent implements OnInit{


  @Output() modeCar = new EventEmitter<boolean>()

  constructor(private notificationService: NotificationService,public reproductorService:ReproductorServiceService,
    public locationService:LocationRadiosService) { }


 
  recomendations : Station[] = []
 

  ngOnInit(): void {
   
    this.getRecomendations()
    
  }
  
  play(){
    this.reproductorService.resume()
    document.getElementById("rep")?.classList.replace("desactive","active")
  }
  pause(){
    this.reproductorService.pause()
    document.getElementById("rep")?.classList.replace("active","desactive")
  }

  getRecomendations(){

    this.locationService.recomendations().then((data) => {
      this.recomendations = data
    })
    
  }
  updateModeCar(){
    this.modeCar.emit(false)
  }
}
