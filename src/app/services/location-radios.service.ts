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
   
    this.api.setBaseUrl(this.baseUrl)
   }

  api  : RadioBrowserApi = new RadioBrowserApi("My Radio Browser API Key")
  radios : Signal<Station[] | undefined> = signal(undefined)
  baseUrl : string = "https://at1.api.radio-browser.info"

  // Setea una url aleatoria de la api de radio-browser
  async setRamdonUrl(){
    
    if (!this.baseUrl) { 
      const results = await this.api.resolveBaseUrl() 
      const random = Math.floor(Math.random() * results.length) 
      this.baseUrl = `http://${results[random].name}` 
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
  recomendations(){
    return this.api.searchStations({
      country: this.countriesService.actualSearchCountry()?.name.common ?? "Spain",
      reverse: true,
      order: 'votes',
      limit: 30
    }).then(data => {
      return data
    })
  }

}
