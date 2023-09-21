import { httpStatusCodes } from "./statusCode";

export class BaseError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);

    this.status = status;

    Object.setPrototypeOf(this, BaseError.prototype);
  }
}

export class NotFound extends BaseError {
  object: string;

  constructor(object: string) {
    super(`${object} not found`, httpStatusCodes.NOT_FOUND);

    this.object = object;

    Object.setPrototypeOf(this, NotFound.prototype);
  }
}

export class Conflict extends BaseError {
  object: string;

  constructor(object: string) {
    super(`${object} conflict in the request`, httpStatusCodes.CONFLICT);

    this.object = object;

    Object.setPrototypeOf(this, Conflict.prototype);
  }
}

export class BadRequest extends BaseError {
  constructor(message?: string) {
    super(
      message ?? `Check request body and try again`,
      httpStatusCodes.BAD_REQUEST
    );

    Object.setPrototypeOf(this, BadRequest.prototype);
  }
}

export class NotAuthorizedd extends BaseError {
  constructor(message?: string) {
    super(
      message ?? `Unauthorized credentials try again`,
      httpStatusCodes.NOT_AUTHORIZED
    );

    Object.setPrototypeOf(this, NotAuthorizedd.prototype);
  }
}

export class InternalError extends BaseError {
  constructor() {
    super(`Internal error`, httpStatusCodes.INTERNAL_SERVER_ERROR);

    Object.setPrototypeOf(this, NotFound.prototype);
  }
}
