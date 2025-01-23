import { FormGroup } from '@angular/forms';

export const getControlErrorMessage = (controlName: string, formGroup: FormGroup): string => {
  const control = formGroup.get(controlName);
  if (control?.hasError('required')) {
    return 'This field is required';
  }
  return '';
};
