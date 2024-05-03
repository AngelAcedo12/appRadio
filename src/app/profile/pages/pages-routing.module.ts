import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayautComponent } from './layaut/layaut.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

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
        path:'changePassword',
        component:ChangePasswordComponent
      },
      {
        path:'editProfile',
        component:EditProfileComponent
      },
      {
        path:':name',
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
