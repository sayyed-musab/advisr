import { User } from '../models/User.model.js';
import * as tokenService from './token.service.js';
import * as mailService from './mail.service.js';

export const signup = async (userData) => {
  const { name, email, password } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('An account with this email already exists.');
    error.statusCode = 409;
    throw error;
  }

  const verificationToken = tokenService.generateVerificationToken();
  // Set expiration to 24 hours from now
  const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const user = await User.create({
    name,
    email,
    password,
    verificationToken,
    verificationTokenExpiresAt,
  });

  await mailService.sendVerificationEmail(email, verificationToken);

  return user;
};

export const verifyEmail = async (token) => {
  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
    const error = new Error('Invalid or expired verification link.');
    error.statusCode = 400;
    throw error;
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiresAt = undefined;
  await user.save();

  return user;
};

export const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  if (!user.isVerified) {
    const error = new Error('Please verify your email before logging in.');
    error.statusCode = 403;
    throw error;
  }

  const token = tokenService.generateAuthToken(user);

  return { user, token };
};
