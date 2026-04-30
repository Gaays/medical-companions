export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  const supabase = useSupabaseAdmin()

  if (!supabase) {
    const article = fallbackNews().find((item) => item.slug === slug)
    if (!article) {
      throw createError({ statusCode: 404, statusMessage: 'Article not found' })
    }
    return article
  }

  const { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !data) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  }

  return toApiArticle(data)
})
