import prisma from "@/lib/prismaClient";
import { NextAuthOptions, Session } from "next-auth";
import Google from "next-auth/providers/google";
export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile }) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: profile?.email,
          },
        });

        if (!user) {
          const newuser = await prisma.user.create({
            data: {
              email: profile?.email!,
              name: profile?.name!,
            },
          });
        }
      } catch (error) {
        console.log("error while creating the user : ", error);
      }
      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.email = profile.email as string;
        token.id = account.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
        });

        if (user) {
          session.user.id = user.id;
        }
      } catch (error) {
        console.log("error occured in session callback : ", error);
      }
      return session;
    },
  },
} satisfies NextAuthOptions;
