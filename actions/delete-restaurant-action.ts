"use server"

import { prisma } from "@/src/lib/prisma";
import { Restaurant } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function deleteRestaurant(restaurantId: Restaurant['id']) {
  try {
    await prisma.restaurant.delete({
      where: {
        id: restaurantId,
      },
    });

    revalidatePath('/superadmin/restaurants'); 

    return { success: true };
  } catch (error) {
    console.error("Error al eliminar el Restaurante:", error);
    return { success: false, error: "Error al Eliminar el Restaurante" };
  }
}
