"use server"

import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

export async function completeKitchenOrder(formData: FormData) {

    const data = {
        orderId : formData.get('order_id')
    }

    const result = OrderIdSchema.safeParse(data)

    if (result.success) {
        try {
            await prisma.order.update({
                where:{
                    id: result.data.orderId
                },
                data: {
                    cooked: true,
                    orderCookedAt: new Date(Date.now())
                }
            })

            revalidatePath('/orders/kitchenorders')

        } catch (error) {
            console.log(error);
            
        }
    }
    
    
}