import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayaoutComponent } from './layaout/layaout.component';
import { TransmisionComponent } from './transmision/transmision.component';

const routes: Routes = [
  {
    path:'',
    component:LayaoutComponent,
    children:[
      {
        path:'',
        component:TransmisionComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
