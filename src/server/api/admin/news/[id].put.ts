export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const id = getRouterParam(event, 'id')
  const supabase = useSupabaseAdmin()
  if (!supabase) {
    throw createError({ statusCode: 500, statusMessage: 'Supabase is not configured.' })
  }

  const payload = validateArticlePayload(await readBody(event))
  const { data, error } = await supabase
    .from('news_articles')
    .update(toDbArticle(payload))
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return toApiArticle(data)
})
