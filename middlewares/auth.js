import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors/index.js';
import { SECRET_KEY } from '../env.config.js';

export const authMiddleware = (req, res, next) => {
  const { jwt: token } = req.cookies;

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
