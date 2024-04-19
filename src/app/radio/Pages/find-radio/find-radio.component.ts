import { Component, inject, OnInit } from '@angular/core';
import { ReproductorServiceService } from '../../../services/reproductor-service.service';
import { ActivatedRoute } from '@angular/router';
import { RadioBrowserApi, Station } from 'radio-browser-api';

@Component({
  selector: 'app-find-radio',
  templateUrl: './find-radio.component.html',
  styleUrl: './find-radio.component.css'
})
export class FindRadioComponent implements OnInit{

  private radioService = inject(ReproductorServiceService)
  private router = inject(ActivatedRoute)

    ngOnInit(): void {

      this.id=this.router.snapshot.params["id"]
      


    }




    id: string | undefined
    api : RadioBrowserApi  = new RadioBrowserApi("My api")
    station: Station | undefined

    getStation(){

      

    }
}
