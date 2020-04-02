const sequelize = require("sequelize")

class KalendarError extends Error {

  constructor(message) {
    super(message);
    this.name = "KalendarError"
    this.code = 500
  }
}

class RecordNotFoundError extends KalendarError {
  constructor(message) {
    super(message);
    this.name = "RecordNotFoundError";
    this.code = 422
  }
}

class ViolatesUniquenessError extends KalendarError {
  constructor(message) {
    super(message)
    this.name = "ViolatesUniquenessError"
    this.code = 422
  }
}

class InternalServerError extends KalendarError {
  constructor(name, message) {
    super(message)
    this.name = "InteralServerError: " + name
  }
}

async function writeErrorHandler(expression) {
  try { return await expression() }
  catch (e) {
    if (e instanceof sequelize.UniqueConstraintError) {
      throw new ViolatesUniquenessError(e.errors.map(e => e.message).join(", "))
    } else {
      throw new InternalServerError(e.name ? e.name : "Unknown Error", e.message ? e.message : "")
    }
  }
}

module.exports = {
  RecordNotFoundError: RecordNotFoundError,
  writeErrorHandler: writeErrorHandler
};
