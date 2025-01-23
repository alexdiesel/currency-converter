export interface RegForm {
  username: string;
  password: string;
  confirmPassword: string;
}

export enum RegFormControl {
  username = 'username',
  password = 'password',
  confirmPassword = 'confirmPassword',
}
