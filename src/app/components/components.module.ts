import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioListsComponent } from './radio-lists/radio-lists.component';
import { StationRadioComponent } from './station-radio/station-radio.component';
import { BtnPlayComponent } from './btn-play/btn-play.component';
import { ReproductorComponent } from './reproductor/reproductor.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoadingComponent } from './loading/loading.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectCountrieComponent } from './select-countrie/select-countrie.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SelectTagListComponent } from './select-tag-list/select-tag-list.component';



@NgModule({
  declarations: [
    RadioListsComponent,
    StationRadioComponent,
    BtnPlayComponent,
    ReproductorComponent,
    LoadingComponent,
    SelectCountrieComponent,
    SelectTagListComponent
  ],exports:[
    RadioListsComponent,
    StationRadioComponent,
    ReproductorComponent,
    LoadingComponent
  ],
  imports: [
    
    CommonModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
  ],providers:[
  ]
})
export class ComponentsModule { }
