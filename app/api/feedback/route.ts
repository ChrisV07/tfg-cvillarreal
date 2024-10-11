import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Initialize PrismaClient
const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { restaurantID, rating, comment } = await req.json()

    console.log('Received feedback data:', { restaurantID, rating, comment })

    if (!restaurantID || !rating) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const feedback = await prisma.feedback.create({
      data: {
        restaurantID,
        rating,
        comment,
      },
    })

    console.log('Created feedback:', feedback)

    return NextResponse.json({ success: true, feedback })
  } catch (error) {
    console.error('Error submitting feedback:', error)

    if (error instanceof Error) {
      if (error.message.includes('PrismaClient')) {
        console.error('Prisma Client Error:', error.message)
        return NextResponse.json(
          { success: false, error: 'Database connection error', details: error.message },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { success: false, error: 'Failed to submit feedback', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}