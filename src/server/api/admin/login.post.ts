export default defineEventHandler(async (event) => {
  const body = await readBody<{ password?: string }>(event)
  const password = useRuntimeConfig().adminPassword

  if (!password || body.password !== password) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid password' })
  }

  setCookie(event, 'doctor_admin', password, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8,
    path: '/',
  })

  return { ok: true }
})
