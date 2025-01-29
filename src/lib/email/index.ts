import { render } from '@react-email/components';
import type { SentMessageInfo } from 'nodemailer';
import { env } from '~/env';
import { log } from '../utils/log';
import { type EmailArgs, transporter } from './config';
import { MagicLinkEmail } from './templates/magic-link';

const authMailSender = env.EMAIL_USERNAME;

export async function sendEmail({
  email,
  sendTo,
  subject,
  text,
  html,
}: EmailArgs): Promise<SentMessageInfo | undefined> {
  try {
    const isVerified = await transporter.verify();
    if (!isVerified) {
      log.error('Email is not verified');
      return;
    }

    const mailOptions = {
      from: authMailSender,
      to: sendTo,
      subject,
      text,
      html: html ? html : '',
    };

    const info = await transporter.sendMail(mailOptions);
    log.info('Message sent: %s', info.messageId);

    return info;
  } catch (error) {
    log.error('Something Went Wrong', error);
    return;
  }
}

export async function sendMagicLinkEmail(email: string, url: string) {
  // Render email template to HTML
  const emailHtml = await render(MagicLinkEmail({ url }));

  const mailOptions = {
    from: authMailSender,
    to: email,
    subject: 'Sign in to your account',
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    log.error('Failed to send email:', error);
    throw new Error('Failed to send email');
  }
}
