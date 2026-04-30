import { createClient } from '@supabase/supabase-js'
import { newsArticles } from '~/data/news'

export type NewsSection = {
  heading: string
  body: string
}

export type NewsArticle = {
  id?: number
  slug: string
  title: string
  description: string
  category: string
  date: string
  readTime: string
  city: string
  keywords: string[]
  sections: NewsSection[]
  published?: boolean
  created_at?: string
  updated_at?: string
}

export function useSupabaseAdmin() {
  const config = useRuntimeConfig()

  if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
    return null
  }

  return createClient(config.supabaseUrl, config.supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export function toApiArticle(row: any): NewsArticle {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    date: row.date,
    readTime: row.read_time,
    city: row.city,
    keywords: row.keywords ?? [],
    sections: row.sections ?? [],
    published: row.published,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

export function toDbArticle(article: Partial<NewsArticle>) {
  return {
    slug: article.slug,
    title: article.title,
    description: article.description,
    category: article.category,
    date: article.date,
    read_time: article.readTime,
    city: article.city,
    keywords: article.keywords ?? [],
    sections: article.sections ?? [],
    published: article.published ?? true,
  }
}

export function fallbackNews(): NewsArticle[] {
  return newsArticles.map((article) => ({
    ...article,
    published: true,
  }))
}

export function validateArticlePayload(body: Partial<NewsArticle>) {
  const required = ['slug', 'title', 'description', 'category', 'date', 'readTime', 'city'] as const
  for (const key of required) {
    if (!body[key]) {
      throw createError({ statusCode: 400, statusMessage: `Missing field: ${key}` })
    }
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.slug!)) {
    throw createError({ statusCode: 400, statusMessage: 'Slug must use lowercase letters, numbers, and hyphens.' })
  }

  if (!Array.isArray(body.sections) || body.sections.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'At least one article section is required.' })
  }

  return body as NewsArticle
}

export function requireAdmin(event: any) {
  const password = useRuntimeConfig().adminPassword
  const token = getCookie(event, 'doctor_admin')

  if (!password || token !== password) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}
