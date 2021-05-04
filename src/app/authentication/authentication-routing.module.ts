import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';

const routes: Routes = [
  {
    path: 'log-in',
    component: SignInComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'log-in',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
