import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import FeedbackTable from "@/components/feedback/FeedbackTable"
import { UserButton } from "@/components/auth/user-button"
import { FeedbackWithRestaurant } from "@/src/types"

async function feedbackCount() {
  return await prisma.feedback.count()
}

async function getFeedback(): Promise<FeedbackWithRestaurant[]> {
  const feedback = await prisma.feedback.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      restaurant: true,
    },
  })
  return feedback
}

export default async function FeedbackHistoryPage({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const page = +searchParams.page || 1
  const pageSize = 10

  const feedbackData = getFeedback()
  const totalFeedbackData = feedbackCount()

  const [feedback, totalFeedback] = await Promise.all([
    feedbackData,
    totalFeedbackData,
  ])

  return (
    <>
      <div className="flex justify-end">
        <UserButton />
      </div>
      <div className="text-center">
        <Heading>Historial de Feedback</Heading>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        {/* Add any additional components or filters here if needed */}
      </div>

      <FeedbackTable feedback={feedback} initialPage={page} pageSize={pageSize} totalFeedback={totalFeedback} />
    </>
  )
}