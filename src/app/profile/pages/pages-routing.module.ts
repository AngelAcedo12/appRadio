import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayautComponent } from './layaut/layaut.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: LayautComponent,
    children: [
      {
        path:'',
        component:ProfileComponent
      },
      {
        path:'name',
        component:ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
