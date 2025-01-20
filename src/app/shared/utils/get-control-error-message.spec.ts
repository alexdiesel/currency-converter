import {FormControl, FormGroup, Validators} from '@angular/forms';
import {getControlErrorMessage} from './get-control-error-message';

describe('getControlErrorMessage', () => {
  let formGroup: FormGroup;

  beforeEach(() => {
    formGroup = new FormGroup({
      testControl: new FormControl('', Validators.required),
    });
  });

  it('should return error message if control is required and empty', () => {
    expect(getControlErrorMessage('testControl', formGroup)).toBe('This field is required');
  });

  it('should return empty string if control is not required or has value', () => {
    formGroup.get('testControl')?.setValue('test value');
    expect(getControlErrorMessage('testControl', formGroup)).toBe('');
  });

  it('should return empty string if control does not exist in form group', () => {
    expect(getControlErrorMessage('nonExistentControl', formGroup)).toBe('');
  });

  it('should return empty string if form group is null or undefined', () => {
    expect(getControlErrorMessage('testControl', null as never)).toBe('');
    expect(getControlErrorMessage('testControl', undefined as never)).toBe('');
  });
});
