import { computed, Injectable, signal, Signal } from '@angular/core';
import { Station } from 'radio-browser-api';

@Injectable({
  providedIn: 'root'
})
export class ReproductorServiceService {

  constructor() { }
  audio = new Audio();
  actualStation : Signal<Station | undefined> = signal(undefined)

  play(urlSound: string, station: Station){
    
    this.audio.src=urlSound;
    this.audio.play()
    this.actualStation= computed(() => station)
  }

  pause(){
    this.audio.pause()
    
  }

}
