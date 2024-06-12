"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { prisma } from "@/src/lib/prisma";
import { NewPasswordSchema } from "@/src/schemas";
import { hash } from "bcryptjs";
import * as z from "zod"

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    if (!token) {
        return { error: "Falta el Token!"}
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if(!validatedFields.success){
        return { error: "Contraseña Invalida"}
    }

    const { password } = validatedFields.data

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken){
        return { error: "Token Invalido"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return { error: "El Token Expiró!"}
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser){
        return { error: "El Email no se encuentra registrado"}
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.update({
        where: {id: existingUser.id},
        data: {password: hashedPassword}
    });

    await prisma.passwordResetToken.delete({
        where: { id: existingToken.id}
    })

    return { success: "Contraseña Actualizada!"}
}