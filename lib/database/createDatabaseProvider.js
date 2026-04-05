const MongoDBProvider = require("./MongoDBProvider");
const SupabaseProvider = require("./SupabaseProvider");
const dotenv = require("dotenv");
dotenv.config();

const DB_TYPE = {
  MONGODB: "mongodb",
  SUPABASE: "supabase"
}

function createDatabaseProvider() {
  const dbType = process.env.DB_TYPE;

  if (dbType === DB_TYPE.MONGODB) {
    if (!process.env.MONGO_URI) throw new Error("Missing MONGO_URI");
    return new MongoDBProvider(process.env.MONGO_URI);
  }

  if (dbType === DB_TYPE.SUPABASE) {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
      throw new Error("Missing SUPABASE_URL or SUPABASE_KEY");
    }
    return new SupabaseProvider(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  }

  throw new Error("Invalid DB_TYPE. Use mongodb or supabase");
}

module.exports = createDatabaseProvider;
