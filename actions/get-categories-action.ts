"use server"

import { prisma } from "@/src/lib/prisma"
import { cache } from 'react'

export const getCategories = cache(async () => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        restaurantID: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return categories
  } catch (error) {
    console.error("Error al obtener categorías:", error)
    throw new Error("No se pudieron cargar las categorías. Por favor, intente de nuevo más tarde.")
  }
})