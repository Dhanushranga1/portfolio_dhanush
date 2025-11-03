#!/bin/bash
# Start both Portfolio and Strapi CMS locally

echo "🚀 Starting Local Development Environment..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $STRAPI_PID $PORTFOLIO_PID 2>/dev/null
    exit
}

trap cleanup EXIT INT TERM

# Start Strapi CMS
echo -e "${BLUE}📦 Starting Strapi CMS...${NC}"
cd ../portfolio-cms
npm run develop > strapi.log 2>&1 &
STRAPI_PID=$!
echo -e "${GREEN}✓ Strapi starting on http://localhost:1337${NC}"
echo -e "${GREEN}✓ Strapi Admin: http://localhost:1337/admin${NC}"
echo ""

# Wait for Strapi to be ready
echo "⏳ Waiting for Strapi to be ready (30 seconds)..."
sleep 30

# Start Portfolio
echo -e "${BLUE}🎨 Starting Portfolio...${NC}"
cd /home/dhanush/Development/Nexora/portfolio_dhanush/UniquePortfolio
npm run dev > portfolio.log 2>&1 &
PORTFOLIO_PID=$!
echo -e "${GREEN}✓ Portfolio starting on http://localhost:5000${NC}"
echo ""

echo "========================================="
echo -e "${GREEN}✅ Development environment ready!${NC}"
echo "========================================="
echo ""
echo "📍 URLs:"
echo "   Portfolio:     http://localhost:5000"
echo "   Strapi Admin:  http://localhost:1337/admin"
echo "   Strapi API:    http://localhost:1337/api"
echo ""
echo "📝 Logs:"
echo "   Strapi:   ../portfolio-cms/strapi.log"
echo "   Portfolio: ./portfolio.log"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for processes
wait $STRAPI_PID $PORTFOLIO_PID
