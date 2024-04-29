import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayautRadioComponent } from './Pages/layaut-radio/layaut-radio.component';
import { AllRadiosComponent } from './Pages/all-radios/all-radios.component';
import { FindRadioComponent } from './Pages/find-radio/find-radio.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { HistoryComponent } from './Pages/history/history.component';

const routes: Routes = [{
  path:'',
  component:LayautRadioComponent,
  children:[
    {
      path:'',
      component:AllRadiosComponent,

    },
    {
      path:'history',
      component:HistoryComponent
    },
    {
      path:'station/:id',
      component:FindRadioComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadioRoutingModule { }
