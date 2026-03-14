import { ensureDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const nickname = body?.nickname?.trim()
    const amount = Number(body?.amount)

    if (!nickname || !amount || amount < 1) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Некорректные данные: nickname и amount обязательны'
        })
    }

    const db = await ensureDb()
    await db.execute({
        sql: 'INSERT INTO donations (nickname, amount) VALUES (?, ?)',
        args: [nickname, amount],
    })

    return { success: true }
})
