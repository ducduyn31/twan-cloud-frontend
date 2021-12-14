import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationModule} from './authentication/authentication.module';
import {DeviceListComponent} from './components/device-list/device-list.component';
import {AddDeviceComponent} from './components/add-device/add-device.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environments/environment";
import {provideAppCheck} from "@angular/fire/app-check";

@NgModule({
  declarations: [
    AppComponent,
    DeviceListComponent,
    AddDeviceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatListModule,
    DragDropModule,
    MatTableModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
