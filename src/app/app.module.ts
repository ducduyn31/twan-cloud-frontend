import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationModule} from './authentication/authentication.module';
import {environment} from '../environments/environment';

import {AngularFireAuth, USE_EMULATOR as USE_AUTH_EMULATOR} from '@angular/fire/auth';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { DeviceListComponent } from './components/device-list/device-list.component';

export function initializeApp(afa: AngularFireAuth): any {
  return () => {
    return new Promise(resolve => {
      afa.useEmulator('http://localhost:9099/');
      setTimeout(() => resolve(true), 100);
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    DeviceListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: USE_AUTH_EMULATOR, useValue: environment.production ? undefined : ['localhost', 9099]
    },
    {
      provide: USE_FIRESTORE_EMULATOR, useValue: environment.production ? undefined : ['localhost', 8080]
    },
    // TODO: Remove on production
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AngularFireAuth],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
