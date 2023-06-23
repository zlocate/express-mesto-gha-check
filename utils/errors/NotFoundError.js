import { statuses } from '../consts.js';

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = statuses.notFound;
  }

  static sendError({ res, message }) {
    res.status(statuses.notFound).send({ message });
  }
}
