import { Component, OnInit } from '@angular/core';
import { RadioBrowserApi, Station } from 'radio-browser-api';

@Component({
  selector: 'app-all-radios',
  templateUrl: './all-radios.component.html',
  styleUrl: './all-radios.component.css'
})
export class AllRadiosComponent implements OnInit {

  ngOnInit(): void {
    this.loadRadios()
  }



  
  api : RadioBrowserApi = new RadioBrowserApi("My radio")

  radios: Station[] | undefined

  async loadRadios(){
   await this.api.searchStations({
      countryCode:'ES',
      offset:0,
      limit:50
    }).then(data => this.radios=data)

  }
}
