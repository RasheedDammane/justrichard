'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface YachtBookingFormProps {
  yacht: any;
  locale: string;
}

export default function YachtBookingForm({ yacht, locale }: YachtBookingFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    bookingDate: '',
    startTime: '',
    duration: '2',
    numberOfGuests: '1',
    occasion: '',
    cateringRequired: false,
    specialRequests: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/bookings/yacht', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          yachtId: yacht.id,
          ...formData,
          numberOfGuests: parseInt(formData.numberOfGuests),
          duration: parseInt(formData.duration),
          basePrice: yacht.pricePerHour || 0,
          totalPrice: (yacht.pricePerHour || 0) * parseInt(formData.duration),
          currency: yacht.currency,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Booking confirmed! Booking number: ${data.bookingNumber}`);
        router.push(`/${locale}/yachts/${yacht.slug}`);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to create booking'}`);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Booking Details</h3>

      {/* Customer Information */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-gray-700">Customer Information</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            required
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            required
            value={formData.customerEmail}
            onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <input
            type="tel"
            required
            value={formData.customerPhone}
            onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Booking Details */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-gray-700">Booking Details</h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
            <input
              type="date"
              required
              value={formData.bookingDate}
              onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
            <input
              type="time"
              required
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours) *</label>
            <select
              required
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="2">2 hours</option>
              <option value="3">3 hours</option>
              <option value="4">4 hours</option>
              <option value="6">6 hours</option>
              <option value="8">8 hours</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests *</label>
            <input
              type="number"
              required
              min="1"
              max={yacht.capacity}
              value={formData.numberOfGuests}
              onChange={(e) => setFormData({ ...formData, numberOfGuests: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Occasion</label>
          <select
            value={formData.occasion}
            onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select occasion</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Wedding">Wedding</option>
            <option value="Leisure">Leisure</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="catering"
            checked={formData.cateringRequired}
            onChange={(e) => setFormData({ ...formData, cateringRequired: e.target.checked })}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="catering" className="ml-2 text-sm text-gray-700">
            Catering Required
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
          <textarea
            rows={3}
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Any special requests or requirements..."
          />
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Total Price:</span>
          <span className="text-2xl font-bold text-blue-600">
            {yacht.currency} {((yacht.pricePerHour || 0) * parseInt(formData.duration)).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </form>
  );
}
