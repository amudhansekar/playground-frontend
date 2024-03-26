import { Account, NextAuthOptions, Profile, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

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
    async jwt(params: {
      token: JWT;
      user: User | AdapterUser;
      account: Account | null;
      profile?: Profile | undefined;
      trigger?: "signIn" | "signUp" | "update" | undefined;
      isNewUser?: boolean | undefined;
      session?: any;
    }) {
      const { token, user, account, profile, trigger, isNewUser, session } =
        params;
      if (account) {
        token.token_set = account;
      }
      return token;
    },

    async session(params: { session: Session; token: JWT; user: AdapterUser }) {
      const { session, token, user } = params;
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.token_set = token.token_set as Account;
      return session;
    },
  },
};

export default authOptions;
