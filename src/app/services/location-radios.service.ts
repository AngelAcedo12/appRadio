import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, Signal } from '@angular/core';
import { Coords } from '../models/Coords';
import { RadioBrowserApi, Station } from 'radio-browser-api';
import { CountrysService } from './countries.service';

@Injectable({
  providedIn: 'root'
})
export class LocationRadiosService {

  constructor(private http: HttpClient, private countriesService: CountrysService) {

    this.api.setBaseUrl("https://at1.api.radio-browser.info")

   }


  api  : RadioBrowserApi = new RadioBrowserApi("My Radio Browser API Key")
  radios : Signal<Station[] | undefined> = signal(undefined)



 async loadRadiosInCords(name: string){
  
  await this.api.searchStations({
    
    order: 'random',
    removeDuplicates: true,
    countryCode: this.countriesService.actualSearchCountry()?.cca2 ?? 'ES',
    
  }).then(data => {
    this.radios = computed(() => data)
  })
 }

}
