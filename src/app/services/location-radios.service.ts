import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, Signal } from '@angular/core';
import { Coords } from '../models/Coords';
import { RadioBrowserApi, Station } from 'radio-browser-api';
import { CountrysService } from './countries.service';
import enviroment from '../../environments/environment';
import { RadioBrowserApiCustom } from '../models/RadioBroswerApiCustom';

@Injectable({
  providedIn: 'root',
})
export class LocationRadiosService {
  constructor(
    private http: HttpClient,
    private countriesService: CountrysService
  ) {}

  private apiInitialized = signal(false);
  api: RadioBrowserApi | undefined;
  radios: Signal<Station[] | undefined> = signal(undefined);
  baseUrl = '';

  // Setea una url aleatoria de la api de radio-browser
  private async resolveURL() {
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

  async createApi() {
    if (!this.apiInitialized()) {
      await this.resolveURL();
      this.api = new RadioBrowserApiCustom('My Radio Browser API Key', this.baseUrl);
      this.apiInitialized.set(true);
    }
    return this.api;
  }

  async ensureApiInitialized() {
    if (!this.apiInitialized()) {
      await this.createApi();
    }
  }

  async loadRadiosInCords(name: string) {
    await this.ensureApiInitialized();
    if (this.api) {
      const data = await this.api.searchStations({
        order: 'random',
        removeDuplicates: true,
        country: name,
      });
      this.radios = computed(() => data);
    }
  }

  async recomendations() {
    await this.ensureApiInitialized();
    if (this.api) {
      return this.api.searchStations({
        country: this.countriesService.actualSearchCountry()?.name.common ?? 'Spain',
        reverse: true,
        order: 'votes',
        limit: 30,
      });
    }
    return [];
  }
}
