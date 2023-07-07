import { statuses } from '../consts.js';

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = statuses.notFound;
  }
}
