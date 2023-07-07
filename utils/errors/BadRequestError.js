import { statuses } from '../consts.js';

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = statuses.badRequest;
  }
}
