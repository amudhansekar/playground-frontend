import { Account, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// refresh token roatation: https://authjs.dev/guides/refresh-token-rotation

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      // todo - specify scope
      // authorization: {
      //   params: {
      //     scope:
      //       'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
      //   },
      // },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }) {
      if (account) {
        token.token_set = account;
      }
      return token;
    },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.token_set = token.token_set as Account;
      return session;
    },
  },
};

export default authOptions;
