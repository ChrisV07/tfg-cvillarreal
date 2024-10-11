"use server"

import { prisma } from "@/src/lib/prisma"
import { RestaurantSchema } from "@/src/schemas"
import { Restaurant } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function updateRestaurant(data: unknown, id: Restaurant['id']){

    const result = RestaurantSchema.safeParse(data)

    if(!result.success){
        return {
            errors: result.error.issues
        }
    }
    await prisma.restaurant.update({
        where:{
            id
        },
        data: result.data
    })
    revalidatePath('/superadmin/products')
}