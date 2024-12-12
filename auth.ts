import prisma from "@/lib/prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google,
        Resend({
            from: "no-reply@jlerocher.com",
            apiKey: process.env.AUTH_RESEND_KEY,
            maxAge: 60 * 60 * 24 * 7,
        }),
        Credentials({
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    throw new Error("Invalid credentials.");
                }

                // Find user by email in the database
                const user = await prisma.user.findUnique({
                    where: { email: String(credentials.email) },
                });

                if (!user || !user.password) {
                    throw new Error("Invalid credentials.");
                }

                // Compare the provided password with the hashed password stored in the database
                const isPasswordValid = await bcrypt.compare(
                    String(credentials.password),
                    user.password, // No need to cast user.password to String
                );

                if (!isPasswordValid) {
                    throw new Error("Invalid credentials.");
                }

                return user;
            },
        }),
    ],
    callbacks: {
        session: async ({ session, user }) => {
            session.user.id = user.id;
            session.user.email = user.email;
            return session;
        },
    },
    session: { strategy: "database", maxAge: 60 * 60 * 24 * 7 }, // 7 days
    pages: {
        signIn: "/auth/signin",
        newUser: "/auth/profile",
    },
    useSecureCookies: process.env.NODE_ENV === "production",
});
