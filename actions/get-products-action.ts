"use server"

import { prisma } from "@/src/lib/prisma"
import { cache } from 'react'

export const getRestaurantProducts = async (restaurantId: string) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        restaurantID: restaurantId,
      },
      select: {
        name: true, // Solo obtenemos el nombre de los productos
      },
    });

    return products.map((product) => product.name); // Devolvemos una lista de nombres de productos
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
};