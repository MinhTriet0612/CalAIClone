-- CreateTable
CREATE TABLE "weight_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rawWeight" DOUBLE PRECISION NOT NULL,
    "trendWeight" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "weight_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "weight_logs_userId_createdAt_idx" ON "weight_logs"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "weight_logs" ADD CONSTRAINT "weight_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
