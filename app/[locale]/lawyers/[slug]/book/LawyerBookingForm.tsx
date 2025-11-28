'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LawyerBookingForm({ lawyer, locale }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    consultationDate: '',
    consultationTime: '',
    consultationType: 'In-Person',
    legalMatter: '',
    caseDescription: '',
    urgency: 'Normal',
    preferredLanguage: 'English',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/bookings/lawyer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lawyerId: lawyer.id,
          ...formData,
          consultationFee: lawyer.consultationFee || 0,
          currency: lawyer.currency,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Consultation booked! Booking number: ${data.bookingNumber}`);
        router.push(`/${locale}/lawyers/${lawyer.slug}`);
      } else {
        alert('Failed to book consultation');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Consultation Details</h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            required
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              required
              value={formData.clientEmail}
              onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              type="tel"
              required
              value={formData.clientPhone}
              onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
            <input
              type="date"
              required
              value={formData.consultationDate}
              onChange={(e) => setFormData({ ...formData, consultationDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
            <input
              type="time"
              required
              value={formData.consultationTime}
              onChange={(e) => setFormData({ ...formData, consultationTime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Type *</label>
          <select
            required
            value={formData.consultationType}
            onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="In-Person">In-Person</option>
            <option value="Video Call">Video Call</option>
            <option value="Phone Call">Phone Call</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Legal Matter *</label>
          <input
            type="text"
            required
            value={formData.legalMatter}
            onChange={(e) => setFormData({ ...formData, legalMatter: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="e.g., Contract Review, Divorce, Business Formation"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Case Description *</label>
          <textarea
            rows={4}
            required
            value={formData.caseDescription}
            onChange={(e) => setFormData({ ...formData, caseDescription: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Please provide details about your legal matter..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
            <select
              value={formData.urgency}
              onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
            <select
              value={formData.preferredLanguage}
              onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
              <option value="French">French</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Consultation Fee:</span>
          <span className="text-2xl font-bold text-purple-600">
            {lawyer.currency} {lawyer.consultationFee?.toLocaleString()}/hour
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
          className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Confirm Consultation'}
        </button>
      </div>
    </form>
  );
}
