"use server";

import { prisma } from "@/src/lib/prisma";
import { PaymentMethod } from "@prisma/client";

export async function requestBill(tableId: string, paymentMethod: PaymentMethod, payWith?: number) {
  try {
    const dailyOrder = await prisma.dailyOrder.findFirst({
      where: {
        tableId: tableId,
        isClosed: false,
        isBillRequested: false, // Aseguramos que la cuenta no haya sido solicitada ya
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
      return { error: "No se encontró una orden abierta para esta mesa o la cuenta ya ha sido solicitada" };
    }

    // Actualizar la orden diaria
    const updatedDailyOrder = await prisma.dailyOrder.update({
      where: { id: dailyOrder.id },
      data: { 
        isBillRequested: true,
        paymentMethod,
        payWith
      }
    });

    return {
      success: true,
      dailyOrder: updatedDailyOrder
    };
  } catch (error) {
    console.error(error);
    return { error: "Error al solicitar la cuenta" };
  }
}