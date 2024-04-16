import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioListsComponent } from './radio-lists/radio-lists.component';
import { StationRadioComponent } from './station-radio/station-radio.component';



@NgModule({
  declarations: [
    RadioListsComponent,
    StationRadioComponent
  ],exports:[
    RadioListsComponent,
    StationRadioComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
