import { ensureDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'admin_token')
    if (token !== 'true') {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    try {
        const db = await ensureDb()
        await db.execute('DELETE FROM donations')
        return { success: true }
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to clear donations'
        })
    }
})
