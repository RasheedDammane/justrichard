import { formatPrice, formatDate, calculateBookingTotal, generateTimeSlots, formatTime } from '@/lib/utils';

describe('Utils', () => {
  describe('formatPrice', () => {
    it('formats USD correctly', () => {
      expect(formatPrice(100, 'USD')).toBe('$100.00');
    });

    it('formats AED correctly', () => {
      const result = formatPrice(500, 'AED');
      expect(result).toContain('500.00');
      expect(result).toContain('AED');
    });

    it('handles zero price', () => {
      expect(formatPrice(0, 'USD')).toBe('$0.00');
    });

    it('handles negative price', () => {
      expect(formatPrice(-50, 'USD')).toBe('-$50.00');
    });

    it('handles decimal prices', () => {
      expect(formatPrice(99.99, 'USD')).toBe('$99.99');
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2025-01-15');
      const formatted = formatDate(date, 'en');
      expect(formatted).toContain('January');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2025');
    });

    it('formats date string correctly', () => {
      const formatted = formatDate('2025-01-15', 'en');
      expect(formatted).toContain('January');
    });

    it('formats date in different locale', () => {
      const date = new Date('2025-01-15');
      const formatted = formatDate(date, 'fr');
      expect(formatted).toContain('janvier');
    });
  });

  describe('formatTime', () => {
    it('formats morning time correctly', () => {
      expect(formatTime('09:00')).toBe('9:00 AM');
    });

    it('formats afternoon time correctly', () => {
      expect(formatTime('14:30')).toBe('2:30 PM');
    });

    it('formats noon correctly', () => {
      expect(formatTime('12:00')).toBe('12:00 PM');
    });

    it('formats midnight correctly', () => {
      expect(formatTime('00:00')).toBe('12:00 AM');
    });
  });

  describe('generateTimeSlots', () => {
    it('generates time slots correctly', () => {
      const slots = generateTimeSlots(9, 11);
      expect(slots).toEqual(['09:00', '09:30', '10:00', '10:30']);
    });

    it('generates default time slots', () => {
      const slots = generateTimeSlots();
      expect(slots.length).toBeGreaterThan(0);
      expect(slots[0]).toBe('08:00');
    });

    it('handles single hour range', () => {
      const slots = generateTimeSlots(10, 11);
      expect(slots).toEqual(['10:00', '10:30']);
    });
  });

  describe('calculateBookingTotal', () => {
    it('calculates total without addons', () => {
      const result = calculateBookingTotal(100, [], 0.05, 0);
      expect(result.subtotal).toBe(100);
      expect(result.tax).toBe(5);
      expect(result.total).toBe(105);
    });

    it('calculates total with addons', () => {
      const addons = [
        { price: 30, quantity: 1 },
        { price: 50, quantity: 1 },
      ];
      const result = calculateBookingTotal(100, addons, 0.05, 0);
      expect(result.subtotal).toBe(180);
      expect(result.tax).toBe(9);
      expect(result.total).toBe(189);
    });

    it('applies discount correctly', () => {
      const result = calculateBookingTotal(100, [], 0.05, 20);
      expect(result.discount).toBe(20);
      expect(result.tax).toBe(4); // (100 - 20) * 0.05
      expect(result.total).toBe(84); // 80 + 4
    });

    it('handles multiple addon quantities', () => {
      const addons = [{ price: 25, quantity: 3 }];
      const result = calculateBookingTotal(100, addons, 0.05, 0);
      expect(result.subtotal).toBe(175); // 100 + (25 * 3)
      expect(result.tax).toBe(8.75);
      expect(result.total).toBe(183.75);
    });

    it('handles zero tax rate', () => {
      const result = calculateBookingTotal(100, [], 0, 0);
      expect(result.tax).toBe(0);
      expect(result.total).toBe(100);
    });

    it('handles discount greater than subtotal', () => {
      const result = calculateBookingTotal(100, [], 0.05, 150);
      expect(result.discount).toBe(150);
      expect(result.tax).toBeLessThan(0); // Negative tax
      expect(result.total).toBeLessThan(0); // Negative total
    });

    it('calculates complex booking with all parameters', () => {
      const addons = [
        { price: 50, quantity: 2 },
        { price: 30, quantity: 1 },
      ];
      const result = calculateBookingTotal(200, addons, 0.1, 50);
      expect(result.subtotal).toBe(330); // 200 + 100 + 30
      expect(result.discount).toBe(50);
      expect(result.tax).toBe(28); // (330 - 50) * 0.1
      expect(result.total).toBe(308); // 280 + 28
    });
  });
});
