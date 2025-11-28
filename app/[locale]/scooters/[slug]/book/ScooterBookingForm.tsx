'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ScooterBookingForm({ scooter, locale }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    renterName: '',
    renterEmail: '',
    renterPhone: '',
    pickupDate: '',
    returnDate: '',
    pickupTime: '09:00',
    returnTime: '18:00',
    numberOfDays: '1',
    licenseNumber: '',
    insuranceRequired: true,
    helmetSize: 'M',
    deliveryRequired: false,
    deliveryAddress: '',
  });

  const calculateDays = (pickup: string, returnDate: string) => {
    if (!pickup || !returnDate) return 1;
    const diff = new Date(returnDate).getTime() - new Date(pickup).getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const handleDateChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    if (field === 'pickupDate' || field === 'returnDate') {
      const days = calculateDays(
        field === 'pickupDate' ? value : formData.pickupDate,
        field === 'returnDate' ? value : formData.returnDate
      );
      newData.numberOfDays = days.toString();
    }
    setFormData(newData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/bookings/scooter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scooterId: scooter.id,
          ...formData,
          numberOfDays: parseInt(formData.numberOfDays),
          pricePerDay: scooter.pricePerDay || 0,
          totalPrice: (scooter.pricePerDay || 0) * parseInt(formData.numberOfDays),
          currency: scooter.currency,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Booking confirmed! Booking number: ${data.bookingNumber}`);
        router.push(`/${locale}/scooters/${scooter.slug}`);
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
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Rental Details</h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            required
            value={formData.renterName}
            onChange={(e) => setFormData({ ...formData, renterName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              required
              value={formData.renterEmail}
              onChange={(e) => setFormData({ ...formData, renterEmail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              type="tel"
              required
              value={formData.renterPhone}
              onChange={(e) => setFormData({ ...formData, renterPhone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Driver's License Number *</label>
          <input
            type="text"
            required
            value={formData.licenseNumber}
            onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date *</label>
            <input
              type="date"
              required
              value={formData.pickupDate}
              onChange={(e) => handleDateChange('pickupDate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Time *</label>
            <input
              type="time"
              required
              value={formData.pickupTime}
              onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Return Date *</label>
            <input
              type="date"
              required
              value={formData.returnDate}
              onChange={(e) => handleDateChange('returnDate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Return Time *</label>
            <input
              type="time"
              required
              value={formData.returnTime}
              onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Days</label>
            <input
              type="number"
              readOnly
              value={formData.numberOfDays}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Helmet Size</label>
            <select
              value={formData.helmetSize}
              onChange={(e) => setFormData({ ...formData, helmetSize: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="insurance"
              checked={formData.insuranceRequired}
              onChange={(e) => setFormData({ ...formData, insuranceRequired: e.target.checked })}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="insurance" className="ml-2 text-sm text-gray-700">
              Insurance Required (+{scooter.currency} 50/day)
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="delivery"
              checked={formData.deliveryRequired}
              onChange={(e) => setFormData({ ...formData, deliveryRequired: e.target.checked })}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="delivery" className="ml-2 text-sm text-gray-700">
              Delivery Required
            </label>
          </div>
        </div>

        {formData.deliveryRequired && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
            <input
              type="text"
              required={formData.deliveryRequired}
              value={formData.deliveryAddress}
              onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="Enter delivery address"
            />
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{scooter.currency} {scooter.pricePerDay?.toLocaleString()} × {formData.numberOfDays} days</span>
            <span className="font-medium">{scooter.currency} {((scooter.pricePerDay || 0) * parseInt(formData.numberOfDays)).toLocaleString()}</span>
          </div>
          {formData.insuranceRequired && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Insurance × {formData.numberOfDays} days</span>
              <span className="font-medium">{scooter.currency} {(50 * parseInt(formData.numberOfDays)).toLocaleString()}</span>
            </div>
          )}
          <div className="border-t pt-2 flex justify-between items-center">
            <span className="text-gray-700 font-medium">Total:</span>
            <span className="text-2xl font-bold text-orange-600">
              {scooter.currency} {(((scooter.pricePerDay || 0) + (formData.insuranceRequired ? 50 : 0)) * parseInt(formData.numberOfDays)).toLocaleString()}
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
          className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </form>
  );
}
