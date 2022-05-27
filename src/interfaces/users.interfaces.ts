export interface IUser {
  id?: number;
  name: string;
  email: string;
}

export interface IUserWithCredentials extends IUser {
  password: string,
}

export interface IUserEditParams {
  name?: string;
  email?: string;
  password?: string;
}
