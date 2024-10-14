import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Manejo de las solicitudes GET, PUT y DELETE
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    if (id === 'all') {
      const restaurants = await prisma.restaurant.findMany()
      return NextResponse.json(restaurants)
    } else {
      const restaurant = await prisma.restaurant.findUnique({
        where: { id: id },
      })
      if (restaurant) {
        return NextResponse.json(restaurant)
      } else {
        return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 })
      }
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching restaurant(s)' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const { name, image } = await req.json()  // Leer el cuerpo de la solicitud

  try {
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: id },
      data: { name, image },
    })
    return NextResponse.json(updatedRestaurant)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating restaurant' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    await prisma.restaurant.delete({
      where: { id: id },
    })
    return NextResponse.json({}, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting restaurant' }, { status: 500 })
  }
}

