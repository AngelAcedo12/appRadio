import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, Signal } from '@angular/core';
import { Coords } from '../models/Coords';
import { RadioBrowserApi, Station } from 'radio-browser-api';
import { CountrysService } from './countries.service';
import enviroment from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationRadiosService {
  constructor(
    private http: HttpClient,
    private countriesService: CountrysService
  ) {
    if (true) {
      this.resolveURL();
      this.api = new RadioBrowserApi('My Radio Browser API Key');
      this.api.setBaseUrl(this.baseUrl);
      console.log(this.api.getBaseUrl());
    }
  }

  api: RadioBrowserApi = new RadioBrowserApi('My Radio Browser API Key');
  radios: Signal<Station[] | undefined> = signal(undefined);
  baseUrl = '';
  // Setea una url aleatoria de la api de radio-browser
  async resolveURL() {
    const results = await fetch(
      'https://all.api.radio-browser.info/json/servers'
    ).then((res) => res.json());
    const random = Math.floor(Math.random() * results.length);
    if (enviroment.prodution) {
      this.baseUrl = `https://${results[random].name}`;
    } else {
      this.baseUrl = `http://${results[random].name}`;
    }
  }

  async loadRadiosInCords(name: string) {
    await this.api
      .searchStations({
        order: 'random',
        removeDuplicates: true,
        country: name,
      })
      .then((data) => {
        this.radios = computed(() => data);
      });
  }
  recomendations() {
    return this.api
      .searchStations({
        country:
          this.countriesService.actualSearchCountry()?.name.common ?? 'Spain',
        reverse: true,
        order: 'votes',
        limit: 30,
      })
      .then((data) => {
        return data;
      });
  }
}
