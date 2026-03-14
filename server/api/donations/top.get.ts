import { ensureDb } from '~/server/utils/db'

export default defineEventHandler(async () => {
    const db = await ensureDb()
    const result = await db.execute(`
        SELECT nickname, SUM(amount) as total
        FROM donations
        GROUP BY nickname
        ORDER BY total DESC
        LIMIT 10
    `)

    return result.rows
})
