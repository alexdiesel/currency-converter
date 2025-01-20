import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {LoginFormControl} from '../../typings/enums/login-form-control.enum';
import {getControlErrorMessage} from '../../../../utils/get-control-error-message';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,

  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {

  LoginFormControl = LoginFormControl;
  getControlErrorMessage = getControlErrorMessage;

  private fb = inject(NonNullableFormBuilder)

  loginForm = this.fb.group({
    [LoginFormControl.username]: ['', [Validators.required]],
    [LoginFormControl.password]: ['', [Validators.required]]
  });

  hide = signal(true);

  togglePassInputTupe(event: Event): void {
    event.preventDefault();
    this.hide.set(!this.hide());
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;

      // TODO successful login
      this.loginForm.reset();

      // TODO unsuccessful login

    }
  }

}
