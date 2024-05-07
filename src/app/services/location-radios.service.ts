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
    this.setRamdonUrl()
    this.api.setBaseUrl("https://at1.api.radio-browser.info")

   }


  api  : RadioBrowserApi = new RadioBrowserApi("My Radio Browser API Key")
  radios : Signal<Station[] | undefined> = signal(undefined)
  baseUrl : string = ""

  // Setea una url aleatoria de la api de radio-browser
  async setRamdonUrl(){
    
    if (!this.baseUrl) { 
      const results = await this.api.resolveBaseUrl() 
      const random = Math.floor(Math.random() * results.length) 
      this.baseUrl = `https://${results[random].name}` 
    } 
  }


 async loadRadiosInCords(name: string){
  
  await this.api.searchStations({
    
    order: 'random',
    removeDuplicates: true,
    country: name ,

  }).then(data => {
    this.radios = computed(() => data)
  })
 }

}
