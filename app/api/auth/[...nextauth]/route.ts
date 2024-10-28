import prisma from "@/lib/prismaClient";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET!,

  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard";
    },
    async signIn(params) {
      console.log(params);
      if (!params.user.email) {
        return false;
      }

      try {
        const user = await prisma.user.findUnique({
          // @ts-ignore
          where: {
            email: params.user.email,
          },
        });
        if (user) {
          return true;
        }

        const newuser = await prisma.user.create({
          data: {
            email: params.user.email,
            // @ts-ignore
            name: params.user.name,
          },
        });
        console.log(newuser);
        return true;
      } catch (error) {
        console.log("error while creating the user : ", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
