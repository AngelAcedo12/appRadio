import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { LayautComponent } from './layaut/layaut.component';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProfileComponent,
    LayautComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
