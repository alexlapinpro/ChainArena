#!/bin/bash

echo "🔍 Testing Chain Arena Database Connection..."

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
    echo "✅ Loaded .env file"
else
    echo "❌ .env file not found!"
    exit 1
fi

echo "📊 Database Configuration:"
echo "  Host: $DB_HOST"
echo "  User: $DB_USER"
echo "  Database: $DB_NAME"
echo "  Port: $DB_PORT"

# Test connection
echo "🔍 Testing PostgreSQL connection..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "SELECT 'Connection successful!' as status;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Database connection successful!"
    echo ""
    echo "📋 Now you can run:"
    echo "   go run cmd/seed/main.go"
    echo "   go build -o chainarena ./cmd/app"
else
    echo "❌ Database connection failed!"
    echo ""
    echo "🔧 Possible solutions:"
    echo "1. Check if PostgreSQL is running: sudo systemctl status postgresql"
    echo "2. Verify user exists: sudo -u postgres psql -c \"\\du\""
    echo "3. Verify database exists: sudo -u postgres psql -c \"\\l\""
    echo "4. Reset password: sudo -u postgres psql -c \"ALTER USER chainarena_user PASSWORD 'your_secure_password';\""
fi