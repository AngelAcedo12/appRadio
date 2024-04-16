import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayautRadioComponent } from './Pages/layaut-radio/layaut-radio.component';
import { AllRadiosComponent } from './Pages/all-radios/all-radios.component';
import { CountrisStationsComponent } from './Pages/countris-stations/countris-stations.component';
import { CountrisStationFilterComponent } from './Pages/countris-station-filter/countris-station-filter.component';

const routes: Routes = [{
  path:'',
  component:LayautRadioComponent,
  children:[
    {
      path:'',
      component:AllRadiosComponent
    },
    {
      path:'countries',
      component:  CountrisStationsComponent
    },
    {
      path:'countries/:countrie',
      component:CountrisStationFilterComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadioRoutingModule { }
