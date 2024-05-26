"use server";

import * as z from 'zod'

import { signIn } from '@/auth';
import { LoginSchema } from '@/src/schemas';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/src/lib/mail';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { generateVerificationToken } from '@/src/lib/tokens';



export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success){
        return { error: "Los datos son invalidos!" };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
        return { error: "El email no existe!"}
    }

    if (!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return { success: "Email de confirmación enviado!"}
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Algo salió mal!" }
                default: { error: "Algo salió mal!" }
            }
        }

        throw error;
    }
};