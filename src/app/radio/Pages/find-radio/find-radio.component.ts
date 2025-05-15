import { Component, inject, OnInit } from '@angular/core';
import { ReproductorServiceService } from '../../../services/reproductor-service.service';
import { ActivatedRoute } from '@angular/router';
import { RadioBrowserApi, Station } from 'radio-browser-api';
import { stat } from 'fs';

@Component({
  selector: 'app-find-radio',
  templateUrl: './find-radio.component.html',
  styleUrl: './find-radio.component.css',
})
export class FindRadioComponent implements OnInit {
  private radioService = inject(ReproductorServiceService);
  private router = inject(ActivatedRoute);

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.getStation();
    this.setFavicon();
  }

  id: string | undefined;
  api: RadioBrowserApi = new RadioBrowserApi('My api');
  station: Station | undefined;
  favicon: String | undefined;

  getStation() {
    if (this.id != undefined) {
      this.api.getStationsById([this.id]).then((data) => {
        this.station = data[0];
      });
    }
  }

  setFavicon() {
    if (this.favicon === this.station!.favicon) return;
    return this.station!.favicon.length > 0
      ? this.station?.favicon
      : '../../../assets/icons8-radio-50.png';
  }
}
