"use server"

import { prisma } from "@/src/lib/prisma"
import { TableSchema } from "@/src/schemas"
import { generateQR } from "./generate-qr-actions";

export async function createTable(data:unknown) {

    const result = TableSchema.safeParse(data)

    if (!result.success) {
        return {
            errors: result.error.issues,
        };
    }

    try {
        const createdTable = await prisma.table.create({
            data: result.data,
        });
    const qrContent = `https://tesisfinalgradocvillarreal.vercel.app/${createdTable.restaurantID}/cafe?table=${createdTable.id}`
    const qrFileName =  `public/qr_tables/qr_${createdTable.name}_${createdTable.ubication}.jpg`
    await generateQR(qrContent, qrFileName)
    
    return {
        success: true,
        table: createdTable,
    };
} catch (error) {
    console.error("Error creating table:", error);
    return {
        success: false,
        error: "Error creating table",
    };
    
}
}