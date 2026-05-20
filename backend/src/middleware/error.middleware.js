const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  let statusCode = 500;
  let message = 'Something went wrong';

  const safeMessageToStatus = {
    'Property not found': 404,
    'Inquiry not found': 404,
    'User not found': 404,
    'Invalid property ID': 400,
    'Invalid credentials': 401,
    Unauthorized: 401,
    Forbidden: 403,
    'User already exists': 400
  };

  // Zod validation error
  if (err?.name === 'ZodError') {
    statusCode = 400;
    message = 'Validation failed';
  }

  // Mongoose validation/cast errors
  else if (err?.name === 'ValidationError' || err?.name === 'CastError') {
    statusCode = 400;
    message = 'Validation failed';
  }

  // Known clean messages only (including custom errors)
  else if (typeof err?.message === 'string' && safeMessageToStatus[err.message]) {
    statusCode = safeMessageToStatus[err.message];
    message = err.message;
  }

  return res.status(statusCode).json({ success: false, error: message });
};

export { errorMiddleware };
