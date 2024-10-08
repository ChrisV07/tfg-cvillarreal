import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/src/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tableId = req.query.tableId as string;

  if (!tableId) {
    return res.status(400).json({ error: 'Table ID is required' });
  }

  try {
    const dailyOrder = await prisma.dailyOrder.findFirst({
      where: {
        tableId: tableId,
        isClosed: false,
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      },
      select: {
        id: true,
        total: true,
        isBillRequested: true,
        isClosed: true
      }
    });

    return res.json({
      total: dailyOrder?.total || 0,
      isBillRequested: dailyOrder?.isBillRequested || false,
      isClosed: dailyOrder?.isClosed || false,
      dailyOrderId: dailyOrder?.id || ""
    });
  } catch (error) {
    console.error('Error fetching daily order total:', error);
    return res.status(500).json({ error: 'Failed to fetch daily order total' });
  }
}