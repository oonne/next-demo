import type { MetadataRoute } from 'next';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = process.env.NEXT_PUBLIC_DOMIAN || '';
  if (!domain) {
    throw new Error('NEXT_PUBLIC_DOMIAN is not defined');
  }

  const urls: MetadataRoute.Sitemap = [];

  // 为每种语言生成 URL
  SUPPORTED_LANGUAGES.forEach(lang => {
    // 处理首页
    if (lang === DEFAULT_LANGUAGE) {
      urls.push({
        url: domain,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
        alternates: {
          languages: {
            ...Object.fromEntries(
              SUPPORTED_LANGUAGES.map(l => [l, l === DEFAULT_LANGUAGE ? domain : `${domain}/${l}`]),
            ),
          },
        },
      });
    } else {
      urls.push({
        url: `${domain}/${lang}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
        alternates: {
          languages: {
            ...Object.fromEntries(
              SUPPORTED_LANGUAGES.map(l => [l, l === DEFAULT_LANGUAGE ? domain : `${domain}/${l}`]),
            ),
          },
        },
      });
    }

    // 这里可以添加其他页面的 URL
    // 例如：about, blog 等页面
    const pages = ['about', 'blog'];
    pages.forEach(page => {
      urls.push({
        url: `${domain}/${lang}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: {
            ...Object.fromEntries(SUPPORTED_LANGUAGES.map(l => [l, `${domain}/${l}/${page}`])),
          },
        },
      });
    });
  });

  return urls;
}
