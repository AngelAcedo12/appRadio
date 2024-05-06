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
  radios : Signal<Station[]> = signal([])



 async loadRadiosInCords(name: string){
  await this.countriesService.shearchCountry(name)

  await this.api.searchStations({
    limit: 100,
    offset: this.radios().length,
    order: 'random',
    removeDuplicates: true,
    countryCode: this.countriesService.actualSearchCountry()?.cca2 ?? 'ES',
    
  }).then(data => {
    var newData = this.radios().concat(data)
    this.radios = computed(() => newData) // Fix: Assign the computed value to the 'radios' property
  })
 }

}