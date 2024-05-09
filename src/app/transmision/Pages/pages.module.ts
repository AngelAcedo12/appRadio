import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { TransmisionComponent } from './transmision/transmision.component';
import { LayaoutComponent } from './layaout/layaout.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    TransmisionComponent,
    LayaoutComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    ComponentsModule,
    SharedModule
  ]
})
export class PagesModule { }
