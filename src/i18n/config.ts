// 支持的语言列表
export const SUPPORTED_LANGUAGES: LangCode[] = [
  'en',
  'zh-CN',
  'zh-TW',
  'es',
  'fr',
  'ru',
  'pt',
  'de',
  'ja',
  'it',
  'ko',
  'vi',
];

// 默认语言
export const DEFAULT_LANGUAGE: LangCode = 'en';

// 语言代码到区域设置代码的映射
export const LANG_LOCALE_MAP: Record<LangCode, LocaleType> = {
  en: 'en_US',
  'zh-CN': 'zh_CN',
  'zh-TW': 'zh_TW',
  es: 'es_ES',
  fr: 'fr_FR',
  ru: 'ru_RU',
  pt: 'pt_PT',
  de: 'de_DE',
  ja: 'ja_JP',
  it: 'it_IT',
  ko: 'ko_KR',
  vi: 'vi_VN',
};
