"use server"

import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

export async function deliverOrder(formData: FormData) {

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
                    delivered: true,
                    orderDeliveredAt: new Date(Date.now())
                }
            })

            revalidatePath('/orders/readyorders')

        } catch (error) {
            console.log(error);
            
        }
    }
    
    
}