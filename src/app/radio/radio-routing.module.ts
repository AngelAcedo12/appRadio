import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayautRadioComponent } from './Pages/layaut-radio/layaut-radio.component';
import { AllRadiosComponent } from './Pages/all-radios/all-radios.component';
import { FindRadioComponent } from './Pages/find-radio/find-radio.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';

const routes: Routes = [{
  path:'',
  component:LayautRadioComponent,
  children:[
    {
      path:'',
      component:AllRadiosComponent,

    },
    {
      path:':id',
      component:FindRadioComponent
    },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadioRoutingModule { }
