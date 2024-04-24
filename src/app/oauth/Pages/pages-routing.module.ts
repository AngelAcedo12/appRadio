import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayautComponent } from './layaut/layaut.component';
import { SingUpComponent } from './sing-up/sing-up.component';

import { LogInComponent } from './log-in/log-in.component';

const routes: Routes = [
  {
    path:'',
    component:LayautComponent,
    children:[
      {
        path:'singUp',
        component:SingUpComponent
      },
      {
        path:'logIn',
        component:LogInComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
