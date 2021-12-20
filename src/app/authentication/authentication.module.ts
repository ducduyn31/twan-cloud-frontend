import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in/sign-in.component';
import {SharedModule} from '../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {AuthService} from './services/auth.service';


@NgModule({
  declarations: [
    SignInComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    // AuthGuard,
  ]
})
export class AuthenticationModule {
}
