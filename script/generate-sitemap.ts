import fs from 'fs';
import path from 'path';

// 获取目录下的所有页面
function getPages(dir: string, basePath: string = ''): string[] {
  const pages: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      // 跳过 node_modules 和 .next 目录
      if (entry.name === 'node_modules' || entry.name === '.next') continue;

      // 递归获取子目录的页面
      pages.push(...getPages(fullPath, relativePath));
    } else if (entry.name === 'page.tsx') {
      // 将 page.tsx 转换为 URL 路径
      const pagePath = basePath.replace(/\\/g, '/');
      if (pagePath) {
        pages.push(pagePath);
      }
    }
  }

  return pages;
}

// 生成 sitemap.ts 文件内容
function generateSitemapContent(pages: string[]): string {
  const content = `import type { MetadataRoute } from 'next'
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '@/i18n/config'

/*
 * 生成 sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || ''
  const urls: MetadataRoute.Sitemap = []

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
              SUPPORTED_LANGUAGES.map(l => [l, l === DEFAULT_LANGUAGE ? domain : \`\${domain}/\${l}\`]),
            ),
          },
        },
      })
    } else {
      urls.push({
        url: \`\${domain}/\${lang}\`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
        alternates: {
          languages: {
            ...Object.fromEntries(
              SUPPORTED_LANGUAGES.map(l => [l, l === DEFAULT_LANGUAGE ? domain : \`\${domain}/\${l}\`]),
            ),
          },
        },
      })
    }

    // 处理其他页面
    ${pages
      .map(
        page => `
    urls.push({
      url: \`\${domain}/\${lang}/${page}\`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(
            SUPPORTED_LANGUAGES.map(l => [
              l,
              \`\${domain}/\${l}/${page}\`,
            ]),
          ),
        },
      },
    })`,
      )
      .join('\n    ')}
  })

  return urls
}
`;

  return content;
}

// 主函数
function main() {
  try {
    // 获取 [lang] 目录下的所有页面
    const langDir = path.join(process.cwd(), 'src/app/[lang]');
    const pages = getPages(langDir);

    // 生成 sitemap.ts 文件内容
    const content = generateSitemapContent(pages);

    // 写入文件
    const sitemapPath = path.join(process.cwd(), 'src/app/sitemap.ts');
    fs.writeFileSync(sitemapPath, content);

    console.log('✅ Sitemap generated successfully!');
    console.log('📝 Pages included:');
    pages.forEach(page => console.log(`   - ${page}`));
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

main();
