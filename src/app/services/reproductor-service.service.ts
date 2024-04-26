import { computed, Injectable, signal, Signal } from '@angular/core';
import { stat } from 'fs';
import { Station } from 'radio-browser-api';
import { ModelSaving } from '../models/ModelSavingStorage';

@Injectable({
  providedIn: 'root'
})
export class ReproductorServiceService {

  constructor() { 
    this.loadStationInLocalStorage()
    
    this.addListertToAudio()
    
  
  }

  audio : HTMLAudioElement  = new Audio();
  actualStation : Signal<Station | undefined> = signal(undefined)
  state = signal(false)
  stationLoading = signal(false)  
  isPlaying = signal(false) 

  async play(urlSound: string, station: Station){
    this.state.update(() => false)
    this.stationLoading.update(() => false)
    this.audio.src=urlSound;
    this.audio.load()
    this.isPlaying.update(()=>false)  
    while(this.isPlaying()==false){
     
      await this.audio.play().then(() => {this.stationLoading.update(() => true);})
     
    }

    this.actualStation= computed(() => station)
    this.state.update(() => true)
    this.saveActualSong()
  }

  pause(){
    this.audio.pause()
    this.state.update(() => false)
    this.saveActualSong()
  }

  async  resume(){
    await this.audio.play()
    this.state.update(() => true)
    this.saveActualSong()
  }

  saveActualSong(){
    if(this.actualStation()==undefined) return;
   
    localStorage.setItem("actualStation",JSON.stringify({
     data: this.actualStation(),
     state:this.state() }))
  }

  loadStationInLocalStorage(){
    var station : ModelSaving = JSON.parse(localStorage.getItem("actualStation")!)
    if(station==undefined) return
    this.actualStation=computed(()=>station.data) 
    this.play(this.actualStation()!.url,this.actualStation()!)
    if(station.state==false) this.pause()
    this.state.update(()=>station.state)
    
  }

  private addListertToAudio(){
    this.audio.addEventListener("playing",()=>{

      this.isPlaying.update(()=>true)
  })
  }
}
