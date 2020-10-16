class Errors extends Error {
  constructor(errors, removeCookie = false) {
    super();
    this.errors = errors;
    this.removeCookie = removeCookie;
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

  getShouldRemoveCookie() {
    return this.removeCookie;
  }
}

class BadRequest extends Errors {}
class NotFound extends Errors {}

module.exports = {
  Errors,
  BadRequest,
  NotFound,
};
