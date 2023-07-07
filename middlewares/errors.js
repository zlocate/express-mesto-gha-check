import { messages, statuses } from '../utils/consts.js';

export const errorsMiddleware = (error, req, res, next) => {
  const { statusCode = 500, message = '' } = error;

  if (error.code === 11000) {
    res.status(statuses.conflict).send({ message: messages.user.conflictEmail });
    return;
  }

  res.status(statusCode).send({ message });

  next();
};
