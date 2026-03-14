export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { username, password } = body

    // Hardcoded credentials for simplicity, consider moving password to .env in production
    if (username === 'reinquisitor' && password === (process.env.ADMIN_PASSWORD || 'admin123')) {
        setCookie(event, 'admin_token', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/'
        })
        return { success: true }
    }

    throw createError({
        statusCode: 401,
        statusMessage: 'Указан неверный логин или пароль'
    })
})
