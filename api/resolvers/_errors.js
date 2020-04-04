const sequelize = require("sequelize");

class KalendarError extends Error {
  constructor(message) {
    super(message);
    this.name = "KalendarError";
    this.code = 500;
  }
}

class RecordNotFoundError extends KalendarError {
  constructor(message) {
    super(message);
    this.name = "RecordNotFoundError";
    this.code = 422;
  }
}

class ValidationError extends KalendarError {
  constructor(errors) {
    super(JSON.stringify(errors));
    this.name = "ValidationError";
    this.code = 422;
    this.errors = errors
  }
}

class ViolatesUniquenessError extends ValidationError {
  constructor(message) {
    super(message);
    this.name = "ViolatesUniquenessError";
    this.code = 422;
  }
}

class InternalServerError extends KalendarError {
  constructor(name, message) {
    super(message);
    this.name = "InteralServerError: " + name;
  }
}

async function writeErrorHandler(expression) {
  try {
    return await expression();
  } catch (e) {
    if (e instanceof sequelize.UniqueConstraintError) {
      throw new ViolatesUniquenessError(
        e.errors.map(e => e.message).join(", ")
      );
    } else if (e instanceof ValidationError) {
      throw e
    }
  }
}

function handleError(e) {
  throw e
}

module.exports = {
  RecordNotFoundError: RecordNotFoundError,
  ValidationError: ValidationError,
  writeErrorHandler: writeErrorHandler,
  handleError: handleError
};
