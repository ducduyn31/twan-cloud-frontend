import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NetworkGeneralService} from './network-general/network-general.service';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    NetworkGeneralService
  ]
})
export class NetworkModule { }
