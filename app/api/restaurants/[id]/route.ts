import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const id = req.query.id as string

  switch (method) {
    case 'GET':
      try {
        if (id === 'all') {
          const restaurants = await prisma.restaurant.findMany()
          res.status(200).json(restaurants)
        } else {
          const restaurant = await prisma.restaurant.findUnique({
            where: { id: id },
          })
          if (restaurant) {
            res.status(200).json(restaurant)
          } else {
            res.status(404).json({ error: 'Restaurant not found' })
          }
        }
      } catch (error) {
        res.status(500).json({ error: 'Error fetching restaurant(s)' })
      }
      break

    case 'PUT':
      try {
        const { name, image } = req.body
        const updatedRestaurant = await prisma.restaurant.update({
          where: { id: id },
          data: { name, image },
        })
        res.status(200).json(updatedRestaurant)
      } catch (error) {
        res.status(500).json({ error: 'Error updating restaurant' })
      }
      break

    case 'DELETE':
      try {
        await prisma.restaurant.delete({
          where: { id: id },
        })
        res.status(204).end()
      } catch (error) {
        res.status(500).json({ error: 'Error deleting restaurant' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}