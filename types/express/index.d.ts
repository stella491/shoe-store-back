import type { HydratedDocument } from "mongoose";
import type { IUser } from "../models.js";

export type SafeUser = HydratedDocument<Omit<IUser, "password">>;

declare global {
  namespace Express {
    interface Request {
      user?: SafeUser;
    }
  }
}

export {};
