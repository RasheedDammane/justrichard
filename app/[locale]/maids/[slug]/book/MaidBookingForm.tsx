'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MaidBookingForm({ maid, locale }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    serviceDate: '',
    serviceTime: '',
    duration: '2',
    serviceType: maid.serviceType || 'Regular Cleaning',
    numberOfRooms: '1',
    propertySize: '',
    specialInstructions: '',
    supplies: 'Client Provides',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/bookings/maid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          maidId: maid.id,
          ...formData,
          duration: parseInt(formData.duration),
          numberOfRooms: parseInt(formData.numberOfRooms),
          hourlyRate: maid.hourlyRate || 0,
          totalPrice: (maid.hourlyRate || 0) * parseInt(formData.duration),
          currency: maid.currency,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Booking confirmed! Booking number: ${data.bookingNumber}`);
        router.push(`/${locale}/maids/${maid.slug}`);
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
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Service Details</h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            required
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              required
              value={formData.customerEmail}
              onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              type="tel"
              required
              value={formData.customerPhone}
              onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Date *</label>
            <input
              type="date"
              required
              value={formData.serviceDate}
              onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Time *</label>
            <input
              type="time"
              required
              value={formData.serviceTime}
              onChange={(e) => setFormData({ ...formData, serviceTime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Type *</label>
          <select
            required
            value={formData.serviceType}
            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          >
            <option value="Regular Cleaning">Regular Cleaning</option>
            <option value="Deep Cleaning">Deep Cleaning</option>
            <option value="Move In/Out">Move In/Out Cleaning</option>
            <option value="Post-Construction">Post-Construction</option>
            <option value="Laundry">Laundry Service</option>
            <option value="Ironing">Ironing Service</option>
          </select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours) *</label>
            <select
              required
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            >
              <option value="2">2 hours</option>
              <option value="3">3 hours</option>
              <option value="4">4 hours</option>
              <option value="6">6 hours</option>
              <option value="8">8 hours</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Rooms *</label>
            <input
              type="number"
              required
              min="1"
              value={formData.numberOfRooms}
              onChange={(e) => setFormData({ ...formData, numberOfRooms: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Size (sqm)</label>
            <input
              type="number"
              value={formData.propertySize}
              onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cleaning Supplies</label>
          <select
            value={formData.supplies}
            onChange={(e) => setFormData({ ...formData, supplies: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          >
            <option value="Client Provides">Client Provides</option>
            <option value="Maid Brings">Maid Brings (extra charge)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
          <textarea
            rows={3}
            value={formData.specialInstructions}
            onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            placeholder="Any specific areas to focus on, allergies, pets, etc..."
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Total Price:</span>
          <span className="text-2xl font-bold text-pink-600">
            {maid.currency} {((maid.hourlyRate || 0) * parseInt(formData.duration)).toLocaleString()}
          </span>
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
          className="flex-1 px-6 py-3 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </form>
  );
}
