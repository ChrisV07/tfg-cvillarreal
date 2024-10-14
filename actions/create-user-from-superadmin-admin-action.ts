"use server";
import * as z from 'zod'
import { CreateUserFromSuperAdminSchema } from '@/src/schemas';
import { hash } from 'bcryptjs';
import { prisma } from '@/src/lib/prisma';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/src/lib/tokens';
import { sendVerificationEmail } from '@/src/lib/mail';


export const createUserFromSuperAdmin = async (values: z.infer<typeof CreateUserFromSuperAdminSchema>) => {
    const validatedFields = CreateUserFromSuperAdminSchema.safeParse(values);

    if (!validatedFields.success){
        return { error: "Los datos son invalidos!" };
    }

    const { email, password, name, role, restaurantID } = validatedFields.data;
    const hashedPassword = await hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if(existingUser){
        return { error: "El Email ya se encuentra en uso!" };
    }

    const emailVerified = new Date();

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
            restaurantID,
            emailVerified,
        },
    });

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )

    return { success: "Email de Confirmación Enviado!" };
}