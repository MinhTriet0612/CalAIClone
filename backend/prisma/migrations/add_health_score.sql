-- Migration: Add health score to meals and daily_targets tables
-- Run this script to add health_score column to existing database

-- Add health_score to meals table
ALTER TABLE "meals" 
ADD COLUMN IF NOT EXISTS "healthScore" INTEGER;

-- Add health_score to daily_targets table
ALTER TABLE "daily_targets" 
ADD COLUMN IF NOT EXISTS "healthScore" INTEGER;

-- Add comments for documentation
COMMENT ON COLUMN "meals"."healthScore" IS 'Health score from 1-10 for individual meal';
COMMENT ON COLUMN "daily_targets"."healthScore" IS 'Daily health score from 1-10 (can be calculated or set manually)';

