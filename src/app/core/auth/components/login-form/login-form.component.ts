import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { getControlErrorMessage } from '../../../../shared/utils/get-control-error-message';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth.actions';
import { selectAuthError } from '../../store/auth.selectors';
import { Router, RouterLink } from '@angular/router';
import { LoginFormControl } from '../../models/login';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: '../../styles/auth-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  LoginFormControl = LoginFormControl;
  getControlErrorMessage = getControlErrorMessage;

  private fb = inject(NonNullableFormBuilder);
  private store = inject(Store);
  private router = inject(Router);

  loginForm = this.fb.group({
    [LoginFormControl.username]: ['', [Validators.required]],
    [LoginFormControl.password]: ['', [Validators.required]],
  });

  authError$ = this.store.select(selectAuthError);

  isControlInvalid(controlName: string): boolean | undefined {
    const control = this.loginForm.get(controlName);
    return control?.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username!;
      const password = this.loginForm.value.password!;
      this.store.dispatch(login({ username, password }));
    }
  }
}
