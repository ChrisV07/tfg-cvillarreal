"use server"

import { prisma } from "@/src/lib/prisma"
import { TableSchema } from "@/src/schemas"
import { Table } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function updateTable(data: unknown, id: Table['id']){

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