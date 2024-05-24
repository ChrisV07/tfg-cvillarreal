"use server";

import * as z from 'zod'

import { signIn } from '@/auth';
import { LoginSchema } from '@/src/schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success){
        return { error: "Los datos son invalidos!" };
    }

    const { email, password } = validatedFields.data;

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
                    return { error: "Datos Invalidos!" }
                default: { error: "Algo salió mal!" }
            }
        }

        throw error;
    }
};