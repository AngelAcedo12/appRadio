import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioListsComponent } from './radio-lists/radio-lists.component';
import { StationRadioComponent } from './station-radio/station-radio.component';
import { BtnPlayComponent } from './btn-play/btn-play.component';
import { ReproductorComponent } from './reproductor/reproductor.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoadingComponent } from './loading/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectCountrieComponent } from './select-countrie/select-countrie.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SelectTagListComponent } from './select-tag-list/select-tag-list.component';
import { FindBarComponent } from './find-bar/find-bar.component';
import { LblCountryComponent } from './lbl-country/lbl-country.component';
import { LblLanguageComponent } from './lbl-language/lbl-language.component';
import { LblTagsComponent } from './lbl-tags/lbl-tags.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { ImgSelectedComponent } from './imgSelected/imgSelected.component';
import { OpcionMenuComponent } from './opcionMenu/opcionMenu.component';
import { RecomendationUserComponent } from './recomendation-user/recomendation-user.component';
import { RecomendationItemComponent } from './recomendation-item/recomendation-item.component';
import { MapComponent } from './map/map.component';
import { FindBarByAutocompleteComponent } from './find-bar-by-autocomplete/find-bar-by-autocomplete.component';
import { TransmisionListComponent } from './transmision-list/transmision-list.component';
import { MenuCreateTransmisionComponent } from './menu-create-transmision/menu-create-transmision.component';
import { ModeCarComponent } from './mode-car/mode-car.component';
import { InstallAppComponent } from './install-app/install-app.component';
import { NotificationErrorComponent } from './notifications/notification-error/notification-error.component';
import { NotificationModuleModule } from './notifications/notification-module.module';




@NgModule({
  declarations: [
    RadioListsComponent,
    StationRadioComponent,
    BtnPlayComponent,
    ReproductorComponent,
    LoadingComponent,
    SelectCountrieComponent,
    SelectTagListComponent,
    FindBarComponent,
    LblCountryComponent,
    LblLanguageComponent,
    LblTagsComponent,
    ErrorMessageComponent,
    ImgSelectedComponent,
    OpcionMenuComponent,
    RecomendationUserComponent,
    RecomendationItemComponent,
    MapComponent,
    FindBarByAutocompleteComponent,
    TransmisionListComponent,
    MenuCreateTransmisionComponent,
    ModeCarComponent,
    InstallAppComponent,
   
    
    
  ],exports:[
    RadioListsComponent,
    StationRadioComponent,
    ReproductorComponent,
    LoadingComponent,
    LblCountryComponent,
    LblTagsComponent,
    LblLanguageComponent,
    ErrorMessageComponent,
    ImgSelectedComponent,
    OpcionMenuComponent,
    RecomendationUserComponent,
    MapComponent,
    TransmisionListComponent,
    MenuCreateTransmisionComponent,
    ModeCarComponent,
    InstallAppComponent,
    NotificationModuleModule
    
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
  ],providers:[
  ]
})
export class ComponentsModule { }
