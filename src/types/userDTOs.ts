export interface ICreateUserDTO {
  name: string;
  email: string;
  password?: string;
  photo?: string;
}

export interface IUpdateUserDTO {
  name?: string;
  email?: string;
  photo?: string;
}

export interface IUser {
  id?: string;
  name: string;
  password?: string;
  email: string;
  photo?: string;
}
