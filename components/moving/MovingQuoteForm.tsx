'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, MapPin, Calendar, Package, ArrowRight, Check } from 'lucide-react';

interface MovingQuoteFormProps {
  serviceId?: string;
  locale: string;
}

export default function MovingQuoteForm({ serviceId, locale }: MovingQuoteFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    serviceId: serviceId || '',
    name: '',
    email: '',
    phone: '',
    fromAddress: '',
    fromCity: '',
    fromCountry: 'UAE',
    fromFloor: '',
    fromElevator: false,
    toAddress: '',
    toCity: '',
    toCountry: 'UAE',
    toFloor: '',
    toElevator: false,
    distance: '',
    preferredDate: '',
    preferredTime: '',
    estimatedVolume: '',
    numberOfRooms: '',
    itemsList: [] as string[],
    needPacking: false,
    needUnpacking: false,
    needAssembly: false,
    needStorage: false,
    storageDuration: '',
    vehicleType: '',
    specialInstructions: '',
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/moving/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote request');
      }

      const data = await response.json();
      router.push(`/${locale}/services/moving/quote/confirmation?id=${data.id}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Contact Info', icon: <Truck className="w-5 h-5" /> },
    { number: 2, title: 'Locations', icon: <MapPin className="w-5 h-5" /> },
    { number: 3, title: 'Details', icon: <Package className="w-5 h-5" /> },
    { number: 4, title: 'Services', icon: <Check className="w-5 h-5" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step >= s.number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s.icon}
                </div>
                <span className="text-xs mt-2 font-medium">{s.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    step > s.number ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
        {/* Step 1: Contact Information */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
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
                  name="email"
                  value={formData.email}
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="+971 50 123 4567"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Locations */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Moving Locations</h2>
            
            {/* From Location */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                From Location
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Address *</label>
                  <input
                    type="text"
                    name="fromAddress"
                    value={formData.fromAddress}
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
                      name="fromCity"
                      value={formData.fromCity}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Dubai"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Floor</label>
                    <input
                      type="number"
                      name="fromFloor"
                      value={formData.fromFloor}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="5"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="fromElevator"
                    checked={formData.fromElevator}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm">Elevator available</span>
                </label>
              </div>
            </div>

            {/* To Location */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                To Location
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Address *</label>
                  <input
                    type="text"
                    name="toAddress"
                    value={formData.toAddress}
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
                      name="toCity"
                      value={formData.toCity}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Abu Dhabi"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Floor</label>
                    <input
                      type="number"
                      name="toFloor"
                      value={formData.toFloor}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="3"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="toElevator"
                    checked={formData.toElevator}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm">Elevator available</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Moving Details */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Moving Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Preferred Date *</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Preferred Time</label>
                <input
                  type="time"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Number of Rooms</label>
                <select
                  name="numberOfRooms"
                  value={formData.numberOfRooms}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select...</option>
                  <option value="1">Studio</option>
                  <option value="2">1 Bedroom</option>
                  <option value="3">2 Bedrooms</option>
                  <option value="4">3 Bedrooms</option>
                  <option value="5">4+ Bedrooms</option>
                  <option value="6">Villa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Estimated Volume (m³)</label>
                <input
                  type="number"
                  name="estimatedVolume"
                  value={formData.estimatedVolume}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Vehicle Type</label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select...</option>
                  <option value="small-van">Small Van</option>
                  <option value="large-van">Large Van</option>
                  <option value="small-truck">Small Truck</option>
                  <option value="large-truck">Large Truck</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Special Instructions</label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Any special requirements or items that need extra care..."
              />
            </div>
          </div>
        )}

        {/* Step 4: Additional Services */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Additional Services</h2>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="needPacking"
                  checked={formData.needPacking}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <div>
                  <div className="font-medium">Packing Service</div>
                  <div className="text-sm text-gray-600">Professional packing of your items</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="needUnpacking"
                  checked={formData.needUnpacking}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <div>
                  <div className="font-medium">Unpacking Service</div>
                  <div className="text-sm text-gray-600">Unpacking at destination</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="needAssembly"
                  checked={formData.needAssembly}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <div>
                  <div className="font-medium">Furniture Assembly</div>
                  <div className="text-sm text-gray-600">Disassembly and reassembly of furniture</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="needStorage"
                  checked={formData.needStorage}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <div>
                  <div className="font-medium">Storage Service</div>
                  <div className="text-sm text-gray-600">Temporary storage for your items</div>
                </div>
              </label>

              {formData.needStorage && (
                <div className="ml-12">
                  <label className="block text-sm font-medium mb-1">Storage Duration (days)</label>
                  <input
                    type="number"
                    name="storageDuration"
                    value={formData.storageDuration}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="30"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Previous
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="ml-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold flex items-center gap-2"
            >
              {loading ? 'Submitting...' : 'Submit Quote Request'}
              <Check className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
