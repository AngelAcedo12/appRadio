import { computed, Injectable, OnInit, signal, Signal } from '@angular/core';
import { stat } from 'fs';
import { Station } from 'radio-browser-api';
import { ModelSaving } from '../models/ModelSavingStorage';
import { DtoHistorySaving } from '../models/DTOs/DtoHistorySaving';
import { HttpClient } from '@angular/common/http';
import enviroment from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { error } from 'console';
import { NotificationService } from './notification-service.service';

@Injectable({
  providedIn: 'root'
})
export class ReproductorServiceService {

  constructor(private http: HttpClient, private cookieService: CookieService, private notificationService: NotificationService) {
    
  }


  audio: HTMLAudioElement  | undefined = undefined;
  actualStation: Signal<Station | undefined> = signal(undefined)
  state = signal(false)
  stationLoading = signal(false)
  numberRetries = 0


  async play(urlSound: string, station: Station) {
   if (this.audio == undefined) {
      this.audio = new Audio()
    }
    if(station.name != this.actualStation.name){

      this.numberRetries = 0
    }
    this.changeTitle(station.name)
    this.state.update(() => false)
    this.actualStation = computed(() => station)
    this.stationLoading.update(() => false)
    this.audio.src = urlSound;
    this.audio.load()
    await this.audio.play().then(() => { this.stationLoading.update(() => true); })
    this.addToHistory({ data: station})
    this.state.update(() => true)
    this.saveActualSong()
  }


  pause() {

    this.audio?.pause()
    this.state.update(() => false)
    this.saveActualSong()
  }

  async resume() {

    await this.audio?.play()
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

  retryLoadStation(url : string) {
    if (this.actualStation() == undefined) return
    if(this.audio == undefined) this.audio = new Audio()
    this.audio?.load()
    this.audio.src = url
  }
  changeTitle(title: string) {
    document.title=title
  }

  public addListertToAudio() {
    
    if (this.audio == undefined) {
      this.audio = new Audio()
    }
    this.audio.addEventListener("error", (error) => {

      if(this.audio != undefined &&  this.numberRetries < 3) {

        this.notificationService.openSnackBar({
          message: "Error al reproducir la estación, probando de otra forma...",
          duration: 2000,
          closeMessage: "Cerrar"
        })
  
        this.retryLoadStation(this.actualStation()?.urlResolved || "")
        this.numberRetries++
      }
      if(this.numberRetries == 3){
        this.notificationService.openSnackBar({
          message: "Error al reproducir la estación, prube de nuevo más tarde...",
          duration: 2000,
          closeMessage: "Cerrar"
        })
      }
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
  changeVolume(volume : number){
    this.audio!.volume = volume
  }
}
