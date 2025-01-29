import { toNextJsHandler } from 'better-auth/next-js';
import { auth } from '~/server/auth/auth';

export const config = { api: { bodyParser: false } };

export const { POST, GET } = toNextJsHandler(auth);
