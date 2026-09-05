# Jeet's Journal - Database Setup (Windows PowerShell)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Jeet's Journal - Database Setup" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env file exists
if (-not (Test-Path "backend\.env")) {
  Write-Host "❌ Error: backend\.env file not found" -ForegroundColor Red
  Write-Host "Please create backend\.env from backend\.env.example and configure your database credentials"
  exit 1
}

# Load environment variables
Get-Content backend\.env | ForEach-Object {
  if ($_ -match '^([^=]+)=(.*)$') {
    [Environment]::SetEnvironmentVariable($matches[1], $matches[2], 'Process')
  }
}

$DB_HOST = $env:DB_HOST
$DB_PORT = $env:DB_PORT
$DB_NAME = $env:DB_NAME
$DB_USER = $env:DB_USER
$DB_PASSWORD = $env:DB_PASSWORD

Write-Host "📦 Database Configuration:" -ForegroundColor Yellow
Write-Host "   Host: $DB_HOST"
Write-Host "   Port: $DB_PORT"
Write-Host "   Database: $DB_NAME"
Write-Host "   User: $DB_USER"
Write-Host ""

# Check if psql is available
if (-not (Get-Command psql -ErrorAction SilentlyContinue)) {
  Write-Host "❌ Error: psql command not found" -ForegroundColor Red
  Write-Host "Please ensure PostgreSQL client tools are installed and in PATH"
  exit 1
}

# Check PostgreSQL connection
Write-Host "🔍 Checking PostgreSQL connection..." -ForegroundColor Yellow
$env:PGPASSWORD = $DB_PASSWORD
$testConnection = psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "\q" 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Error: Cannot connect to PostgreSQL" -ForegroundColor Red
  Write-Host "Please ensure PostgreSQL is running and credentials are correct"
  exit 1
}

Write-Host "✅ PostgreSQL connection successful" -ForegroundColor Green
Write-Host ""

# Create database if it doesn't exist
Write-Host "🗄️  Creating database '$DB_NAME' (if not exists)..." -ForegroundColor Yellow
$checkDb = psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" 2>&1
if ($checkDb -notmatch "1") {
  psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "CREATE DATABASE $DB_NAME"
}

Write-Host ""
Write-Host "📋 Running schema.sql..." -ForegroundColor Yellow
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f database\schema.sql

if ($LASTEXITCODE -eq 0) {
  Write-Host "✅ Schema created successfully" -ForegroundColor Green
} else {
  Write-Host "❌ Error: Schema creation failed" -ForegroundColor Red
  exit 1
}

Write-Host ""
Write-Host "🌱 Running seed.sql..." -ForegroundColor Yellow
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f database\seed.sql

if ($LASTEXITCODE -eq 0) {
  Write-Host "✅ Sample data inserted successfully" -ForegroundColor Green
} else {
  Write-Host "❌ Error: Seed data insertion failed" -ForegroundColor Red
  exit 1
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✅ Database setup complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Database contains:" -ForegroundColor Yellow
Write-Host "   • 1 admin user (username: admin, password: admin123)"
Write-Host "   • 6 sample blog posts"
Write-Host "   • 6 sample comments"
Write-Host "   • 3 sample contact messages"
Write-Host ""
Write-Host "🚀 You can now start the server with: cd backend; npm start" -ForegroundColor Cyan
Write-Host ""
