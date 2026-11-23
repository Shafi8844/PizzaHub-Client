import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { admin, jwt } from "better-auth/plugins"

const mongoUri = process.env.MONGO_DB_URI || process.env.MONGO_URI

if (!mongoUri) {
  throw new Error(
    "MONGO_DB_URI (or MONGO_URI) is not set. Add a full MongoDB connection string to .env."
  )
}

const client = new MongoClient(mongoUri)
const db = client.db("pizzahub")

// Better Auth signs JWTs with `issuer` set to this value. A trailing slash would
// make the token issuer differ from the API's expected issuer and every request
// would be rejected, so normalize it once here.
const baseURL = process.env.BETTER_AUTH_URL?.replace(/\/+$/, "")

export const auth = betterAuth({
  baseURL,
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_SECRET)!,
    },
  },
  plugins: [
    admin(),
    jwt({
      jwt: {
        issuer: baseURL,
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
          const validRole = typeof user.role === "string" &&
            ["customer", "vendor", "admin"].includes(user.role)
            ? user.role
            : "customer"
          return { data: { ...safeUser, role: validRole } }
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
