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
    // Guard against non-Zod errors where err.errors may be undefined
    const message = err.errors?.[0]?.message ?? 'Validation failed';
    return sendError(res, 400, message);
  }
};
