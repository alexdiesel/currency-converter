import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AsyncPipe, NgIf} from '@angular/common';
import {LoginFormControl} from '../../models/login-form-control.enum';
import {getControlErrorMessage} from '../../../../shared/utils/get-control-error-message';
import {Store} from '@ngrx/store';
import {login} from '../../store/auth.actions';
import {selectAuthError} from '../../store/auth.selectors';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {

  LoginFormControl = LoginFormControl;
  getControlErrorMessage = getControlErrorMessage;

  private fb = inject(NonNullableFormBuilder)
  private store = inject(Store);
  private router = inject(Router);

  authError = signal<string | null>(null);

  loginForm = this.fb.group({
    [LoginFormControl.username]: ['', [Validators.required]],
    [LoginFormControl.password]: ['', [Validators.required]]
  });

  authError$ = this.store.select(selectAuthError)
    .pipe(
      tap(error => this.authError.set(error))
    );

  isAuthenticated$ = this.store.select(selectAuthError)
    .pipe(
      tap(isAuthenticated => isAuthenticated && this.router.navigate(['/currency-converter-'])),
    );

  isControlInvalid(controlName: string): boolean | undefined {
    const control = this.loginForm.get(controlName);
    return control?.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username!;
      const password = this.loginForm.value.password!;
      this.store.dispatch(login({username, password}));
    }
  }

}
