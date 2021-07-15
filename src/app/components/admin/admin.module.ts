import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {PortalModule} from '@angular/cdk/portal';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AdminComponent,
  ],
  exports: [
    AdminComponent
  ],
    imports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        PortalModule,
        MatButtonModule,
    ]
})
export class AdminModule { }
