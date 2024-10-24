import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: "",
      clientSecret: "",
    }),
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);
