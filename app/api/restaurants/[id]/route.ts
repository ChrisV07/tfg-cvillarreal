// app/api/restaurants/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Manejo de solicitudes GET
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    if (id === 'all') {
      const restaurants = await prisma.restaurant.findMany();
      return NextResponse.json(restaurants);
    } else {
      const restaurant = await prisma.restaurant.findUnique({
        where: { id: id },
      });

      if (restaurant) {
        return NextResponse.json(restaurant);
      } else {
        return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
      }
    }
  } catch (error) {
    console.error('Error fetching restaurant(s):', error);
    return NextResponse.json({ error: 'Error fetching restaurant(s)' }, { status: 500 });
  }
}

// Manejo de solicitudes PUT
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { name, image } = await req.json();
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: id },
      data: { name, image },
    });
    return NextResponse.json(updatedRestaurant);
  } catch (error) {
    console.error('Error updating restaurant:', error);
    return NextResponse.json({ error: 'Error updating restaurant' }, { status: 500 });
  }
}

// Manejo de solicitudes DELETE
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.restaurant.delete({
      where: { id: id },
    });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    return NextResponse.json({ error: 'Error deleting restaurant' }, { status: 500 });
  }
}
