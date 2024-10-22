declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            image?: string;
            role: string;
        };
    }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: string;
            name: string;
            image?: string;
            role: string;
        };
    }
}
