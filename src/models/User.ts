export interface ISignup {
  userName: string;
  email: string;
  password: string;
}

export class TokenRefreshRequest {
  refreshToken!: string;
}
export class TokenRefreshResponse extends TokenRefreshRequest {
  accessToken!: string ;
}

export interface IForm {
  userName: string;
  password: string;
}
export interface LoginResponse {
  id: string;
  accessToken: string;
  refreshToken: string;
}
