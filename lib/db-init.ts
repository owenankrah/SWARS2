import { supabase } from "./supabase"
import fs from "fs"
import path from "path"

export async function initializeDatabase() {
  try {
    // Read schema SQL
    const schemaSQL = fs.readFileSync(path.join(process.cwd(), "db", "schema.sql"), "utf8")

    // Execute schema SQL
    const { error: schemaError } = await supabase.rpc("exec_sql", { sql: schemaSQL })

    if (schemaError) {
      console.error("Error creating schema:", schemaError)
      return
    }

    // Read seed SQL
    const seedSQL = fs.readFileSync(path.join(process.cwd(), "db", "seed.sql"), "utf8")

    // Execute seed SQL
    const { error: seedError } = await supabase.rpc("exec_sql", { sql: seedSQL })

    if (seedError) {
      console.error("Error seeding database:", seedError)
      return
    }

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Error initializing database:", error)
  }
}

