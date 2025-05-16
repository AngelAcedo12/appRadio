import { Component, inject, OnInit } from '@angular/core';
import { ReproductorServiceService } from '../../../services/reproductor-service.service';
import { ActivatedRoute } from '@angular/router';
import { RadioBrowserApi, Station } from 'radio-browser-api';
import { stat } from 'fs';
import { LocationRadiosService } from '../../../services/location-radios.service';

@Component({
  selector: 'app-find-radio',
  templateUrl: './find-radio.component.html',
  styleUrl: './find-radio.component.css',
})
export class FindRadioComponent implements OnInit {
  private radioService = inject(ReproductorServiceService);
  private router = inject(ActivatedRoute);
  private locationRadioService = inject(LocationRadiosService);
  
  id: string | undefined;
  station: Station | undefined;
  favicon: String | undefined;

  async ngOnInit(): Promise<void> {
    this.id = this.router.snapshot.params['id'];
    await this.getStation();
    this.setFavicon();
  }

  async getStation() {
    if (this.id !== undefined) {
      await this.locationRadioService.ensureApiInitialized();
      const data = await this.locationRadioService.api?.getStationsById([this.id]);
      if (data && data.length > 0) {
        this.station = data[0];
      }
    }
  }

  setFavicon() {
    if (!this.station) return '../../../assets/icons8-radio-50.png';
    if (this.favicon === this.station.favicon) return;
    return this.station.favicon.length > 0
      ? this.station.favicon
      : '../../../assets/icons8-radio-50.png';
  }
}
