/*
  Warnings:

  - You are about to drop the column `targetCalories` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `targetCarbs` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `targetFats` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `targetProtein` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `daily_targets` table. If the table is not empty, all the data it contains will be lost.

*/
-- 1. CreateTable target_periods
CREATE TABLE "target_periods" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "calories" INTEGER NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "fats" DOUBLE PRECISION NOT NULL,
    "goal" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "target_periods_pkey" PRIMARY KEY ("id")
);

-- 2. CreateIndex
CREATE INDEX "target_periods_userId_startDate_endDate_idx" ON "target_periods"("userId", "startDate", "endDate");

-- 3. AddForeignKey
ALTER TABLE "target_periods" ADD CONSTRAINT "target_periods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 4. MIGRATE DATA: Copy legacy user targets into TargetPeriod
INSERT INTO "target_periods" ("id", "userId", "startDate", "endDate", "calories", "protein", "carbs", "fats", "goal", "createdAt")
SELECT
    gen_random_uuid()::text,
    "id",
    COALESCE("createdAt", CURRENT_TIMESTAMP),
    NULL,
    COALESCE("targetCalories", 2000),
    COALESCE("targetProtein", 150),
    COALESCE("targetCarbs", 250),
    COALESCE("targetFats", 65),
    "goal",
    CURRENT_TIMESTAMP
FROM "users";

-- 5. DropForeignKey
ALTER TABLE "daily_targets" DROP CONSTRAINT "daily_targets_userId_fkey";

-- 6. AlterTable: Safe to drop columns now as data is preserved
ALTER TABLE "users" DROP COLUMN "targetCalories",
DROP COLUMN "targetCarbs",
DROP COLUMN "targetFats",
DROP COLUMN "targetProtein";

-- 7. DropTable
DROP TABLE "daily_targets";
