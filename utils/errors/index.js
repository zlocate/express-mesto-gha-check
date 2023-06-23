import { messages, statuses } from '../consts.js';
import { BadRequestError } from './BadRequestError.js';
import { NotFoundError } from './NotFoundError.js';

const handleDefaultError = (res) => {
  res.status(statuses.default).send({ message: messages.common.serverError });
};

export {
  handleDefaultError,
  NotFoundError,
  BadRequestError,
};
