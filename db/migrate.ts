import { config } from "dotenv"
config({ path: [".env.local", ".env"] })
import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import { migrate } from "drizzle-orm/libsql/migrator"

async function main() {
  const url = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN
  if (!url) throw new Error("TURSO_DATABASE_URL is not set")

  const client = createClient({ url, authToken })
  const db = drizzle(client)

  console.log("Running migrations...")
  await migrate(db, { migrationsFolder: "./db/migrations" })
  console.log("Migrations complete.")
  client.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
