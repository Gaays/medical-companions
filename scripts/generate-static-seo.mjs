import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { newsArticles } from '../src/data/news.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const dist = resolve(root, 'dist')
const siteUrl = process.env.VITE_SITE_URL || 'https://example.com'
const template = await readFile(resolve(dist, 'index.html'), 'utf8')

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function pageHtml({ title, description, path, body }) {
  const meta = [
    `<title>${escapeHtml(title)} | China Health Check Guide</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<link rel="canonical" href="${siteUrl}${path}">`,
    `<meta property="og:title" content="${escapeHtml(title)} | China Health Check Guide">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${siteUrl}${path}">`
  ].join('\n    ')

  return template
    .replace(/<meta name="description" content=".*?">\n?/, '')
    .replace(/<title>.*?<\/title>/, meta)
    .replace('<div id="app"></div>', `<div id="app">${body}</div>`)
}

function articleBody(article) {
  const sections = article.sections.map((section) => `
    <section>
      <h2>${escapeHtml(section.heading)}</h2>
      <p>${escapeHtml(section.body)}</p>
    </section>
  `).join('')

  return `
    <main style="max-width: 760px; margin: 0 auto; padding: 48px 20px; font-family: Georgia, serif; color: #17342d;">
      <a href="/news/" style="color: #0f5f4c;">Back to guides</a>
      <p style="margin-top: 28px; color: #3f7d68; font-weight: 700;">${escapeHtml(article.category)} · ${escapeHtml(article.city)} · ${escapeHtml(article.date)}</p>
      <h1 style="font-size: clamp(2rem, 6vw, 3.4rem); line-height: 1.08;">${escapeHtml(article.title)}</h1>
      <p style="font-size: 1.125rem; line-height: 1.8; color: #4f5f59;">${escapeHtml(article.description)}</p>
      ${sections}
      <aside style="margin-top: 42px; padding: 20px; background: #eef7f2; border: 1px solid #cfe0d7;">
        <h2>Need help choosing the right checkup path?</h2>
        <p>Contact us for Guangzhou, Shenzhen, or Shanghai health check planning.</p>
        <a href="mailto:doctor.me@email.com" style="color: #0f5f4c;">Email consultation</a>
      </aside>
    </main>
  `
}

function newsIndexBody() {
  const items = newsArticles.map((article) => `
    <article style="margin: 24px 0; padding-bottom: 24px; border-bottom: 1px solid #d9e4df;">
      <p style="color: #3f7d68; font-weight: 700;">${escapeHtml(article.category)} · ${escapeHtml(article.city)}</p>
      <h2><a href="/news/${article.slug}/" style="color: #17342d;">${escapeHtml(article.title)}</a></h2>
      <p style="color: #4f5f59;">${escapeHtml(article.description)}</p>
    </article>
  `).join('')

  return `
    <main style="max-width: 900px; margin: 0 auto; padding: 48px 20px; font-family: Georgia, serif; color: #17342d;">
      <h1>China health check guides for foreigners</h1>
      <p style="font-size: 1.125rem; line-height: 1.8; color: #4f5f59;">Guides about visa medical checks, full body checkups, English reports, and consultation support in Guangzhou, Shenzhen, and Shanghai.</p>
      ${items}
    </main>
  `
}

function homeBody() {
  return `
    <main style="max-width: 960px; margin: 0 auto; padding: 48px 20px; font-family: Georgia, serif; color: #17342d;">
      <p style="color: #3f7d68; font-weight: 700;">Guangzhou / Shenzhen / Shanghai</p>
      <h1>China health check and visa medical consultation for foreigners</h1>
      <p style="font-size: 1.125rem; line-height: 1.8; color: #4f5f59;">We help foreign teachers, work visa applicants, international students, expat employees, self-pay visitors, and 40+ preventive screening travelers understand the right China health check path before booking.</p>
      <h2>Services</h2>
      <ul>
        <li>Visa or residence health check guidance</li>
        <li>Private full body checkup planning</li>
        <li>English appointment and hospital visit support</li>
        <li>Medical report translation and organization</li>
        <li>Follow-up routing after abnormal report flags</li>
      </ul>
      <h2>User stories</h2>
      <p>Michael, a foreign teacher in Guangzhou, used the checklist to avoid booking the wrong overseas exam before asking his school the right questions.</p>
      <p>Aisha, an international student arriving in Shanghai, used the consultation flow to understand the difference between an overseas report and an official residence health check.</p>
      <p>David, a self-pay visitor in Shenzhen, compared private full body checkup options and prepared follow-up questions before booking.</p>
      <p><a href="/services/" style="color: #0f5f4c;">Request consultation</a></p>
    </main>
  `
}

function servicesBody() {
  return `
    <main style="max-width: 960px; margin: 0 auto; padding: 48px 20px; font-family: Georgia, serif; color: #17342d;">
      <h1>China health check consultation in Guangzhou, Shenzhen, and Shanghai</h1>
      <p style="font-size: 1.125rem; line-height: 1.8; color: #4f5f59;">Leave your information for China visa medical checks, residence health checks, private full body checkups, English reports, appointment support, and follow-up routing.</p>
      <h2>Who we help</h2>
      <ul>
        <li>Foreign teachers and work visa applicants</li>
        <li>International students</li>
        <li>Expat employees in China</li>
        <li>Short-term self-pay health screening visitors</li>
        <li>40+ US and European preventive checkup visitors</li>
      </ul>
      <h2>Contact</h2>
      <p>Email: <a href="mailto:doctor.me@email.com" style="color: #0f5f4c;">doctor.me@email.com</a></p>
      <p>WhatsApp: +86 123 4567 8910</p>
    </main>
  `
}

await writeFile(resolve(dist, 'index.html'), pageHtml({
  title: 'China health check and visa medical consultation for foreigners',
  description: 'China health check, visa medical check, full body checkup, English report, and consultation support for foreigners in Guangzhou, Shenzhen, and Shanghai.',
  path: '/',
  body: homeBody()
}))

await mkdir(resolve(dist, 'services'), { recursive: true })
await writeFile(resolve(dist, 'services', 'index.html'), pageHtml({
  title: 'China health check consultation in Guangzhou, Shenzhen, and Shanghai',
  description: 'Leave your information for China visa medical checks, residence health checks, full body checkups, English reports, appointment support, and follow-up routing.',
  path: '/services/',
  body: servicesBody()
}))

await mkdir(resolve(dist, 'news'), { recursive: true })
await writeFile(resolve(dist, 'news', 'index.html'), pageHtml({
  title: 'China health check guides for foreigners',
  description: 'Guides about China visa medical checks, full body checkups, English reports, and support in Guangzhou, Shenzhen, and Shanghai.',
  path: '/news/',
  body: newsIndexBody()
}))

for (const article of newsArticles) {
  const articleDir = resolve(dist, 'news', article.slug)
  await mkdir(articleDir, { recursive: true })
  await writeFile(resolve(articleDir, 'index.html'), pageHtml({
    title: article.title,
    description: article.description,
    path: `/news/${article.slug}/`,
    body: articleBody(article)
  }))
}

const urls = ['/', '/services/', '/news/', ...newsArticles.map((article) => `/news/${article.slug}/`)]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${siteUrl}${url}</loc></url>`).join('\n')}
</urlset>
`

await writeFile(resolve(dist, 'sitemap.xml'), sitemap)
await writeFile(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`)
