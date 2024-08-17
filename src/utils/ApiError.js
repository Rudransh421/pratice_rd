class ApiError extends Error {
  constructor(
    statuseCode,
    message = "Something is wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    (this.statuseCode = statuseCode),
      (this.data = null),
      (this.success = false),
      (this.errors = errors);

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
