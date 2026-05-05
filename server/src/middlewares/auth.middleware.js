import { verifyAuthToken } from '../services/token.service.js';
import { User } from '../models/User.model.js';
import { sendError } from '../utils/response.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.zuvio_token;

    if (!token) {
      return sendError(res, 401, 'Unauthorized - No token provided');
    }

    const decoded = verifyAuthToken(token);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return sendError(res, 401, 'Unauthorized - User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return sendError(res, 401, 'Unauthorized - Invalid token');
  }
};
