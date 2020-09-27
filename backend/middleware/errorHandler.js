const { Errors } = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  // remove the cookie if explicitly set
  if (err.getShouldRemoveCookie()) {
    res.clearCookie("token");
  }
  if (err instanceof Errors) {
    return res.status(err.code()).json({
      errors: err.errors,
    });
  }

  return res.status(500).json({
    errors: [{ msg: "Server Error" }],
  });
};

module.exports = errorHandler;
