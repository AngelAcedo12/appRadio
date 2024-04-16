import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadioRoutingModule } from './radio-routing.module';
import { AllRadiosComponent } from './Pages/all-radios/all-radios.component';
import { LayautRadioComponent } from './Pages/layaut-radio/layaut-radio.component';
import { Router, RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    AllRadiosComponent,
    LayautRadioComponent
  ],
  imports: [
    CommonModule,
    RadioRoutingModule,
    RouterModule,
    ComponentsModule
  ]
})
export class RadioModule { }
