import { statuses } from '../consts.js';
import { BadRequestError } from './BadRequestError.js';
import { NotFoundError } from './NotFoundError.js';

const handleDefaultError = ({ res, error }) => {
  res.status(statuses.default).send({ message: error });
};

export {
  handleDefaultError,
  NotFoundError,
  BadRequestError,
};
