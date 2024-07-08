"use server"

import { prisma } from "@/src/lib/prisma"
import { RestaurantSchema } from "@/src/schemas"


export async function createRestaurant(data:unknown) {

    const result = RestaurantSchema.safeParse(data)

    if (!result.success) {
        return {
            errors: result.error.issues,
        };
    }

    try {
        const createdRestaurant = await prisma.restaurant.create({
            data: result.data,
        });
    
    return {
        success: true,
        restaurant: createdRestaurant,
    };
} catch (error) {
    console.error("Ocurrio un Error al Crear Restaurante:", error);
    return {
        success: false,
        error: "Ocurrio un Error al Crear Restaurante:",
    };
    
}
}