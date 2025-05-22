import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'zh-CN', 'zh-TW', 'es', 'fr', 'ru', 'pt', 'de', 'ja', 'it', 'ko', 'vi'],

  // Used when no locale matches
  defaultLocale: 'en',
});
