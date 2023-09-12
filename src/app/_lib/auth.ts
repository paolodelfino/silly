import { db } from "@/db";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

export function auth() {
  return getServerSession(authOptions);
}

/**
 * @description id param is supposed to be valid
 */
export async function currentUser(id: string) {
  return (await db.select().from(users).where(eq(users.id, id))).at(0)!;
}
