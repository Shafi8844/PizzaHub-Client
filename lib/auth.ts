import { betterAuth, input } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { role } from "better-auth/plugins";

const client= new MongoClient(process.env.MONGO_DB_URI as string)
const db = client.db("pizzahub")


export const auth=betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    database:mongodbAdapter(db,{
      client,
    }),
  emailAndPassword:{
      enabled:true,
  },
  user:{
    additionalFields:{
      role:{
        type:["admin","customer","vendor"],
        input:true,
        defaultValue:"customer",
      }
    }
  }
})
