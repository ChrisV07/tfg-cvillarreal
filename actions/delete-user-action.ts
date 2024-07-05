"use server"

import { prisma } from "@/src/lib/prisma";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function deleteUser(userId: User['id']) {
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    revalidatePath('/superadmin/users'); 

    return { success: true };
  } catch (error) {
    console.error("Error al eliminar el Usuario:", error);
    return { success: false, error: "Error al Eliminar el Usuario" };
  }
}
