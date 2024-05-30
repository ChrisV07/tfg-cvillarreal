"use server";

import { prisma } from "@/src/lib/prisma";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
    const existingToken = await  getVerificationTokenByToken(token);

    if (!existingToken) {
        return { error: "Falta el Token!"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired ){
        return { error: "El Token ha expirado!"}
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) {
        return { error: "El Email no existe"}
    }

    await prisma.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        }
    });

    await prisma.verificationToken.delete({
        where: {
            id: existingToken.id
        }
    });

    return { success: "Email Verificado!"}
}