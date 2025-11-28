#!/bin/bash

# Test Cleaning Services - Comprehensive Testing Script
# Date: 26 Nov 2025

echo "🧪 CLEANING SERVICES - COMPREHENSIVE TESTS"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:3100"
PASS=0
FAIL=0

# Function to test URL
test_url() {
    local name=$1
    local url=$2
    local expected=${3:-200}
    
    echo -n "Testing: $name ... "
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
    
    if [ "$response" = "$expected" ]; then
        echo -e "${GREEN}✅ PASS${NC} ($response)"
        ((PASS++))
    else
        echo -e "${RED}❌ FAIL${NC} (Expected: $expected, Got: $response)"
        ((FAIL++))
    fi
}

# Function to test API
test_api() {
    local name=$1
    local method=$2
    local url=$3
    local expected=${4:-200}
    
    echo -n "Testing API: $name ... "
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
    else
        response=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" "$url" 2>/dev/null)
    fi
    
    if [ "$response" = "$expected" ]; then
        echo -e "${GREEN}✅ PASS${NC} ($response)"
        ((PASS++))
    else
        echo -e "${RED}❌ FAIL${NC} (Expected: $expected, Got: $response)"
        ((FAIL++))
    fi
}

echo -e "${BLUE}📋 SECTION 1: ADMIN PAGES${NC}"
echo "----------------------------"

# Home Cleaning
test_url "Home Cleaning - List" "$BASE_URL/en/admin/home-cleaning"
test_url "Home Cleaning - New" "$BASE_URL/en/admin/home-cleaning/new"

# Furniture Cleaning
test_url "Furniture Cleaning - List" "$BASE_URL/en/admin/furniture-cleaning"
test_url "Furniture Cleaning - New" "$BASE_URL/en/admin/furniture-cleaning/new"

# Laundry
test_url "Laundry - List" "$BASE_URL/en/admin/laundry"
test_url "Laundry - New" "$BASE_URL/en/admin/laundry/new"

echo ""
echo -e "${BLUE}📋 SECTION 2: APIs - GET${NC}"
echo "----------------------------"

# GET APIs
test_api "Home Cleaning - GET List" "GET" "$BASE_URL/api/home-cleaning"
test_api "Furniture Cleaning - GET List" "GET" "$BASE_URL/api/furniture-cleaning"
test_api "Laundry - GET List" "GET" "$BASE_URL/api/laundry"

echo ""
echo -e "${BLUE}📋 SECTION 3: APIs - POST (Auth Required)${NC}"
echo "----------------------------"

# POST APIs (should return 401 without auth)
test_api "Home Cleaning - POST" "POST" "$BASE_URL/api/home-cleaning" "401"
test_api "Furniture Cleaning - POST" "POST" "$BASE_URL/api/furniture-cleaning" "401"
test_api "Laundry - POST" "POST" "$BASE_URL/api/laundry" "401"

echo ""
echo -e "${BLUE}📋 SECTION 4: MENU INTEGRATION${NC}"
echo "----------------------------"

# Check if menu items are accessible
test_url "Admin Dashboard" "$BASE_URL/en/admin"

echo ""
echo -e "${BLUE}📋 SECTION 5: DATABASE${NC}"
echo "----------------------------"

# Check Prisma
echo -n "Checking Prisma Client ... "
if [ -d "node_modules/@prisma/client" ]; then
    echo -e "${GREEN}✅ PASS${NC}"
    ((PASS++))
else
    echo -e "${RED}❌ FAIL${NC}"
    ((FAIL++))
fi

echo -n "Checking Prisma Schema ... "
if [ -f "prisma/schema.prisma" ]; then
    if grep -q "CleaningService" prisma/schema.prisma; then
        echo -e "${GREEN}✅ PASS${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ FAIL${NC} (CleaningService not found)"
        ((FAIL++))
    fi
else
    echo -e "${RED}❌ FAIL${NC} (schema.prisma not found)"
    ((FAIL++))
fi

echo ""
echo "=========================================="
echo -e "${BLUE}📊 TEST RESULTS${NC}"
echo "=========================================="
echo -e "Total Tests: $((PASS + FAIL))"
echo -e "${GREEN}Passed: $PASS${NC}"
echo -e "${RED}Failed: $FAIL${NC}"

if [ $FAIL -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 ALL TESTS PASSED! 🎉${NC}"
    exit 0
else
    echo ""
    echo -e "${YELLOW}⚠️  Some tests failed. Please check the output above.${NC}"
    exit 1
fi
