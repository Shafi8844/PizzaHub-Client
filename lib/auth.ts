import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { admin, jwt } from "better-auth/plugins"

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
  plugins: [
    admin(),
    jwt({
      jwt: {
        issuer: process.env.BETTER_AUTH_URL,
        audience: "pizzahub-api",
        expirationTime: "5m",
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }),
      },
    }),
  ],
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const { signupRole, ...safeUser } = user
          if (signupRole === "customer" || signupRole === "vendor") {
            return { data: { ...safeUser, role: signupRole } }
          }
          return { data: safeUser }
        },
      },
    },
  },
  user: {
    additionalFields: {
      signupRole: {
        type: ["customer", "vendor"],
        input: true,
        defaultValue: "customer",
        returned: false,
      },
      premium: {
        type: "boolean",
        input: false,
        defaultValue: false,
      },
      blocked: {
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
