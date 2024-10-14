-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "restaurantID" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Feedback_restaurantID_idx" ON "Feedback"("restaurantID");

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_restaurantID_fkey" FOREIGN KEY ("restaurantID") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
