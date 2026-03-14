import { createClient } from '@libsql/client'

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:./data/donations.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
})

let initialized = false

export async function ensureDb() {
  if (!initialized) {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS donations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nickname TEXT NOT NULL,
        amount INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
    initialized = true
  }
  return db
}

export default db
