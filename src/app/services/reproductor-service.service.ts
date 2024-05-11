import { computed, Injectable, OnInit, signal, Signal } from '@angular/core';
import { stat } from 'fs';
import { Station } from 'radio-browser-api';
import { ModelSaving } from '../models/ModelSavingStorage';
import { DtoHistorySaving } from '../models/DTOs/DtoHistorySaving';
import { HttpClient } from '@angular/common/http';
import enviroment from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ReproductorServiceService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
    
  }


  audio: HTMLAudioElement  = new Audio();
  actualStation: Signal<Station | undefined> = signal(undefined)
  state = signal(false)
  stationLoading = signal(false)


  async play(urlSound: string, station: Station) {
   
     
    this.audio.title = station.name
    this.state.update(() => false)
    this.stationLoading.update(() => false)
    this.audio.src = urlSound;
    this.audio.load()
    await this.audio.play().then(() => { this.stationLoading.update(() => true); })
    this.addToHistory({ data: station})
    this.actualStation = computed(() => station)
    this.state.update(() => true)
    this.saveActualSong()
  }

  pause() {
 
    this.audio.pause()
    this.state.update(() => false)
    this.saveActualSong()
  }

  async resume() {

    await this.audio.play()
    this.state.update(() => true)
    this.saveActualSong()
  }

  saveActualSong() {
    if (this.actualStation() == undefined) return;

    localStorage.setItem("actualStation", JSON.stringify({
      data: this.actualStation(),
      state: this.state()
    }))
  }

  loadStationInLocalStorage() {


    var station: ModelSaving = JSON.parse(localStorage.getItem("actualStation")!)
    
    if (station == undefined) return
    this.actualStation = computed(() => station.data)
    this.play(this.actualStation()!.url, this.actualStation()!)
    if (station.state == false) this.pause()
    this.state.update(() => station.state)
    this.setColor()
  }

  public addListertToAudio() {
    
    if (this.audio == undefined) {
      this.audio = new Audio()
    }
    this.audio.addEventListener("error", (error) => {
      console.log(error)
      this.stationLoading.update(() => false)
    })
    
    this.audio.addEventListener("playing", () => {
      this.state.update(() => true)
      this.setColor()

    })
    this.audio.addEventListener("pause", () => {
      this.state.update(() => false)
      this.setColor()
    })
    this.audio.addEventListener("play", () => {
      this.state.update(() => true)
      this.setColor()
    })
    
  }

  private setColor() {
    if (this.state() == true) {
      document.getElementById("rep")?.classList.replace("desactive", "active")
    } else {
      document.getElementById("rep")?.classList.replace("active", "desactive")
    }

  }
  
  private addToHistory(history: DtoHistorySaving) {

      const body= {
        history: history

      }
      const token = this.cookieService.get("oauth-token-app-radio")
      const headers = {
        'Authorization': `${token}`
      }
    
     this.http.post<any>(`${enviroment.base_url_local}api/user/history`, {
        headers: headers,
        body: body
     }).subscribe((res) => {
      
    })
  }
}
