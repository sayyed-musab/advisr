import { sendError } from '../utils/response.js';

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    // Send back the first validation error message
    const message = err.errors[0].message;
    return sendError(res, 400, message);
  }
};
