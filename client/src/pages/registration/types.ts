export enum FormFields {
  NAME="name",
  EMAIL="email",
  PASSWORD="password",
  CONFIRM_PASSWORD="confirm_password",
}

export interface IFormValues {
  [FormFields.NAME]: string;
  [FormFields.EMAIL]: string;
  [FormFields.PASSWORD]: string;
  [FormFields.CONFIRM_PASSWORD]: string;
}
