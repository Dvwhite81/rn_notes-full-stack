export {};

export interface BasicUserInfo {
  id: number;
  username: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: BasicUserInfo | null;
      token?: string | null;
    }
  }
}
