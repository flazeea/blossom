import { ensureDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'admin_token')
    if (token !== 'true') {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    try {
        const db = await ensureDb()
        const result = await db.execute('SELECT * FROM donations ORDER BY created_at DESC')
        return result.rows
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch donations'
        })
    }
})
