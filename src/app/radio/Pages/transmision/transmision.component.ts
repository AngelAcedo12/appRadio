import { Component, inject, OnInit } from '@angular/core';
import { TransmisionServiceSocketService } from '../../../services/transmision-service-socket.service';

@Component({
  selector: 'app-transmision',
  templateUrl: './transmision.component.html',
  styleUrl: './transmision.component.css'
})
export class TransmisionComponent implements OnInit {

    private transmisionService = inject(TransmisionServiceSocketService)


  ngOnInit(): void {
    
      this.transmisionService.createNewWebSocket()
      this.transmisionService.sendMessage("Hola")
    
  }


}
