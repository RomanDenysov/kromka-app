'use server';

import { cookies } from 'next/headers';
import { COOKIE_NAME, type Language, defaultLanguage } from './config';

async function getCurrentLanguage() {
  const cookieStore = await cookies();
  const language = cookieStore.get(COOKIE_NAME)?.value ?? defaultLanguage;
  return language as Language;
}

async function setLanguage(language: Language) {
  const cookieStore = await cookies();
  return cookieStore.set(COOKIE_NAME, language);
}

export { getCurrentLanguage, setLanguage };
