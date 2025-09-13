import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "@repo/db/client"
import { pages } from "next/dist/build/templates/app-page";
import e from "express";
import { stringify } from "querystring";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      //@ts-ignore
      async authorize(credentials: any, req: any) {
        // Add logic here to look up the user from the credentials supplied
        try {
          const user = await client.user.findFirst({
            where: {
              username: credentials?.username
            }
          })

          if (!user) {
            throw new Error("user does not exist")
            return null
          }

          if (user.password != credentials?.password) {
            throw new Error("incorrect password")
            return null
          }

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return { name: user.username, email: user.email, image: null, id: user.id }
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            throw new Error("Wrong credentials")

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }

        } catch (err) {
          throw new Error(`${err}`)
        }
      }
    }),

    // ...add more providers here
  ],

  callbacks: {
    async jwt({ token, user }:any) {
      // On login, persist the user id to token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }:any) {
      // Add the user id to session.user
      if (token && session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signIn",
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }