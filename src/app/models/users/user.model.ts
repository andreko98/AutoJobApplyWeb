export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  about: string;
  cvPath: string;
  emailCredentialId?: number;
}
