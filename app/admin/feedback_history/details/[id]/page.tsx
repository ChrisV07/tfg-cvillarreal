import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"
import { FeedbackWithRestaurant } from "@/src/types"
import { formatDate } from "@/src/utils"

async function getFeedbackById(id: string): Promise<FeedbackWithRestaurant> {
  const feedback = await prisma.feedback.findUnique({
    where: { id },
    include: {
      restaurant: true,
    },
  })

  if (!feedback) {
    notFound()
  }

  return feedback
}

export default async function FeedbackDetailPage({ params }: { params: { id: string } }) {
  const feedback = await getFeedbackById(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <Heading>Detalle del Feedback: {feedback.id}</Heading>
      <GoBackButton seccion="Feedback" />
      
      <div className="bg-white shadow rounded-lg flex flex-col h-full mt-8">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-pink-600">
                Restaurante: {feedback.restaurant.name}
              </p>
              <p className="text-xl font-semibold text-slate-600 mt-2">
                Calificación: {feedback.rating} / 5
              </p>
            </div>
            <p className="text-xl font-semibold text-slate-600">
              Fecha: {formatDate(feedback.createdAt.toString())}
            </p>
          </div>

          <div className="border-t pt-6">
            <p className="text-xl font-semibold text-slate-600 mb-4">
              Comentario:
            </p>
            <p className="text-lg text-gray-700 break-words">
              {feedback.comment || "Sin comentario"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}