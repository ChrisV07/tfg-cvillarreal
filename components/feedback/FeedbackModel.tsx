'use client'

import React, { useState, ChangeEvent, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from 'lucide-react'
import { toast } from 'react-toastify'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  restaurantID: string
}

export default function FeedbackModal({ isOpen, onClose, restaurantID }: FeedbackModalProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
  }, [restaurantID])

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Por favor, selecciona una calificación", { theme: "dark" })
      return
    }

    if (!restaurantID) {
      console.error('restaurantID is missing or invalid:', restaurantID)
      toast.error("Error: ID del restaurante no disponible", { theme: "dark" })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantID,
          rating,
          comment,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el feedback')
      }

      toast.success("Gracias por tu feedback anónimo!", { theme: "dark" })
      setRating(0)
      setComment('')
      onClose()
    } catch (error) {
      console.error('Error submitting feedback:', error)
      toast.error(`Error al enviar el feedback: ${error instanceof Error ? error.message : 'Unknown error'}`, { theme: "dark" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Danos tu opinión</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`cursor-pointer ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <Textarea
            placeholder="Deja un comentario anónimo (opcional)"
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar feedback'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}