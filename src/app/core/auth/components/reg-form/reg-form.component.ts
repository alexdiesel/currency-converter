import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {getControlErrorMessage} from '../../../../shared/utils/get-control-error-message';
import {Store} from '@ngrx/store';
import {reg} from '../../store/auth.actions';
import {selectAuthError} from '../../store/auth.selectors';
import {RouterLink} from '@angular/router';
import {RegFormControl} from '../../models/reg';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './reg-form.component.html',
  styleUrl: '../../styles/auth-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegFormComponent {

  RegFormControl = RegFormControl;
  getControlErrorMessage = getControlErrorMessage;

  private fb = inject(NonNullableFormBuilder)
  private store = inject(Store);

  regForm = this.fb.group({
      [RegFormControl.username]: ['', [Validators.required]],
      [RegFormControl.password]: ['', [Validators.required]],
      [RegFormControl.confirmPassword]: ['', [Validators.required]]
    },
    {
      validators: this.matchPasswordsValidator
    }
  );

  authError$ = this.store.select(selectAuthError);

  isControlInvalid(controlName: string): boolean | undefined {
    const control = this.regForm.get(controlName);
    return control?.invalid && (control.dirty || control.touched);
  }

  matchPasswordsValidator(controlGroup: AbstractControl): ValidationErrors | null {
    const password = controlGroup.get(RegFormControl.password)?.value;
    const confirmPassword = controlGroup.get(RegFormControl.confirmPassword)?.value;

    if (password !== confirmPassword) {
      return {matchPasswords: true};
    }

    return null;
  }

  onSubmit(): void {
    if (this.regForm.valid) {
      const username = this.regForm.value.username!;
      const password = this.regForm.value.password!;
      const confirmPassword = this.regForm.value.confirmPassword!;
      this.store.dispatch(reg({username, password, confirmPassword}));
    }
  }

}
