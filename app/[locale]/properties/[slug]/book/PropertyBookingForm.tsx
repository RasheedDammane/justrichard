'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PropertyBookingForm({ property, locale }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: '1',
    numberOfNights: '1',
    purposeOfStay: 'Vacation',
    specialRequests: '',
  });

  const calculateNights = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return 1;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const handleDateChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    if (field === 'checkInDate' || field === 'checkOutDate') {
      const nights = calculateNights(
        field === 'checkInDate' ? value : formData.checkInDate,
        field === 'checkOutDate' ? value : formData.checkOutDate
      );
      newData.numberOfNights = nights.toString();
    }
    setFormData(newData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/bookings/property', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property.id,
          ...formData,
          numberOfGuests: parseInt(formData.numberOfGuests),
          numberOfNights: parseInt(formData.numberOfNights),
          pricePerNight: property.pricePerNight || 0,
          totalPrice: (property.pricePerNight || 0) * parseInt(formData.numberOfNights),
          currency: property.currency,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Booking confirmed! Booking number: ${data.bookingNumber}`);
        router.push(`/${locale}/properties/${property.slug}`);
      } else {
        alert('Failed to create booking');
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

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            required
            value={formData.guestName}
            onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              required
              value={formData.guestEmail}
              onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              type="tel"
              required
              value={formData.guestPhone}
              onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date *</label>
            <input
              type="date"
              required
              value={formData.checkInDate}
              onChange={(e) => handleDateChange('checkInDate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date *</label>
            <input
              type="date"
              required
              value={formData.checkOutDate}
              onChange={(e) => handleDateChange('checkOutDate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests *</label>
            <input
              type="number"
              required
              min="1"
              max={property.maxGuests || 10}
              value={formData.numberOfGuests}
              onChange={(e) => setFormData({ ...formData, numberOfGuests: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Nights</label>
            <input
              type="number"
              readOnly
              value={formData.numberOfNights}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Stay</label>
          <select
            value={formData.purposeOfStay}
            onChange={(e) => setFormData({ ...formData, purposeOfStay: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Vacation">Vacation</option>
            <option value="Business">Business</option>
            <option value="Event">Event</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
          <textarea
            rows={3}
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Any special requests..."
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{property.currency} {property.pricePerNight?.toLocaleString()} × {formData.numberOfNights} nights</span>
            <span className="font-medium">{property.currency} {((property.pricePerNight || 0) * parseInt(formData.numberOfNights)).toLocaleString()}</span>
          </div>
          <div className="border-t pt-2 flex justify-between items-center">
            <span className="text-gray-700 font-medium">Total:</span>
            <span className="text-2xl font-bold text-indigo-600">
              {property.currency} {((property.pricePerNight || 0) * parseInt(formData.numberOfNights)).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </form>
  );
}
