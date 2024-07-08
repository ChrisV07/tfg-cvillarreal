"use server"

import { prisma } from "@/src/lib/prisma"
import { UserSchema } from "@/src/schemas"
import { User } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function updateUser(data: unknown, id: User['id']){

    const result = UserSchema.safeParse(data)

    if(!result.success){
        return {
            errors: result.error.issues
        }
    }
    await prisma.user.update({
        where:{
            id
        },
        data: result.data
    })
    
    revalidatePath('/superadmin/users')
}