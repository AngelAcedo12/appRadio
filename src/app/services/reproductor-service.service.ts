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
      
  }
  audio = new Audio();
  actualStation : Signal<Station | undefined> = signal(undefined)
  state = signal(false)

  play(urlSound: string, station: Station){
    
    this.audio.src=urlSound;
    this.audio.play()
    this.actualStation= computed(() => station)
    this.state.update(() => true)
    this.saveActualSong()
  }

  pause(){
    this.audio.pause()
    this.state.update(() => false)
    this.saveActualSong()
  }

  resume(){
    this.audio.play()
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
}
