export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const supabase = useSupabaseAdmin()
  if (!supabase) {
    return fallbackNews()
  }

  const { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .order('date', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return data.map(toApiArticle)
})
