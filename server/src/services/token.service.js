import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const generateAuthToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

export const verifyAuthToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};
