import 'server-only';

import BasicMsgs from './modules/basic';
import LinkMsgs from './modules/link';

const loadedModules = {
  basic: BasicMsgs,
  link: LinkMsgs,
};

export const getDictionary = async (locale: 'en' | 'zh') => {
  const localeKey = locale === 'en' ? 'en_US' : 'zh_CN';
  const dictionary: Record<string, string> = {};

  // 合并所有模块的翻译
  Object.values(loadedModules).forEach(module => {
    Object.entries(module).forEach(([key, value]) => {
      dictionary[key] = value[localeKey];
    });
  });

  return dictionary;
};
