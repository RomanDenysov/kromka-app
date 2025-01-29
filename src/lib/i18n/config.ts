const COOKIE_NAME = 'krmk-lang';
const languages = ['en', 'sk'] as const;
const defaultLanguage = 'sk';

type Language = (typeof languages)[number];

export { COOKIE_NAME, languages, defaultLanguage, type Language };
