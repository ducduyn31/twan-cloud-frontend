import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {SharedModule} from '../../shared/shared.module';
import {AdminModule} from '../../components/admin/admin.module';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    AdminModule,
    MatExpansionModule,
  ]
})
export class DashboardModule { }
