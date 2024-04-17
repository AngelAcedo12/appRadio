import { Component } from '@angular/core';
import { ReproductorServiceService } from '../../../services/reproductor-service.service';

@Component({
  selector: 'app-find-radio',
  templateUrl: './find-radio.component.html',
  styleUrl: './find-radio.component.css'
})
export class FindRadioComponent {

  constructor(private reproductorService:ReproductorServiceService){

  }
}
