export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const supabase = useSupabaseAdmin()

  if (!body.name || !body.contact) {
    throw createError({ statusCode: 400, statusMessage: 'Name and contact are required.' })
  }

  if (!supabase) {
    throw createError({ statusCode: 500, statusMessage: 'Supabase is not configured.' })
  }

  const { error } = await supabase
    .from('consultation_requests')
    .insert({
      name: body.name,
      city: body.city,
      profile: body.profile,
      purpose: body.purpose,
      arrival_date: body.arrivalDate || null,
      contact: body.contact,
      message: body.message,
    })

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { ok: true }
})
