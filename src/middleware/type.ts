import { Request } from "express";

export interface IExtendRequest extends Request{
   user ?: {
    email : string,
    role : string,
    username : string | null
  }
}