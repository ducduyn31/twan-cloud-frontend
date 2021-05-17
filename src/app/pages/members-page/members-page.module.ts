import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersPageComponent } from './members-page.component';
import {RouterModule} from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {NetworkModule} from '../../network/network.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [
    MembersPageComponent
  ],
  imports: [
    CommonModule,
    NetworkModule,
    RouterModule.forChild([
      {
        path: '',
        component: MembersPageComponent,
      }
    ]),
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
})
export class MembersPageModule { }
