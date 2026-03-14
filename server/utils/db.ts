import Database from 'better-sqlite3'
import { join } from 'path'
import { mkdirSync } from 'fs'

const dataDir = join(process.cwd(), 'data')
mkdirSync(dataDir, { recursive: true })

const db = new Database(join(dataDir, 'donations.db'))

// WAL mode for better performance
db.pragma('journal_mode = WAL')

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname TEXT NOT NULL,
    amount INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

export default db
