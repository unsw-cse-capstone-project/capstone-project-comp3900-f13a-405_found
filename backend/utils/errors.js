class Errors extends Error {
  constructor(errors) {
    super();
    this.errors = errors;
  }

  code() {
    if (this instanceof BadRequest) {
      return 400;
    } else if (this instanceof NotFound) {
      return 404;
    } else {
      return 500;
    }
  }
}

class BadRequest extends Errors {}
class NotFound extends Errors {}

module.exports = {
  Errors,
  BadRequest,
  NotFound,
};
