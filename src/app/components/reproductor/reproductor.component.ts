import { Component } from '@angular/core';
import { ReproductorServiceService } from '../../services/reproductor-service.service';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrl: './reproductor.component.css'
})
export class ReproductorComponent {

  constructor(public reproductorService:ReproductorServiceService){

  }
}
