'use client'

import { useState, useEffect } from "react"
import { formatDate } from "@/src/utils"
import Link from "next/link"
import { useCurrentRestaurant } from "@/hooks/use-current-session"
import Pagination from "@/components/ui/Pagination"
import { FeedbackWithRestaurant } from "@/src/types"
import { Star } from 'lucide-react'

type FeedbackTableProps = {
  feedback: FeedbackWithRestaurant[]
  initialPage: number
  pageSize: number
  totalFeedback: number
}

export default function FeedbackTable({ feedback, initialPage, pageSize, totalFeedback }: FeedbackTableProps) {
  const restaurantID = useCurrentRestaurant()
  const [filteredFeedback, setFilteredFeedback] = useState<FeedbackWithRestaurant[]>([])
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(0)
  const [averageRating, setAverageRating] = useState(0)

  useEffect(() => {
    const filtered = feedback.filter((item) => item.restaurantID === restaurantID)
    setFilteredFeedback(filtered)
    setTotalPages(Math.ceil(totalFeedback / pageSize))

    // Calcular calificación promedio
    const totalRating = filtered.reduce((sum, item) => sum + item.rating, 0)
    setAverageRating(filtered.length > 0 ? totalRating / filtered.length : 0)
  }, [feedback, restaurantID, pageSize, totalFeedback])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const paginatedFeedback = filteredFeedback.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const truncateComment = (comment: string | null, maxLength: number) => {
    if (!comment) return "Sin comentario"
    return comment.length > maxLength ? `${comment.substring(0, maxLength)}...` : comment
  }

  const renderStars = (rating: number) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-12">
      <div className="mb-6 text-center">
        <div className="flex justify-center items-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-8 h-8 ${star <= Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <p className="text-2xl mb-4 font-bold text-slate-800">
          Promedio de Calificación: {averageRating.toFixed(2)} / 5
        </p>
        <p className="text-lg text-slate-600">
          Total de Feedbacks: {filteredFeedback.length}
        </p>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 rounded-xl shadow">
            {paginatedFeedback.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Calificación
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Comentario
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Fecha
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedFeedback.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {item.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {renderStars(item.rating)}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {truncateComment(item.comment, 60)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatDate(item.createdAt.toString())}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <Link
                          href={`/admin/feedback_history/details/${item.id}`}
                          className="text-violet-800 hover:text-violet-400 px-8"
                        >
                          Ver Detalles <span className="sr-only">, {item.id}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600 text-lg mt-40 mb-2 text-center">
                No existe feedback.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-200">
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          path="/admin/feedback_history"
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
