import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPageComponent } from './detail-page.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    DetailPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DetailPageComponent,
      }
    ])
  ]
})
export class DetailPageModule { }
