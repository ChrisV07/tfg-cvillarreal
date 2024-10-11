-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "delivered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "orderDeliveredAt" TIMESTAMP(3);
