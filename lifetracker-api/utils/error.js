class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

class BadRequestError extends ExpressError {
  constructor(message = "Bad request", status = 400) {
    super(message, status);
  }
}

class Unauthorized extends ExpressError {
  constructor(message = "Unauthorized", status = 400) {
    super(message, status);
  }
}

class NotFoundError extends ExpressError {
  constructor(message = "Not found", status = 404) {
    super(message, status);
  }
}

module.exports = { BadRequestError, NotFoundError, Unauthorized };
