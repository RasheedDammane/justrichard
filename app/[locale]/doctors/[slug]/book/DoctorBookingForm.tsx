'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DoctorBookingForm({ doctor, locale }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: 'In-Person',
    reasonForVisit: '',
    symptoms: '',
    medicalHistory: '',
    insuranceProvider: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/bookings/doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: doctor.id,
          ...formData,
          consultationFee: doctor.consultationFee || 0,
          currency: doctor.currency,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Appointment confirmed! Appointment number: ${data.appointmentNumber}`);
        router.push(`/${locale}/doctors/${doctor.slug}`);
      } else {
        alert('Failed to book appointment');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Appointment Details</h3>

      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-gray-700">Patient Information</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            required
            value={formData.patientName}
            onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              required
              value={formData.patientEmail}
              onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              type="tel"
              required
              value={formData.patientPhone}
              onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-gray-700">Appointment Details</h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
            <input
              type="date"
              required
              value={formData.appointmentDate}
              onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
            <input
              type="time"
              required
              value={formData.appointmentTime}
              onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type *</label>
          <select
            required
            value={formData.appointmentType}
            onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="In-Person">In-Person</option>
            <option value="Telemedicine">Telemedicine</option>
            <option value="Home Visit">Home Visit</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit *</label>
          <input
            type="text"
            required
            value={formData.reasonForVisit}
            onChange={(e) => setFormData({ ...formData, reasonForVisit: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Annual checkup, Follow-up, New symptoms"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms</label>
          <textarea
            rows={3}
            value={formData.symptoms}
            onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Describe your symptoms..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
          <textarea
            rows={2}
            value={formData.medicalHistory}
            onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Any relevant medical history..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Provider</label>
          <input
            type="text"
            value={formData.insuranceProvider}
            onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Aetna, Blue Cross"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Consultation Fee:</span>
          <span className="text-2xl font-bold text-green-600">
            {doctor.currency} {doctor.consultationFee?.toLocaleString()}
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
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Confirm Appointment'}
        </button>
      </div>
    </form>
  );
}
