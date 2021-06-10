export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserInfo {
  userId: string;
  account: string;
  displayName: string;
  email: string;
  avatar: string;
  updatedAt: string;
  createdAt: string;
}

export interface IAuthData extends IUserInfo {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface IAuthContext {
  user: IAuthData;

  /**
   * Login with payload
   * @param payload username and password
   */
  logIn(payload: IUserLogin): Promise<void>;

  /**
   * Log out and clear stored user data
   */
  logOut(): void;

  /**
   * Verify stored access token
   */
  verifyToken(): Promise<void>;
}

export interface IUserCreate {
  username: string;
  password: string;
}

export interface IUserChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface IUserUpdatable {
  displayName?: string;
  email?: string;
}
