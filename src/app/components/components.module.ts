import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioListsComponent } from './radio-lists/radio-lists.component';
import { StationRadioComponent } from './station-radio/station-radio.component';
import { BtnPlayComponent } from './btn-play/btn-play.component';
import { ReproductorComponent } from './reproductor/reproductor.component';



@NgModule({
  declarations: [
    RadioListsComponent,
    StationRadioComponent,
    BtnPlayComponent,
    ReproductorComponent
  ],exports:[
    RadioListsComponent,
    StationRadioComponent,
    ReproductorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
