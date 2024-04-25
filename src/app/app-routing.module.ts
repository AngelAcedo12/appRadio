import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { oauthGuard } from './guards/oauth.guard';

const routes: Routes = [
  {
    path:'radio',
    loadChildren: () => import("./radio/radio.module").then(m => m.RadioModule),
    canActivate: [oauthGuard]
  },
  {
    path:'oauth',
    loadChildren: () => import("./oauth/Pages/pages.module").then(m => m.PagesModule)
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'radio'
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
