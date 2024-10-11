-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('EFECTIVO', 'TRANSFERENCIA', 'TARJETA');

-- AlterTable
ALTER TABLE "DailyOrder" ADD COLUMN     "payWith" DOUBLE PRECISION,
ADD COLUMN     "paymentMethod" "PaymentMethod";
