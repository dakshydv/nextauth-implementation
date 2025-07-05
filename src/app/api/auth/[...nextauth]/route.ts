import NextAuth from "next-auth";
import { prisma } from "@/lib/utils";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, profile }) {
      await prisma.user.create({
        data: {
          email: user.email || "",
          name: user.name || "",
          image: user.image || "",
          sessionId: user.id || "",
          sub: profile?.sub || "",
        },
      });
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
