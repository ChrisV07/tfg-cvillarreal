"use server"

import { prisma } from "@/src/lib/prisma";
import { Restaurant } from "@prisma/client";


export async function getRestaurant(restaurantID: Restaurant['id']) {
  try {
    const restaurant = await prisma.restaurant.findFirst({
      where: {
        id: restaurantID,
      },
    });

    return restaurant || null; // Retorna null si no se encuentra
  } catch (error) {
    console.error("Error al obtener el restaurante:", error);
    return null; // También retorna null en caso de error
  }
}
