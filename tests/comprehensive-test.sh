#!/bin/bash
BASE_URL="http://localhost:3100"
API_URL="$BASE_URL/api"
LOCALE="en"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

test_result() {
    local name="$1"
    local status_code="$2"
    local expected="$3"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    if [ "$status_code" -eq "$expected" ]; then
        echo -e "${GREEN}✅ PASS${NC} - $name (HTTP $status_code)"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}❌ FAIL${NC} - $name (Expected $expected, got $status_code)"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
}

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  COMPREHENSIVE BOOKING SYSTEM TEST${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

echo -e "${YELLOW}📄 Testing Detail Pages...${NC}"
echo ""

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$LOCALE/coaches/layla-hassan-mindset-coach")
test_result "Coach Detail Page" "$STATUS" "200"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$LOCALE/activities/desert-safari-dubai")
test_result "Activity Detail Page" "$STATUS" "200"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$LOCALE/yachts/lamborghini-yacht")
test_result "Yacht Detail Page" "$STATUS" "200"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$LOCALE/maids/maria-santos")
test_result "Maid Detail Page" "$STATUS" "200"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$LOCALE/rental-cars/lamborghini-urus")
test_result "Rental Car Detail Page" "$STATUS" "200"

echo ""
echo -e "${YELLOW}📝 Testing Booking Pages...${NC}"
echo ""

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$LOCALE/coaches/layla-hassan-mindset-coach/book")
test_result "Coach Booking Page" "$STATUS" "200"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$LOCALE/yachts/azimut-70-flybridge/book")
test_result "Yacht Booking Page" "$STATUS" "200"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$LOCALE/doctors/dr-ahmed-hassan-cardiology/book")
test_result "Doctor Booking Page" "$STATUS" "200"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$LOCALE/lawyers/somchai-pattana/book")
test_result "Lawyer Booking Page" "$STATUS" "200"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$LOCALE/properties/spacious-duplex-jbr/book")
test_result "Property Booking Page" "$STATUS" "200"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$LOCALE/maids/brenda-floreda-matol/book")
test_result "Maid Booking Page" "$STATUS" "200"

echo ""
echo -e "${YELLOW}🔍 Testing API GET Endpoints...${NC}"
echo ""

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/bookings/coach")
test_result "GET /api/bookings/coach" "$STATUS" "200"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/bookings/yacht")
test_result "GET /api/bookings/yacht" "$STATUS" "200"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/bookings/doctor")
test_result "GET /api/bookings/doctor" "$STATUS" "200"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/bookings/lawyer")
test_result "GET /api/bookings/lawyer" "$STATUS" "200"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/bookings/activity")
test_result "GET /api/bookings/activity" "$STATUS" "200"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/bookings/property")
test_result "GET /api/bookings/property" "$STATUS" "200"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/bookings/maid")
test_result "GET /api/bookings/maid" "$STATUS" "200"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/bookings/scooter")
test_result "GET /api/bookings/scooter" "$STATUS" "200"

echo ""
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  TEST SUMMARY${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""
echo -e "Total Tests:  ${BLUE}$TOTAL_TESTS${NC}"
echo -e "Passed:       ${GREEN}$PASSED_TESTS${NC}"
echo -e "Failed:       ${RED}$FAILED_TESTS${NC}"
echo ""

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}🎉 ALL TESTS PASSED!${NC}"
    exit 0
else
    echo -e "${RED}❌ SOME TESTS FAILED${NC}"
    exit 1
fi
