import { Component, inject, OnInit } from '@angular/core';
import { TransmisionService } from '../../services/transmision.service';
import { TransmisionSocketService } from '../../services/transmisionSocket.service';

@Component({
  selector: 'app-transmision-list',
  templateUrl: './transmision-list.component.html',
  styleUrl: './transmision-list.component.css'
})
export class TransmisionListComponent implements OnInit {

  public transmisionService = inject(TransmisionService)
  private transmisionSocket = inject(TransmisionSocketService)
  ngOnInit(): void {
    
    this.transmisionService.getTransmisions()
    
  }

  conectedTransmision(nameTransmision:string | String){
      
      this.transmisionSocket.conectedSocket({nameTransmision:nameTransmision.toString(), type:'listener'})

  }


}
