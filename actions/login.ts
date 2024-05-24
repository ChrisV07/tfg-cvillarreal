"use server";
import { LoginSchema } from '@/src/schemas';
import * as z from 'zod'

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success){
        return { error: "Los datos son invalidos!" };
    }

    return { success: "Email sent!" };
}