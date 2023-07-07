import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { UnauthorizedError, NotFoundError } from '../utils/errors/index.js';
import { messages } from '../utils/consts.js';
import { SECRET_KEY } from '../env.config.js';

export const login = (req, res, next) => {
  const { password, email } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new NotFoundError(messages.user.notFound);
    })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(messages.user.loginBadData);
          }
          const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
            expiresIn: '7d',
          });
          res
            .cookie('jwt', token, {
              maxAge: 3600000,
              httpOnly: true,
              sameSite: true, // добавили опцию
            });
          res.send({ message: 'Вы успешно авторизавались' });
        })
        .catch(next);
    })
    .catch(next);
};
