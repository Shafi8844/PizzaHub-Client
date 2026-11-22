import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { admin } from "better-auth/plugins"

const mongoUri = process.env.MONGO_DB_URI

if (!mongoUri) {
  throw new Error(
    "MONGO_DB_URI is not set. Add a full connection string to .env, e.g. mongodb://user:password@host:27017/?authSource=admin"
  )
}

const client = new MongoClient(mongoUri)
const db = client.db("pizzahub")

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins:[
    admin(),
  ],
  user: {
    additionalFields: {
      role: {
        type: ["customer", "vendor"],
        input: true,
        defaultValue: "customer",
      },
      premium: {
        type: "boolean",
        input: false,
        defaultValue: false,
      },
      subscriptionPlan: {
        type: ["free", "premium"],
        input: false,
        defaultValue: "free",
      },
      subscriptionExpiresAt: {
        type: "date",
        input: false,
      },
    },
  },
})
