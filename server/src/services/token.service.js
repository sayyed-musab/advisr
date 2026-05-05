import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '../config/env.js';

export const generateAuthToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
};

export const verifyAuthToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};

export const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};
