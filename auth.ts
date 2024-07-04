import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import brcypt from "bcryptjs";

import User from "./lib/schema";
import { signInSchema } from "./lib/zod";
import clientPromise from "./lib/mongoAdapter";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          // logic to salt and hash password
          //   const pwHash = brcypt.hash(credentials.password as string, 10);

          // logic to verify if user exists
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );
          user = await User.findOne({
            email: credentials.email,
            password: credentials.password,
          });
          if (user) {
            console.log("user signed in");
          }

          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            throw new Error("User not found.");
          }

          // return user object with the their profile data
          return user;
        } catch (error) {
          console.log(error);
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
