import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: parseInt(env.SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const verifyUrl = `${env.CLIENT_URL}/verify-email?token=${token}`;
  
  const mailOptions = {
    from: `"Zuvio" <${env.SMTP_USER}>`,
    to: email,
    subject: 'Verify your email address',
    html: `
      <h1>Welcome to Zuvio!</h1>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send verification email');
  }
};
