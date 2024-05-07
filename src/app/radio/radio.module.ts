import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadioRoutingModule } from './radio-routing.module';
import { AllRadiosComponent } from './Pages/all-radios/all-radios.component';
import { LayautRadioComponent } from './Pages/layaut-radio/layaut-radio.component';
import { Router, RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FindRadioComponent } from './Pages/find-radio/find-radio.component';
import { HistoryComponent } from './Pages/history/history.component';


@NgModule({
  declarations: [
    AllRadiosComponent,
    LayautRadioComponent,
    FindRadioComponent,
    HistoryComponent,
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
