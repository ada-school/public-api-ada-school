import { NextFunction, Response } from 'express';
import { SECRET_KEY } from 'server/config';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, JWTPayload } from 'server/todo-api/types';
const existAuthorization = (
  authorization: string | undefined
): authorization is string => {
  return authorization !== undefined;
};
const authJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authorization = req.headers.authorization;

  if (!existAuthorization(authorization)) {
    res
      .status(401)
      .json({ message: 'there is not authorization header provided' });
    return;
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token is provided' });
    return;
  }

  jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) {
      res.status(401).json({ message: error });
      return;
    }

    const decodedToken = decoded as JWTPayload;
    req.createdBy = decodedToken.meta.scid;
    next();
  });
};

export default authJWT;