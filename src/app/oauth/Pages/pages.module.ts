import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LayautComponent } from './layaut/layaut.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { NotSelectedComponent } from './not-selected/not-selected.component';
import { LogInComponent } from './log-in/log-in.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayautComponent,
    SingUpComponent,
    NotSelectedComponent,
    LogInComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
