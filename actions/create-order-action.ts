"use server";

import { prisma } from "@/src/lib/prisma";
import { OrderSchema } from "@/src/schemas";

export async function createOrder(data: unknown) {
  const result = OrderSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.issues
    };
  }

  try {
    // Verificar si el tableId existe en la base de datos
    const tableExists = await prisma.table.findUnique({
      where: { id: result.data.tableId },
    });

    if (!tableExists) {
      return { error: "La Mesa asignada no existe." };
    }

    // Check if there's an unpaid bill for the table
    const unpaidBill = await prisma.dailyOrder.findFirst({
      where: {
        tableId: result.data.tableId,
        isBillRequested: true,
        isClosed: false,
      }
    });

    if (unpaidBill) {
      return { error: "Hay una cuenta pendiente de pago. No se pueden crear nuevas órdenes." };
    }

    // Verificar si existe una orden abierta y no pagada para la mesa en el día actual
    let dailyOrder = await prisma.dailyOrder.findFirst({
      where: {
        tableId: result.data.tableId,
        isClosed: false,
        isBillRequested: false,
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      }
    });

    // Si no existe una orden abierta, crear una nueva
    if (!dailyOrder) {
      dailyOrder = await prisma.dailyOrder.create({
        data: {
          tableId: result.data.tableId,
          restaurantID: result.data.restaurantID,
          total: result.data.total,
          isBillRequested: false,
        }
      });
    } else {
      // Si existe, actualizar el total
      dailyOrder = await prisma.dailyOrder.update({
        where: { id: dailyOrder.id },
        data: { total: { increment: result.data.total } }
      });
    }

    // Crear la nueva orden asociada a la dailyOrder
    const newOrder = await prisma.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        orderProducts: {
          create: result.data.order.map(product => ({
            productId: product.id,
            quantity: product.quantity
          }))
        },
        tableId: result.data.tableId,
        restaurantID: result.data.restaurantID,
        dailyOrderId: dailyOrder.id,
      }
    });

    return { success: true, dailyOrderTotal: dailyOrder.total };

  } catch (error) {
    console.error("Error al crear orden:", error);
    return { errors: [{ message: "Error al crear orden" }] };
  }
}
