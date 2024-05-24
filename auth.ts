import NextAuth, { DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { getUserByID } from "@/data/user"
import { prisma } from "@/src/lib/prisma"
import authConfig from "@/auth.config"



export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn:'/auth/login',
        error: "/auth/error"
    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()}
            })
        }
    },
    callbacks: {
        async session({ token, session}){
            if (token.sub && session.user){
                session.user.id = token.sub
            }

            if (token.role && session.user){
                session.user.role = token.role 
            }

            return session
        },
        async jwt({ token }){
            if (!token.sub) return token;

            const existingUser = await getUserByID(token.sub);

            if (!existingUser) return token;

            token.role= existingUser.role;

            return token;
        },
    },
    adapter: PrismaAdapter(prisma),
    session: {strategy: 'jwt'},
    ...authConfig,
})