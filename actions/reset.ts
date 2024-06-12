"use server";

import * as z from "zod";
import { ResetSchema } from "@/src/schemas";
import { getUserByEmail } from "@/data/user";
import { sendResetPasswordEmail } from "@/src/lib/mail";
import { generatePasswordResetToken } from "@/src/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) =>{
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success){
        return { error: "Email invalido!"}
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "El Email no se encuentra registrado!"}
    }

    const passwordResetToken = await generatePasswordResetToken(email)

    await sendResetPasswordEmail(
        passwordResetToken.email, 
        passwordResetToken.token,
    );

    return { success: "Email para restablecer contraseña enviado!"}
}