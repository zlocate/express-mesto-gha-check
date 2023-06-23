import { User } from '../models/user.js';
import { NotFoundError, handleDefaultError, BadRequestError } from '../utils/errors/index.js';
import { messages } from '../utils/consts.js';

export const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        BadRequestError
          .sendError({ res, message: messages.user.createBadData });
        return;
      }
      handleDefaultError(res);
    });
};

export const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => handleDefaultError(res));
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error instanceof NotFoundError) {
        NotFoundError
          .sendError({ res, message: messages.user.notFound });
        return;
      }

      if (error.name === 'CastError') {
        BadRequestError
          .sendError({ res, message: messages.common.badId });
        return;
      }

      handleDefaultError(res);
    });
};

export const updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  const id = req.user._id;

  if (Object.keys(req.body).some((key) => !(key in User.schema.obj))) {
    const requestFields = Object.keys(req.body).join(', ');
    const schemaFields = Object.keys(User.schema.obj).join(', ');

    BadRequestError
      .sendError({
        res,
        message: messages.user.updateWrongFields,
        payload: `Поля ${requestFields} не соответствуют ${schemaFields}`,
      });
    return;
  }

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
    .catch((error) => {
      if (error.name === 'CastError') {
        BadRequestError
          .sendError({ res, message: messages.common.badId });
        return;
      }

      if (error instanceof NotFoundError) {
        NotFoundError
          .sendError({ res, message: messages.user.notFound });
        return;
      }

      if (error.name === 'ValidationError') {
        BadRequestError
          .sendError({ res, message: messages.user.updateBadData });
        return;
      }

      handleDefaultError(res);
    });
};
