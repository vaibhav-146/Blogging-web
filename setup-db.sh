#!/bin/bash

# Database Setup Script for Jeet's Journal
# This script creates the database schema and populates sample data

echo "=========================================="
echo "Jeet's Journal - Database Setup"
echo "=========================================="
echo ""

# Check if .env file exists
if [ ! -f backend/.env ]; then
  echo "❌ Error: backend/.env file not found"
  echo "Please create backend/.env from backend/.env.example and configure your database credentials"
  exit 1
fi

# Load environment variables
export $(cat backend/.env | grep -v '^#' | xargs)

echo "📦 Database Configuration:"
echo "   Host: $DB_HOST"
echo "   Port: $DB_PORT"
echo "   Database: $DB_NAME"
echo "   User: $DB_USER"
echo ""

# Check if PostgreSQL is accessible
echo "🔍 Checking PostgreSQL connection..."
if ! PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c '\q' 2>/dev/null; then
  echo "❌ Error: Cannot connect to PostgreSQL"
  echo "Please ensure PostgreSQL is running and credentials are correct"
  exit 1
fi

echo "✅ PostgreSQL connection successful"
echo ""

# Create database if it doesn't exist
echo "🗄️  Creating database '$DB_NAME' (if not exists)..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || \
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "CREATE DATABASE $DB_NAME"

echo ""
echo "📋 Running schema.sql..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f database/schema.sql

if [ $? -eq 0 ]; then
  echo "✅ Schema created successfully"
else
  echo "❌ Error: Schema creation failed"
  exit 1
fi

echo ""
echo "🌱 Running seed.sql..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f database/seed.sql

if [ $? -eq 0 ]; then
  echo "✅ Sample data inserted successfully"
else
  echo "❌ Error: Seed data insertion failed"
  exit 1
fi

echo ""
echo "=========================================="
echo "✅ Database setup complete!"
echo "=========================================="
echo ""
echo "📊 Database contains:"
echo "   • 1 admin user (username: admin, password: admin123)"
echo "   • 6 sample blog posts"
echo "   • 6 sample comments"
echo "   • 3 sample contact messages"
echo ""
echo "🚀 You can now start the server with: cd backend && npm start"
echo ""
