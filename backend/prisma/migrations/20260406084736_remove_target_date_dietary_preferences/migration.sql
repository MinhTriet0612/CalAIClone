/*
  Warnings:

  - You are about to drop the column `dietaryPreferences` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `targetDate` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "dietaryPreferences",
DROP COLUMN "targetDate";
