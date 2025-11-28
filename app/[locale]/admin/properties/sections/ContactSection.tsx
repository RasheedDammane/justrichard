'use client';
import { User, Phone, Mail, MessageCircle } from 'lucide-react';

export default function ContactSection({ formData, setFormData, users }: any) {
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <User className="w-5 h-5" />
        Contact Information
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Owner / Agent
          </label>
          <select
            name="ownerId"
            value={formData.ownerId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Owner/Agent</option>
            {users && users.map((user: any) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Phone className="w-4 h-4" />
            Contact Phone
          </label>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            placeholder="+971 50 123 4567"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Mail className="w-4 h-4" />
            Contact Email
          </label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="contact@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            WhatsApp Number
          </label>
          <input
            type="tel"
            name="contactWhatsapp"
            value={formData.contactWhatsapp}
            onChange={handleChange}
            placeholder="+971 50 123 4567"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="showOwnerOnFront"
              checked={formData.showOwnerOnFront}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Show contact information on property page
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
