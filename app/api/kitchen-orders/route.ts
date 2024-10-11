import { prisma } from "@/src/lib/prisma"

export const dynamic = 'force-dynamic'

export async function GET() {
    const orders = await prisma.order.findMany({
        where: {
            cooked: false
        },
        include: {
            orderProducts: {
                include: {
                    product: true,
                }
            },
            table: true
        }
    })
    return Response.json(orders)
}
