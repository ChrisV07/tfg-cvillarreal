"use server"

import { prisma } from "@/src/lib/prisma";
import { Table } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function deleteTable(tableId: Table['id']) {
  try {
    await prisma.table.delete({
      where: {
        id: tableId,
      },
    });

    revalidatePath('/admin/tables'); // Esto podría no ser necesario

    return { success: true };
  } catch (error) {
    console.error("Error al eliminar la mesa:", error);
    return { success: false, error: "Error al eliminar la mesa" };
  }
}
