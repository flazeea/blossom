import db from '~/server/utils/db'

export default defineEventHandler(() => {
    const rows = db.prepare(`
    SELECT nickname, SUM(amount) as total
    FROM donations
    GROUP BY nickname
    ORDER BY total DESC
    LIMIT 10
  `).all()

    return rows
})
