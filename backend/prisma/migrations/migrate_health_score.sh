#!/bin/bash
# Migration script to add health_score to existing database
# Usage: ./migrate_health_score.sh

echo "🚀 Starting health score migration..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL environment variable is not set"
    echo "Please set it in your .env file or export it:"
    echo "export DATABASE_URL='postgresql://user:password@localhost:5432/dbname'"
    exit 1
fi

# Run the SQL migration
echo "📝 Running SQL migration..."
psql $DATABASE_URL -f prisma/migrations/add_health_score.sql

if [ $? -eq 0 ]; then
    echo "✅ Migration completed successfully!"
    echo "📦 Regenerating Prisma client..."
    npx prisma generate
    echo "✅ Done! Health score columns added to meals and daily_targets tables."
else
    echo "❌ Migration failed. Please check the error above."
    exit 1
fi

