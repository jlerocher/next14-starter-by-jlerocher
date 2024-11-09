import { prisma } from "@/lib/prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google,
        Resend({
            from: "no-reply@jlerocher.com",
        }),
    ],
    session: { strategy: "database", maxAge: 60 * 60 * 24 * 7 }, // 7 days
});
