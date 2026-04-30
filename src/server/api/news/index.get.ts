export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const limit = Number(query.limit || 0)
  const supabase = useSupabaseAdmin()

  if (!supabase) {
    const rows = fallbackNews()
    return limit > 0 ? rows.slice(0, limit) : rows
  }

  let request = supabase
    .from('news_articles')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false })
    .order('created_at', { ascending: false })

  if (limit > 0) {
    request = request.limit(limit)
  }

  const { data, error } = await request

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return data.map(toApiArticle)
})
