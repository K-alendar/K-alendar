class RecordNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "RecordNotFoundError";
  }
}

module.exports = {
  RecordNotFoundError: RecordNotFoundError
};
