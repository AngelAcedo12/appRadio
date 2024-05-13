import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { Station } from 'radio-browser-api';
import { historyItem } from '../../models/DTOs/DtoHistory';
import { ReproductorServiceService } from '../../services/reproductor-service.service';

@Component({
  selector: 'app-station-radio',
  templateUrl: './station-radio.component.html',
  styleUrl: './station-radio.component.css'
})
export class StationRadioComponent {
  @Input({required:true}) station : Station | historyItem | undefined | null;

  public reproductorService = inject(ReproductorServiceService)
  
  favicon : String | undefined

  ngOnChanges(changes: SimpleChanges): void {
    if(this.station==null) return;
    if(this.favicon=== this.station!.favicon) return;
    this.favicon= this.station!.favicon.length>0 ? this.station?.favicon :  "../../../assets/icons8-radio-50.png"
  }


  changeState(){



    if(this.reproductorService.actualStation()?.id!==this.station?.id){
      this.play()
    }
    
    
    
  }

  play(){
    console.log("Play")
    this.reproductorService.play(this.station?.urlResolved!,this.station!)
    document.getElementById("rep")?.classList.replace("desactive","active")

  }
  pause(){
    this.reproductorService.pause();
    document.getElementById("rep")?.classList.replace("active","desactive")

  }
}
