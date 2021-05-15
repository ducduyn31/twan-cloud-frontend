import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPageComponent } from './detail-page.component';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {NetworkModule} from '../../network/network.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



@NgModule({
  declarations: [
    DetailPageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild([
      {
        path: '',
        component: DetailPageComponent,
      }
    ]),
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    NetworkModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
  ]
})
export class DetailPageModule { }
