import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { ResponseError } from 'helpers/errors';

function verifyToken(token: string) {
  return new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) reject(err);
      else resolve(decodedToken);
    }),
  );
}

async function access(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new ResponseError('Token is required.', 401));
  }

  const accessToken = authorization.split(' ')[1];

  try {
    await verifyToken(accessToken);
  } catch (error) {
    return next(new ResponseError('Token is invalid.', 401));
  }

  next();
}

export default access;
