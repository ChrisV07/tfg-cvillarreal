/*
  Warnings:

  - Added the required column `dailyOrderId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "dailyOrderId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "DailyOrder" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DOUBLE PRECISION NOT NULL,
    "tableId" TEXT NOT NULL,
    "restaurantID" TEXT NOT NULL,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DailyOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DailyOrder_tableId_idx" ON "DailyOrder"("tableId");

-- CreateIndex
CREATE INDEX "DailyOrder_restaurantID_idx" ON "DailyOrder"("restaurantID");

-- CreateIndex
CREATE INDEX "Order_dailyOrderId_idx" ON "Order"("dailyOrderId");

-- AddForeignKey
ALTER TABLE "DailyOrder" ADD CONSTRAINT "DailyOrder_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyOrder" ADD CONSTRAINT "DailyOrder_restaurantID_fkey" FOREIGN KEY ("restaurantID") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_dailyOrderId_fkey" FOREIGN KEY ("dailyOrderId") REFERENCES "DailyOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
