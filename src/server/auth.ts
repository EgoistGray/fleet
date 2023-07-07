import { prisma } from "@/server/db";
import { type GetServerSidePropsContext } from "next";
import type { DefaultUser } from "next-auth";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import CredentialProvider from "next-auth/providers/credentials";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      company: string;
      firstName: string;
      lastName: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    company: string;
    firstName: string;
    lastName: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: {
      id: string;
      role: string;
      company: string;
      firstName: string;
      lastName: string;
    };
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/register",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = {
          id: user.id,
          role: user.role,
          company: user.company,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      }
      return token;
    },

    session: ({ session, token }) => {
      if (session.user && token.user) {
        session.user.id = token.user.id;
        session.user.role = token.user.role;
        session.user.company = token.user.company;
        session.user.firstName = token.user.firstName;
        session.user.lastName = token.user.lastName;

        // session.user = {
        //   ...session.user,
        //   ...token.user,
        // };
      }
      return session;
    },
  },
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: {
            username: credentials?.username,
          },
        });
        if (!user || !credentials) return null;
        // Note: this is comparing 2 hashes
        if (credentials.password !== user.password) return null;
        console.log(
          "Identification Status:",
          credentials.password === user.password,
          user
        );
        return user;
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
