import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadioRoutingModule } from './radio-routing.module';
import { AllRadiosComponent } from './Pages/all-radios/all-radios.component';
import { LayautRadioComponent } from './Pages/layaut-radio/layaut-radio.component';
import { Router, RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { CountrisStationsComponent } from './Pages/countris-stations/countris-stations.component';
import { CountrisStationFilterComponent } from './Pages/countris-station-filter/countris-station-filter.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AllRadiosComponent,
    LayautRadioComponent,
    CountrisStationsComponent,
    CountrisStationFilterComponent
  ],
  imports: [
    CommonModule,
    RadioRoutingModule,
    RouterModule,
    ComponentsModule,
    SharedModule,
  

  ]
})
export class RadioModule { }
