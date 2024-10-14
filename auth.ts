import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { getUserByID } from "@/data/user"
import { prisma } from "@/src/lib/prisma"
import authConfig from "@/auth.config"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"



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
        async signIn({ user, account}) {
            console.log({
                user, 
                account,
            })
            //Allow Oauth whitout email verification
            if (account?.provider !== 'credentials') return true;

            const existingUser = await getUserByID(user.id!);

            //prevent sign in whitout verification
            if (!existingUser?.emailVerified) return false

            if (existingUser.isTwoFactorEnabled){
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                if (!twoFactorConfirmation) return false;

                //Delete F2A for Next Sign In
                await prisma.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id}
                })
            }

            return true;
        },
        async session({ token, session}){
            if (token.sub && session.user){
                session.user.id = token.sub
            }

            if (token.role && session.user){
                session.user.role = token.role  as "SUPER_ADMIN" | "RESTO_ADMIN" | "KITCHEN_ORDERS" | "READY_ORDERS" | "CLIENT_USER";
            }
            if (token.restaurantID && session.user) {
                session.user.restaurantID = token.restaurantID as string
            }

            return session
        },
        async jwt({ token }){
            if (!token.sub) return token;

            const existingUser = await getUserByID(token.sub);

            if (!existingUser) return token;

            token.role= existingUser.role;
            token.restaurantID = existingUser.restaurantID; 

            return token;
        },
    },
    adapter: PrismaAdapter(prisma),
    session: {strategy: 'jwt'},
    ...authConfig,
})