import NextAuth, { type  DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
    role: "SUPER_ADMIN" | "RESTO_ADMIN" | "ORDER_USER" | "CLIENT_USER"
}

declare module "next-auth"{

    interface Session {
        user: ExtendedUser;
    }
}

import { JWT } from "@auth/core/jwt"

declare module "@auth/core/jwt" {
    interface JWT{
        role?: "SUPER_ADMIN" | "RESTO_ADMIN" | "ORDER_USER" | "CLIENT_USER"
    }
}