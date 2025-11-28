'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Coach {
  id: string;
  name: string;
  slug: string;
  sessionFee: number | null;
  currency: string;
}

export default function CoachBookingForm({ coach, locale }: { coach: Coach; locale: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    sessionType: 'personal',
    sessionDate: '',
    sessionTime: '',
    duration: 60,
    category: 'fitness',
    goals: '',
    experience: 'beginner',
    specialRequests: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/bookings/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coachId: coach.id,
          ...formData,
          basePrice: coach.sessionFee || 0,
          totalPrice: coach.sessionFee || 0,
          currency: coach.currency,
        }),
      });

      if (response.ok) {
        const booking = await response.json();
        router.push(`/${locale}/bookings/${booking.bookingNumber}`);
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.customerEmail}
              onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone *
            </label>
            <input
              type="tel"
              required
              value={formData.customerPhone}
              onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Session Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Session Details</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Session Type *
            </label>
            <select
              value={formData.sessionType}
              onChange={(e) => setFormData({ ...formData, sessionType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="personal">Personal (1-on-1)</option>
              <option value="group">Group Session</option>
              <option value="online">Online Session</option>
              <option value="in-person">In-Person Session</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="fitness">Fitness</option>
              <option value="nutrition">Nutrition</option>
              <option value="life-coaching">Life Coaching</option>
              <option value="business">Business Coaching</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Date *
            </label>
            <input
              type="date"
              required
              value={formData.sessionDate}
              onChange={(e) => setFormData({ ...formData, sessionDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Time *
            </label>
            <input
              type="time"
              required
              value={formData.sessionTime}
              onChange={(e) => setFormData({ ...formData, sessionTime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes) *
            </label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
              <option value="90">90 minutes</option>
              <option value="120">120 minutes</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience Level *
          </label>
          <select
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Goals
          </label>
          <textarea
            value={formData.goals}
            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
            rows={3}
            placeholder="What would you like to achieve from this session?"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Requests
          </label>
          <textarea
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            rows={2}
            placeholder="Any special requirements or requests?"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-purple-50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Session Fee:</span>
          <span className="text-2xl font-bold text-purple-600">
            {coach.currency} {coach.sessionFee}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Confirm Booking'}
      </button>

      <p className="text-sm text-gray-500 text-center">
        By booking, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  );
}
