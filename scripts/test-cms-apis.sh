#!/bin/bash

echo "🧪 Testing CMS APIs..."
echo ""

BASE_URL="http://localhost:3100"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to test API endpoint
test_api() {
    local name=$1
    local url=$2
    local expected_status=${3:-200}
    
    echo -n "Testing $name... "
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$response" -eq "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $response)"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC} (Expected HTTP $expected_status, got $response)"
        ((FAILED++))
    fi
}

# Function to test API with data
test_api_with_data() {
    local name=$1
    local url=$2
    
    echo -n "Testing $name... "
    
    response=$(curl -s "$url")
    http_code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$http_code" -eq 200 ]; then
        # Check if response is valid JSON and not empty
        if echo "$response" | jq -e . >/dev/null 2>&1; then
            count=$(echo "$response" | jq 'length' 2>/dev/null || echo "1")
            echo -e "${GREEN}✓ PASS${NC} (HTTP $http_code, $count items)"
            ((PASSED++))
        else
            echo -e "${RED}✗ FAIL${NC} (Invalid JSON response)"
            ((FAILED++))
        fi
    else
        echo -e "${RED}✗ FAIL${NC} (HTTP $http_code)"
        ((FAILED++))
    fi
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Testing Header API"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
test_api_with_data "GET Header (EN)" "$BASE_URL/api/admin/cms/header?locale=en"
test_api_with_data "GET Header (FR)" "$BASE_URL/api/admin/cms/header?locale=fr"
test_api_with_data "GET Header (AR)" "$BASE_URL/api/admin/cms/header?locale=ar"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. Testing Navbar API"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
test_api_with_data "GET Navbar Actions (EN)" "$BASE_URL/api/admin/cms/navbar/actions?locale=en"
test_api_with_data "GET Navbar Actions (FR)" "$BASE_URL/api/admin/cms/navbar/actions?locale=fr"
test_api_with_data "GET Navbar Actions (AR)" "$BASE_URL/api/admin/cms/navbar/actions?locale=ar"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. Testing Footer API"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
test_api_with_data "GET Footer Sections (EN)" "$BASE_URL/api/admin/cms/footer/sections?locale=en"
test_api_with_data "GET Footer Branding (EN)" "$BASE_URL/api/admin/cms/footer/branding?locale=en"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. Testing Social Links API"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
test_api_with_data "GET Social Links (EN)" "$BASE_URL/api/admin/cms/social?locale=en"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5. Testing CMS Pages"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
test_api "CMS Dashboard" "$BASE_URL/en/admin/cms"
test_api "Header Page" "$BASE_URL/en/admin/cms/header"
test_api "Navbar Page" "$BASE_URL/en/admin/cms/navbar"
test_api "Footer Page" "$BASE_URL/en/admin/cms/footer"
test_api "Social Page" "$BASE_URL/en/admin/cms/social"
test_api "Branding Page" "$BASE_URL/en/admin/cms/footer/branding"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Test Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
TOTAL=$((PASSED + FAILED))
echo -e "Total Tests: $TOTAL"
echo -e "${GREEN}Passed: $PASSED${NC}"
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}Failed: $FAILED${NC}"
    echo ""
    echo -e "${RED}❌ Some tests failed!${NC}"
    exit 1
else
    echo -e "${RED}Failed: 0${NC}"
    echo ""
    echo -e "${GREEN}✅ All tests passed!${NC}"
    exit 0
fi
