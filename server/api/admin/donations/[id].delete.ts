import { ensureDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'admin_token')
    if (token !== 'true') {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const id = getRouterParam(event, 'id')

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID is required'
        })
    }

    try {
        const db = await ensureDb()
        await db.execute({
            sql: 'DELETE FROM donations WHERE id = ?',
            args: [id],
        })
        return { success: true }
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to delete donation'
        })
    }
})
