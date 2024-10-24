import { Express, Request } from "express";

// interface Request<
//   P = core.ParamsDictionary,
//   ResBody = any,
//   ReqBody = any,
//   ReqQuery = core.Query,
// > extends core.Request<P, ResBody, ReqBody, ReqQuery> {}

declare global {
  namespace Express {
    export interface Request {
      isAdmin?: any; // You can also make it required by removing the '?'.
      userId: Int;
      author: Int;
    }
  }
}

// declare namespace Express {
//   export interface Request {
//     isAdmin?: any;
//   }
// }
