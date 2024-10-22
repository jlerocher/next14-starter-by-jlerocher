import type { NextAuthConfig } from "next-auth";

export default {
    secret: process.env.AUTH_SECRET,
    basePath: "/api/auth",
    providers: [],
    pages: {
        signIn: "/auth/signin",
        // signOut: "/signout",
    },
} satisfies NextAuthConfig;
