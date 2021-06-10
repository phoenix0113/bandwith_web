export enum FormFields {
  EMAIL="email",
  PASSWORD="password",
  ROLE="role",
}

export interface IFormValues {
  [FormFields.EMAIL]: string;
  [FormFields.PASSWORD]: string;
  [FormFields.ROLE]: string;
}
