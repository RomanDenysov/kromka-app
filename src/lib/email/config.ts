import nodemailer from 'nodemailer';
import { env } from '~/env';

const host = env.EMAIL_HOST;
const username = env.EMAIL_USERNAME;
const password = env.EMAIL_PASSWORD;
const port = 587;

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: false,
  auth: {
    user: username,
    pass: password,
  },
  from: username,
});

interface EmailArgs {
  email: string;
  sendTo?: string;
  subject: string;
  text?: string;
  html?: string;
}

export { transporter, type EmailArgs };
