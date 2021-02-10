export enum FormFields {
  EMAIL="email",
  PASSWORD="password",
}

export interface IFormValues {
  [FormFields.EMAIL]: string;
  [FormFields.PASSWORD]: string;
}
