"use server";

import { prisma } from "@/src/lib/prisma";

export async function payBill(formData: FormData) {
  const dailyOrderId = formData.get("dailyOrderId") as string;
  try {
    const dailyOrder = await prisma.dailyOrder.findFirst({
      where: {
        id: dailyOrderId,
        isBillRequested: true,
        isClosed: false,
      },
      include: {
        orders: {
          include: {
            orderProducts: {
              include: {
                product: true
              }
            }
          }
        }
      }
    });

    if (!dailyOrder) {
      return { error: "No hay órdenes abiertas para esta mesa o la cuenta no ha sido solicitada" };
    }

    // Cerrar la orden diaria sin cambiar isBillRequested
    const updatedDailyOrder = await prisma.dailyOrder.update({
      where: { id: dailyOrder.id },
      data: { 
        isClosed: true
      }
    });

    return {
      success: true,
      dailyOrder: updatedDailyOrder
    };
  } catch (error) {
    console.error(error);
    return { error: "Error al marcar la cuenta como pagada" };
  }
}