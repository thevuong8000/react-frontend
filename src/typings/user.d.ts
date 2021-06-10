export interface IUserLogin {
  username: string;
  password: string;
}

export interface IAuthContext {
  user: object;

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
