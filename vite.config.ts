import react from '@vitejs/plugin-react'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import { CONFIG } from './src/config.ts'
import { EXCURSIONS } from './src/data.ts'
import { EXCURSIONS_EN } from './src/content/excursions.en.ts'
import { DEPOSIT_PERCENT, PRICES } from './api/_lib/prices.ts'
import { PAYMENTS } from './src/config.ts'
import es from './src/i18n/es.ts'
import en from './src/i18n/en.ts'

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

// Genera una página HTML ya armada por cada ruta (título, descripción, canonical, hreflang y contenido de texto).
// Google lee el contenido sin esperar al JavaScript; al cargar, React reemplaza este contenido por la web completa.
function staticPages(): Plugin {
  const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  const link = (path: string, text: string) => `<a href="${path}">${esc(text)}</a>`
  const priceOf = (e: (typeof EXCURSIONS)[number]) => {
    const p = e.options?.length ? Math.min(...e.options.map((o) => o.priceUSD)) : e.priceUSD
    return p ? ` — desde US$${p} / from US$${p}` : ''
  }
  const nav = () =>
    `<nav><ul>${EXCURSIONS.map((e) => `<li>${link(`/excursiones/${e.slug}`, `${e.name} / ${EXCURSIONS_EN[e.slug]?.name ?? e.name}`)}${esc(priceOf(e))}</li>`).join('')}</ul>` +
    `<p>${link('/formas-de-pago', 'Formas de pago / Payment options')} · ${link('/terminos', 'Términos / Terms')} · ${link('/privacidad', 'Privacidad / Privacy')}</p></nav>`
  const contact = `<p>WhatsApp: <a href="https://wa.me/${CONFIG.whatsapp}">${CONFIG.phoneDisplay}</a> · ${esc(CONFIG.address)} · ${esc(CONFIG.hours.es)}</p>`

  type Page = { path: string; title: string; description: string; body: string; jsonLd?: object }
  const pages = (): Page[] => {
    const s = es.seoIntro
    const sEn = en.seoIntro
    const home: Page = {
      path: '/',
      title: es.seo.homeTitle,
      description: es.seo.homeDesc,
      body:
        `<h1>${esc(`${s.title} ${s.titleAccent}`)} · Super Buggies</h1>` +
        s.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('') +
        `<h2>${esc(`${sEn.title} ${sEn.titleAccent}`)}</h2>` +
        sEn.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('') +
        `<h2>${esc(s.listTitle)} · ${esc(sEn.listTitle)}</h2>${nav()}` +
        `<h2>${esc(s.faqTitle)}</h2>` + s.faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('') +
        `<h2>${esc(sEn.faqTitle)}</h2>` + sEn.faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('') +
        contact,
    }
    const tours = EXCURSIONS.map((e): Page => {
      const x = EXCURSIONS_EN[e.slug]
      const opts = e.options?.length
        ? `<ul>${e.options.map((o, i) => `<li>${esc(`${o.label}: US$${o.priceUSD} ${o.unit}`)}${x?.options?.[i] ? esc(` · ${x.options[i].label}: US$${o.priceUSD} ${x.options[i].unit}`) : ''}</li>`).join('')}</ul>`
        : e.priceUSD ? `<p>US$${e.priceUSD} ${esc(e.priceUnit ?? 'por persona')}</p>` : ''
      return {
        path: `/excursiones/${e.slug}`,
        title: es.seo.excursionTitle(e.name),
        description: es.seo.excursionDesc(e.short),
        body:
          `<h1>${esc(e.name)} en Puerto Plata</h1><p>${esc(e.description)}</p>` +
          (e.duration ? `<p>Duración: ${esc(e.duration)}</p>` : '') + opts +
          `<h2>Incluye</h2><ul>${e.includes.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` +
          (x ? `<h2>${esc(x.name)} in Puerto Plata</h2><p>${esc(x.description)}</p><h3>Includes</h3><ul>${x.includes.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : '') +
          `<h2>Más excursiones · More excursions</h2>${nav()}${contact}`,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'TouristTrip',
          name: e.name,
          alternateName: x?.name,
          description: e.description,
          image: e.gallery.map((g) => CONFIG.siteUrl + g),
          url: `${CONFIG.siteUrl}/excursiones/${e.slug}`,
          provider: { '@type': 'TravelAgency', name: CONFIG.brand, telephone: '+1-809-841-4125', url: CONFIG.siteUrl },
          ...(e.priceUSD ? { offers: { '@type': 'Offer', price: e.options?.length ? Math.min(...e.options.map((o) => o.priceUSD)) : e.priceUSD, priceCurrency: 'USD' } } : {}),
        },
      }
    })
    const simple = (path: string, title: string, description: string, h1: string): Page => ({
      path, title, description, body: `<h1>${esc(h1)}</h1><p>${esc(description)}</p>${nav()}${contact}`,
    })
    return [
      home,
      ...tours,
      simple('/formas-de-pago', `${es.payments.pageTitle} · Super Buggies`, es.seo.paymentsDesc, `${es.payments.pageTitle} · ${en.payments.pageTitle}`),
      simple('/terminos', `${es.legal.terms} · Super Buggies`, 'Términos y condiciones de reservas, pagos y cancelaciones de Super Buggies (Victoriano Super Buggies S.R.L.).', `${es.legal.terms} · ${en.legal.terms}`),
      simple('/privacidad', `${es.legal.privacy} · Super Buggies`, 'Política de privacidad de Super Buggies (Victoriano Super Buggies S.R.L.) según la Ley 172-13.', `${es.legal.privacy} · ${en.legal.privacy}`),
    ]
  }

  let outDir = 'dist'
  return {
    name: 'static-pages',
    apply: 'build',
    configResolved(c) {
      outDir = c.build.outDir
    },
    closeBundle() {
      const template = readFileSync(join(outDir, 'index.html'), 'utf8')
      for (const pg of pages()) {
        const url = CONFIG.siteUrl + pg.path
        let html = template
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(pg.title)}</title>`)
          .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(pg.description)}" />`)
          .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(pg.title)}" />`)
          .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(pg.description)}" />`)
          // Sin canonical fijo: cada idioma lo pone la web al cargar (?lang=es / ?lang=en)
          .replace(/\s*<link rel="canonical" href="[^"]*" \/>/, '')
          .replace(/(<link rel="alternate" hreflang="es" href=")[^"]*(" \/>)/, `$1${url}?lang=es$2`)
          .replace(/(<link rel="alternate" hreflang="en" href=")[^"]*(" \/>)/, `$1${url}?lang=en$2`)
          .replace(/(<link rel="alternate" hreflang="x-default" href=")[^"]*(" \/>)/, `$1${url}$2`)
          .replace('<div id="root"></div>', `<div id="root"><main class="prerender">${pg.body}</main></div>`)
        if (pg.jsonLd) html = html.replace('</head>', `    <script type="application/ld+json">${JSON.stringify(pg.jsonLd)}</script>\n  </head>`)
        // "/" → index.html; "/excursiones/x" → excursiones/x.html (servido como /excursiones/x con cleanUrls)
        const file = pg.path === '/' ? join(outDir, 'index.html') : join(outDir, `${pg.path.slice(1)}.html`)
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, html)
      }
    },
  }
}

// El servidor cobra con PayPal usando api/_lib/prices.ts: el build falla si no coincide con src/data.ts
function checkPrices(): Plugin {
  return {
    name: 'check-prices',
    buildStart() {
      const errors: string[] = []
      for (const e of EXCURSIONS) {
        const p = PRICES[e.slug]
        if (e.options?.length) {
          for (const o of e.options) if (p?.options?.[o.id] !== o.priceUSD) errors.push(`${e.slug}/${o.id}: web ${o.priceUSD} ≠ servidor ${p?.options?.[o.id]}`)
        } else if (e.priceUSD != null && p?.base !== e.priceUSD) errors.push(`${e.slug}: web ${e.priceUSD} ≠ servidor ${p?.base}`)
        else if (e.priceUSD == null && p) errors.push(`${e.slug}: sin precio en la web pero sí en el servidor`)
      }
      for (const slug of Object.keys(PRICES)) if (!EXCURSIONS.some((e) => e.slug === slug)) errors.push(`${slug}: está en el servidor pero no en la web`)
      if (DEPOSIT_PERCENT !== PAYMENTS.depositPercent) errors.push(`Depósito: web ${PAYMENTS.depositPercent}% ≠ servidor ${DEPOSIT_PERCENT}%`)
      if (errors.length) this.error(`Los precios de api/_lib/prices.ts no coinciden con src/data.ts: ${errors.join(' | ')}`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [checkPrices(), react(), seoFiles(), staticPages()],
})
