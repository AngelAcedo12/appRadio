import { Component } from '@angular/core';
import { TransmisionService } from '../../../services/transmision.service';

@Component({
  selector: 'app-transmision',
  templateUrl: './transmision.component.html',
  styleUrl: './transmision.component.css'
})
export class TransmisionComponent {


  constructor(public transmisionService:TransmisionService) { }

  ngOnInit(): void {
  
  }


  startTransmision(){
    
    this.transmisionService.startTransmisionAudio();
  }
}
