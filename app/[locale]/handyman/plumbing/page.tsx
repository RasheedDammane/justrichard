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
  { id: 'leak-detection', name: 'Leak Detection & Repair', description: 'Find and fix water leaks in pipes, faucets, and fixtures', price: 150, duration: '1-2 hours' },
  { id: 'pipe-repair', name: 'Pipe Repair & Replacement', description: 'Repair or replace damaged pipes', price: 200, duration: '2-3 hours' },
  { id: 'faucet-install', name: 'Faucet Installation & Repair', description: 'Install new faucets or repair existing ones', price: 120, duration: '1 hour' },
  { id: 'toilet-repair', name: 'Toilet Repair & Installation', description: 'Fix running toilets, leaks, or install new toilets', price: 180, duration: '1-2 hours' },
  { id: 'shower-repair', name: 'Shower & Bathtub Repair', description: 'Fix shower heads, valves, and bathtub issues', price: 160, duration: '1-2 hours' },
  { id: 'drain-cleaning', name: 'Drain Cleaning & Unclogging', description: 'Clear blocked drains and pipes', price: 130, duration: '1 hour' },
  { id: 'water-heater', name: 'Water Heater Repair & Installation', description: 'Repair or install water heaters', price: 300, duration: '2-4 hours' },
  { id: 'sink-install', name: 'Sink Installation', description: 'Install kitchen or bathroom sinks', price: 140, duration: '1-2 hours' },
  { id: 'garbage-disposal', name: 'Garbage Disposal Repair/Install', description: 'Fix or install garbage disposal units', price: 150, duration: '1 hour' },
  { id: 'bathroom-reno', name: 'Bathroom Renovation (Minor)', description: 'Small bathroom upgrades and repairs', price: 500, duration: '4-8 hours' },
];

export default function PlumbingPage() {
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
    sessionStorage.setItem('handymanCategory', 'plumbing');
    router.push('/en/handyman/booking');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.push('/en/handyman')}
              className="text-white/80 hover:text-white"
            >
              ← Back
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🚰 Plumbing Services</h1>
          <p className="text-xl text-blue-100">Professional plumbing repairs and installations in Dubai</p>
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
                      isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-100'
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
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
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
                  <div className="text-5xl mb-3">🚰</div>
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
                          <span className="font-bold text-blue-600">AED {service.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-blue-600">AED {getTotalPrice()}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">*Final price may vary based on inspection</p>
                  </div>

                  <button
                    onClick={proceedToBooking}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Book Now →
                  </button>
                </>
              )}

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">✓ Licensed Plumbers</span><br />
                  <span className="text-xs">All our plumbers are certified and insured</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Service Banner */}
      <div className="bg-red-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h3 className="text-2xl font-bold mb-2">🚨 Emergency Plumbing Service Available 24/7</h3>
          <p className="mb-4">Burst pipes? Major leaks? We're here to help!</p>
          <a href="tel:+971XXXXXXXX" className="inline-block px-8 py-3 bg-white text-red-600 rounded-lg font-bold hover:bg-red-50 transition-colors">
            Call Now: +971 XX XXX XXXX
          </a>
        </div>
      </div>
    </div>
  );
}
