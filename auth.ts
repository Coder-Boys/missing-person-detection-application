import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,

    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        const prisma = new PrismaClient();
        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email & password");
        }

        const user = await prisma.user.findFirst({
          where: {
            email: email,
          },
          select: {
            id: true,
            password: true, // Explicitly include the password
            role: true, // Explicitly include the role
            firstName: true,
            lastName: true,
            email: true,
          },
        });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        if (!user.password) {
          throw new Error("Invalid email or password");
        }

        const isMatched = await compare(password, user.password);

        if (!isMatched) {
          throw new Error("Password did not matched");
        }

        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          id: user.id,
        };

        return userData;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    // signIn: async ({ user, account }) => {
    //   if (account?.provider === "google") {
    //     try {
    //     const prisma = new PrismaClient();

    //       const { email, name, image, id } = user;
    //       const alreadyUser = await prisma.user.findFirst({where:{ email }});

    //       if (!alreadyUser) {
    //         await prisma.user.create({data : { email, firstName:name,
    //           lastName:name, image, authProviderId: id }});
    //       } else {
    //         return true;
    //       }
    //     } catch (error) {
    //       throw new Error("Error while creating user");
    //     }
    //   }

    //   if (account?.provider === "credentials") {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
  },
});
