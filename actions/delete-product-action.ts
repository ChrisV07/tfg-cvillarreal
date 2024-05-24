"use server"

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: number) {
  try {
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    revalidatePath('/admin/products'); // Esto podría no ser necesario

    return { success: true };
  } catch (error) {
    console.error("Error al eliminar el Producto:", error);
    return { success: false, error: "Error al Eliminar el Producto" };
  }
}
