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
    path:'profile',
    loadChildren: () => import("./profile/pages/pages.module").then(m => m.PagesModule),
    canActivate: [oauthGuard]
  },
  {
    path:'transmision',
    loadChildren: () => import("./transmision/Pages/pages.module").then(m => m.PagesModule),
    canActivate: [oauthGuard]
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'radio'
  },
  {
    path:'**',
    loadComponent: () => import("./shared/not-found/not-found.component").then(m => m.NotFoundComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableViewTransitions:true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
