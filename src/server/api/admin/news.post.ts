export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const supabase = useSupabaseAdmin()
  if (!supabase) {
    throw createError({ statusCode: 500, statusMessage: 'Supabase is not configured.' })
  }

  const payload = validateArticlePayload(await readBody(event))
  const { data, error } = await supabase
    .from('news_articles')
    .insert(toDbArticle(payload))
    .select('*')
    .single()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return toApiArticle(data)
})
