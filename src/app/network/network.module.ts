import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NetworkGeneralService} from './network-general/network-general.service';
import {HttpClientModule} from '@angular/common/http';
import {NetworkServiceService} from './service-general/network-service.service';
import {NetworkMemberService} from './network-member/network-member.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    NetworkGeneralService,
    NetworkServiceService,
    NetworkMemberService,
  ]
})
export class NetworkModule { }
