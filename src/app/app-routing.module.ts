import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'radio',
    loadChildren: () => import("./radio/radio.module").then(m => m.RadioModule)

  },
  {
    path:'oauth',
    loadChildren: () => import("./oauth/Pages/pages.module").then(m => m.PagesModule)
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'radio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
