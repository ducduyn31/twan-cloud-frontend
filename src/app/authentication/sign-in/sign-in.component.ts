import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent {

  signInFormGroup: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(8)]]
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }

  get getControl(): { [key: string]: AbstractControl } {
    return this.signInFormGroup.controls;
  }

  onLoginRequest(): void {
    const emailPassword = Object.values(this.getControl).map((control) => {
      return control.value;
    });

    // @ts-ignore
    this.authService.signIn(...emailPassword);
  }
}
