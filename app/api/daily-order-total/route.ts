import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/src/lib/prisma";

export async function GET(request: NextRequest) {
  const tableId = request.nextUrl.searchParams.get('tableId');

  if (!tableId) {
    return NextResponse.json({ error: 'Table ID is required' }, { status: 400 });
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

    return NextResponse.json({
      total: dailyOrder?.total || 0,
      isBillRequested: dailyOrder?.isBillRequested || false,
      isClosed: dailyOrder?.isClosed || false,
      dailyOrderId: dailyOrder?.id || ""
    });
  } catch (error) {
    console.log('Error fetching daily order total LOG DESDE API:', error);
    return NextResponse.json({ error: 'Failed to fetch daily order total LOG DESDE API' }, { status: 500 });
  }
}