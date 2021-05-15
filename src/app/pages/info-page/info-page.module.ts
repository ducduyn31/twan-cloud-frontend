import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoPageComponent} from './info-page.component';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {NetworkModule} from '../../network/network.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    InfoPageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatGridListModule,
    MatChipsModule,
    NetworkModule,
    MatProgressBarModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: InfoPageComponent,
      }
    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class InfoPageModule { }
