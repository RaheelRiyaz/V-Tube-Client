export interface LoginRequest {
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
