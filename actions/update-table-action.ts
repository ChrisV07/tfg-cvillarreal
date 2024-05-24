"use server"

import { prisma } from "@/src/lib/prisma"
import { TableSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"

export async function updateTable(data: unknown, id: number){

    const result = TableSchema.safeParse(data)

    if(!result.success){
        return {
            errors: result.error.issues
        }
    }
    await prisma.table.update({
        where:{
            id
        },
        data: result.data
    })
    revalidatePath('/admin/tables')
}