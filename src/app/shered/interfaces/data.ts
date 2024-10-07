export interface email {
email:string;
}
export interface dataRegister extends logInData,email {
  name:string;
  rePasswrod:string;
  phone:string;
}

export interface logInData extends email{
  passwrod:string;
}
export interface address{
  details:string;
  phone:string;
  city:string;
}
