import { AuthException } from "../exceptions/authException";
import jwt, { JwtPayload, SignOptions, Algorithm } from "jsonwebtoken";
import { secrets } from "../secrets";

export const verifyToken = async (token: string) => {
  try {
    return await jwt.verify(token.trim(), secrets.JWT_SECRET);
  } catch (error: any) {
    throw new AuthException("Token Error", error);
  }
};

export const createToken = async (tokenData: object) => {
  try {
    const signOptions: SignOptions = {
      algorithm: secrets.JWT_HASH as Algorithm,
      expiresIn: secrets.JWT_EXPIRE,
    };
    return jwt.sign(tokenData, secrets.JWT_SECRET, signOptions);
  } catch (error) {}
};
