import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface ReqType extends Request {
  user: any;
  token: any;
}

export interface CustomJwtPayload extends JwtPayload {
  _id: string;
}
