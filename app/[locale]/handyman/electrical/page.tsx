'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
}

const services: Service[] = [
  { id: 'troubleshoot', name: 'Electrical Troubleshooting', description: 'Diagnose and fix electrical issues', price: 120, duration: '1-2 hours' },
  { id: 'light-install', name: 'Light Installation', description: 'Install ceiling lights, chandeliers, LED strips', price: 100, duration: '1 hour' },
  { id: 'fan-install', name: 'Ceiling Fan Installation', description: 'Install and wire ceiling fans', price: 150, duration: '1-2 hours' },
  { id: 'outlet-repair', name: 'Power Outlet Repair/Installation', description: 'Fix or install new power outlets', price: 80, duration: '30 min - 1 hour' },
  { id: 'switch-replace', name: 'Switch Replacement', description: 'Replace faulty switches', price: 60, duration: '30 min' },
  { id: 'breaker-repair', name: 'Breaker Repair', description: 'Fix circuit breaker issues', price: 180, duration: '1-2 hours' },
  { id: 'wiring-repair', name: 'Wiring Repair', description: 'Repair damaged or faulty wiring', price: 200, duration: '2-3 hours' },
  { id: 'safety-check', name: 'Home Electrical Safety Check', description: 'Complete electrical system inspection', price: 250, duration: '2-3 hours' },
  { id: 'water-heater-elec', name: 'Water Heater Electrical Installation', description: 'Electrical setup for water heaters', price: 180, duration: '1-2 hours' },
  { id: 'smart-home', name: 'Smart Home Device Installation', description: 'Install smart switches, thermostats, etc.', price: 120, duration: '1 hour' },
];

export default function ElectricalPage() {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const addService = (service: Service) => {
    if (!selectedServices.find(s => s.id === service.id)) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const removeService = (serviceId: string) => {
    setSelectedServices(selectedServices.filter(s => s.id !== serviceId));
  };

  const getTotalPrice = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0);
  };

  const proceedToBooking = () => {
    if (selectedServices.length === 0) {
      alert('Please select at least one service');
      return;
    }
    sessionStorage.setItem('handymanServices', JSON.stringify(selectedServices));
    sessionStorage.setItem('handymanCategory', 'electrical');
    router.push('/en/handyman/booking');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.push('/en/handyman')}
              className="text-white/80 hover:text-white"
            >
              ← Back
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">⚡ Electrical Services</h1>
          <p className="text-xl text-yellow-100">Licensed electricians for all your electrical needs</p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Select Services</h2>
            <div className="space-y-4">
              {services.map(service => {
                const isSelected = selectedServices.find(s => s.id === service.id);
                return (
                  <div
                    key={service.id}
                    className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border-2 ${
                      isSelected ? 'border-yellow-500 bg-yellow-50' : 'border-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{service.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <span>⏱️</span> {service.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <span>💰</span> Starting from AED {service.price}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        {isSelected ? (
                          <button
                            onClick={() => removeService(service.id)}
                            className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            onClick={() => addService(service)}
                            className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Booking Summary</h3>
              
              {selectedServices.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <div className="text-5xl mb-3">⚡</div>
                  <p>No services selected</p>
                  <p className="text-sm mt-2">Add services to get started</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {selectedServices.map(service => (
                      <div key={service.id} className="border-b border-gray-100 pb-3">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-sm text-gray-900">{service.name}</span>
                          <button
                            onClick={() => removeService(service.id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">{service.duration}</span>
                          <span className="font-bold text-yellow-600">AED {service.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-yellow-600">AED {getTotalPrice()}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">*Final price may vary based on inspection</p>
                  </div>

                  <button
                    onClick={proceedToBooking}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-lg font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
                  >
                    Book Now →
                  </button>
                </>
              )}

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-900">
                  <span className="font-semibold">⚡ Licensed Electricians</span><br />
                  <span className="text-xs">Certified professionals with safety guarantee</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Warning */}
      <div className="bg-red-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h3 className="text-2xl font-bold mb-2">⚠️ Electrical Emergency? Call Us Now!</h3>
          <p className="mb-4">Power outage? Electrical hazard? We respond immediately!</p>
          <a href="tel:+971XXXXXXXX" className="inline-block px-8 py-3 bg-white text-red-600 rounded-lg font-bold hover:bg-red-50 transition-colors">
            Emergency: +971 XX XXX XXXX
          </a>
        </div>
      </div>
    </div>
  );
}
