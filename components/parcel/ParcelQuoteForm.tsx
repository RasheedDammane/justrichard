'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, MapPin, Scale, Send, Check } from 'lucide-react';

interface ParcelQuoteFormProps {
  serviceId?: string;
  locale: string;
}

export default function ParcelQuoteForm({ serviceId, locale }: ParcelQuoteFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    serviceId: serviceId || '',
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    senderAddress: '',
    senderCity: '',
    senderCountry: 'UAE',
    recipientName: '',
    recipientPhone: '',
    recipientAddress: '',
    recipientCity: '',
    recipientCountry: 'UAE',
    weight: '',
    length: '',
    width: '',
    height: '',
    parcelType: '',
    contents: '',
    declaredValue: '',
    deliveryType: 'standard',
    specialInstructions: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate estimated price
  useEffect(() => {
    const { weight, length, width, height } = formData;
    if (weight && length && width && height) {
      const w = parseFloat(weight);
      const volume = (parseFloat(length) * parseFloat(width) * parseFloat(height)) / 1000000; // cm³ to m³
      
      // Simple pricing calculation (base + weight + volume)
      const basePrice = 50;
      const weightPrice = w * 5;
      const volumePrice = volume * 100;
      const total = basePrice + weightPrice + volumePrice;
      
      setEstimatedPrice(Math.round(total));
    } else {
      setEstimatedPrice(null);
    }
  }, [formData.weight, formData.length, formData.width, formData.height]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/parcel/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          estimatedPrice,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote request');
      }

      const data = await response.json();
      router.push(`/${locale}/services/parcel/quote/confirmation?id=${data.id}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sender Information */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Send className="w-6 h-6 text-blue-600" />
            Sender Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input
                type="text"
                name="senderName"
                value={formData.senderName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  name="senderEmail"
                  value={formData.senderEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone *</label>
                <input
                  type="tel"
                  name="senderPhone"
                  value={formData.senderPhone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="+971 50 123 4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address *</label>
              <input
                type="text"
                name="senderAddress"
                value={formData.senderAddress}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Street address, building name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City *</label>
                <input
                  type="text"
                  name="senderCity"
                  value={formData.senderCity}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Dubai"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Country *</label>
                <input
                  type="text"
                  name="senderCountry"
                  value={formData.senderCountry}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="UAE"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recipient Information */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-green-600" />
            Recipient Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input
                type="text"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Jane Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone *</label>
              <input
                type="tel"
                name="recipientPhone"
                value={formData.recipientPhone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="+971 50 987 6543"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address *</label>
              <input
                type="text"
                name="recipientAddress"
                value={formData.recipientAddress}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Street address, building name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City *</label>
                <input
                  type="text"
                  name="recipientCity"
                  value={formData.recipientCity}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Abu Dhabi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Country *</label>
                <input
                  type="text"
                  name="recipientCountry"
                  value={formData.recipientCountry}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="UAE"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Package className="w-6 h-6 text-purple-600" />
            Package Details
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Weight (kg) *</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="5.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Length (cm) *</label>
                <input
                  type="number"
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  required
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Width (cm) *</label>
                <input
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  required
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="40"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Height (cm) *</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="30"
                />
              </div>
            </div>

            {estimatedPrice && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-blue-600 font-medium">Estimated Price</div>
                    <div className="text-xs text-blue-500">Based on weight and dimensions</div>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">
                    {estimatedPrice} AED
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Parcel Type *</label>
                <select
                  name="parcelType"
                  value={formData.parcelType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select type...</option>
                  <option value="documents">Documents</option>
                  <option value="package">Package</option>
                  <option value="fragile">Fragile Items</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Delivery Type *</label>
                <select
                  name="deliveryType"
                  value={formData.deliveryType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="standard">Standard (3-5 days)</option>
                  <option value="express">Express (1-2 days)</option>
                  <option value="same-day">Same Day</option>
                  <option value="next-day">Next Day</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contents Description *</label>
              <textarea
                name="contents"
                value={formData.contents}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the contents of your parcel..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Declared Value (AED)</label>
              <input
                type="number"
                name="declaredValue"
                value={formData.declaredValue}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="1000"
              />
              <p className="text-xs text-gray-500 mt-1">For insurance purposes</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Special Instructions</label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Any special handling requirements..."
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold flex items-center gap-2 text-lg"
          >
            {loading ? 'Submitting...' : 'Submit Quote Request'}
            <Check className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
}
