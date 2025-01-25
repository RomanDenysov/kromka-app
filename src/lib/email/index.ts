// import 'server-only'

import nodemailer, { type SentMessageInfo } from 'nodemailer'
import { env } from '~/env'
import { log } from '../utils/log'

const host = env.EMAIL_HOST
const username = env.EMAIL_USERNAME
const password = env.EMAIL_PASSWORD
const port = 587

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: false,
  auth: {
    user: username,
    pass: password,
  },
})

interface EmailArgs {
  to: string
  subject: string
  text: string
}

export async function sendEmail({
  email,
  sendTo,
  subject,
  text,
  html,
}: {
  email: string
  sendTo?: string
  subject: string
  text: string
  html?: string
}): Promise<SentMessageInfo> {
  try {
    const isVerified = await transporter.verify()
    if (!isVerified) {
      console.error('Email is not verified')
      return
    }

    const mailOptions = {
      from: email,
      to: sendTo,
      subject,
      text,
      html: html ? html : '',
    }

    const info = await transporter.sendMail(mailOptions)
    log.info('Message sent: %s', info.messageId)

    return info
  } catch (error) {
    console.error('Something Went Wrong', username, password, error)
    return
  }
}
