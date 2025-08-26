import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { signUpReq } from "./types";

// extend Express request type to include user
export interface AuthRequest extends Request {
  user?: signUpReq|JwtPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Expect header format: "Bearer <token>"
    const token = authHeader;
    if (!token) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    // Verify token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded?.username// attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};