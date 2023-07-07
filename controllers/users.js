import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { NotFoundError, BadRequestError } from '../utils/errors/index.js';
import { messages } from '../utils/consts.js';

export const createUser = (req, res, next) => {
  const {
    name, about, avatar, password, email,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send(user))
    .catch(next);
};

export const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

export const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError(messages.user.notFound);
    })
    .then((user) => res.send(user))
    .catch(next);
};

export const getCurrentUser = async (req, res, next) => {
  const userId = req?.user?._id;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError(messages.user.notFound);
    })
    .then((user) => res.send(user))
    .catch(next);
};

export const updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { name, about, avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};
