import { config } from "dotenv";

// Get NODE_ENV or default to 'development'
const env = process.env.NODE_ENV || "development";

// Construct the path like `.env.development.local` or `.env.production.local`
const envPath = `.env.${env}.local`;

// Load the appropriate .env file
config({ path: envPath });

// Export desired variables
export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ARCJET_KEY,
  ARCJET_ENV,
  QSTASH_URL,
  QSTASH_TOKEN,
  QSTASH_CURRENT_SIGNING_KEY,
  QSTASH_NEXT_SIGNING_KEY,
  SERVER_URL,
  GMAIL_APP_PASSWORD,
  GMAIL_USER,
} = process.env;
