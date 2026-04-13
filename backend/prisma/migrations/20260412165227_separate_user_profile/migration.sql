/*
  Warnings:

  - You are about to drop the column `userId` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `target_periods` table. All the data in the column will be lost.
  - You are about to drop the column `activityLevel` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `goal` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `targetWeight` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `workoutsPerWeek` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `weight_logs` table. All the data in the column will be lost.
  - Added the required column `profileId` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `target_periods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `weight_logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_userId_fkey";

-- DropForeignKey
ALTER TABLE "target_periods" DROP CONSTRAINT "target_periods_userId_fkey";

-- DropForeignKey
ALTER TABLE "weight_logs" DROP CONSTRAINT "weight_logs_userId_fkey";

-- DropIndex
DROP INDEX "meals_userId_date_idx";

-- DropIndex
DROP INDEX "target_periods_userId_startDate_endDate_idx";

-- DropIndex
DROP INDEX "weight_logs_userId_createdAt_idx";

-- AlterTable
ALTER TABLE "meals" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "target_periods" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "activityLevel",
DROP COLUMN "age",
DROP COLUMN "birthDate",
DROP COLUMN "gender",
DROP COLUMN "goal",
DROP COLUMN "height",
DROP COLUMN "role",
DROP COLUMN "targetWeight",
DROP COLUMN "weight",
DROP COLUMN "workoutsPerWeek";

-- AlterTable
ALTER TABLE "weight_logs" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "age" INTEGER,
    "birthDate" TIMESTAMP(3),
    "gender" TEXT,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "activityLevel" TEXT,
    "workoutsPerWeek" INTEGER,
    "goal" TEXT,
    "targetWeight" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- CreateIndex
CREATE INDEX "meals_profileId_date_idx" ON "meals"("profileId", "date");

-- CreateIndex
CREATE INDEX "target_periods_profileId_startDate_endDate_idx" ON "target_periods"("profileId", "startDate", "endDate");

-- CreateIndex
CREATE INDEX "weight_logs_profileId_createdAt_idx" ON "weight_logs"("profileId", "createdAt");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weight_logs" ADD CONSTRAINT "weight_logs_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "target_periods" ADD CONSTRAINT "target_periods_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
