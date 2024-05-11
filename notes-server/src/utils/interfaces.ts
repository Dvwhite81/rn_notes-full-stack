import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface ReqType extends Request {
  user: any;
  token: any;
}

export interface CustomJwtPayload extends JwtPayload {
  _id: string;
}

export interface NoteModel {
  id: number;
  title: string;
  content: string;
  userId: number;
  User: UserModel;
}

export interface UserModel {
  id: number;
  username: string;
  password: string;
  Note: NoteModel[];
}
