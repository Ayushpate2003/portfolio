import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, loadEnv, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const RESUME_FILE = 'Ayush-Patel-Resume.pdf'
const OG_IMAGE_FILE = 'og-image.png'

/**
 * Injects canonical / og:url / og:image only when SITE_URL is configured and the
 * image exists, so the built HTML never points at assets or URLs that are not real.
 */
function seoPlugin(siteUrl: string | undefined, hasOgImage: boolean): Plugin {
  return {
    name: 'portfolio-seo',
    transformIndexHtml() {
      if (!siteUrl) return []
      const base = siteUrl.replace(/\/$/, '')
      const tags: HtmlTagDescriptor[] = [
        { tag: 'link', attrs: { rel: 'canonical', href: `${base}/` }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:url', content: `${base}/` }, injectTo: 'head' },
      ]
      if (hasOgImage) {
        tags.push(
          { tag: 'meta', attrs: { property: 'og:image', content: `${base}/${OG_IMAGE_FILE}` }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image', content: `${base}/${OG_IMAGE_FILE}` }, injectTo: 'head' },
        )
      }
      return tags
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = process.env.SITE_URL ?? env.SITE_URL
  const hasResume = existsSync(resolve(process.cwd(), 'public', RESUME_FILE))
  const hasOgImage = existsSync(resolve(process.cwd(), 'public', OG_IMAGE_FILE))

  return {
    plugins: [react(), tailwindcss(), seoPlugin(siteUrl, hasOgImage)],
    resolve: {
      alias: {
        '@': resolve(process.cwd(), 'src'),
      },
    },
    define: {
      __RESUME_AVAILABLE__: JSON.stringify(hasResume),
      __RESUME_PATH__: JSON.stringify(`/${RESUME_FILE}`),
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      globals: false,
      css: false,
    },
  }
})
