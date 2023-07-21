import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors/index.js';
import { SECRET_KEY } from '../env.config.js';

export const authMiddleware = (req, res, next) => {
  console.log(`Jwt Secret ${SECRET_KEY}`)
  const { jwt:jwtCookie } = req.cookies;
  const { authorization } = req.headers;
  const token = jwtCookie || authorization?.replace('Bearer ', '');
  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
