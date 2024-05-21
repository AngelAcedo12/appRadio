import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MenuComponent,
    NotFoundComponent
  ],exports:[
    MenuComponent,
    NotFoundComponent,

  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
