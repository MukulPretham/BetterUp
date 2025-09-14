import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "@repo/db/client"

import { stringify } from "querystring";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }

  interface JWT {
    id: string;
  }
}


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
    async signIn({ user, account, profile }: any) {
      const exist = await client.user.findFirst({
        where: {
          id: user?.id
        }
      });
      if (!exist) {
        await client.user.create({
          data: {
            id: user?.id,
            email: user?.email,
            username: user?.name,
            password: user?.id
          }
        })
      }
      return true
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;  // store id in JWT
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;  // pass id to session.user
      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signIn",
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }