import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { CONFIG } from './src/config.ts'
import { EXCURSIONS } from './src/data.ts'

// Genera sitemap.xml y robots.txt en cada build a partir de las excursiones y del dominio de config.ts
function seoFiles(): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const pages: [string, string, string][] = [
        ['/', '1.0', 'weekly'],
        ...EXCURSIONS.map((e): [string, string, string] => [`/excursiones/${e.slug}`, '0.9', 'monthly']),
        ['/formas-de-pago', '0.6', 'monthly'],
        ['/terminos', '0.3', 'yearly'],
        ['/privacidad', '0.3', 'yearly'],
      ]
      // Cada página en español y en inglés, enlazadas entre sí con hreflang
      const alt = (path: string) =>
        ['es', 'en'].map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${CONFIG.siteUrl}${path}?lang=${l}"/>`).join('\n') +
        `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${CONFIG.siteUrl}${path}"/>`
      const urls = pages
        .flatMap(([path, priority, freq]) =>
          ['es', 'en'].map(
            (l) => `  <url>\n    <loc>${CONFIG.siteUrl}${path}?lang=${l}</loc>\n${alt(path)}\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
          ),
        )
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${CONFIG.siteUrl}/sitemap.xml\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoFiles()],
})
