import * as authService from '../services/auth.service.js';
import { sendSuccess } from '../utils/response.js';

export const signup = async (req, res, next) => {
  try {
    await authService.signup(req.body);
    return sendSuccess(res, 201, 'Account created. Please verify your email.');
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) {
      const error = new Error('Verification token is required');
      error.statusCode = 400;
      throw error;
    }

    await authService.verifyEmail(token);
    return sendSuccess(res, 200, 'Email verified. You can now log in.');
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);

    // Set HTTP-only cookie
    res.cookie('advisr_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return sendSuccess(res, 200, 'Logged in successfully.', {
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie('advisr_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    return sendSuccess(res, 200, 'Logged out successfully.');
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    return sendSuccess(res, 200, null, {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    });
  } catch (error) {
    next(error);
  }
};
