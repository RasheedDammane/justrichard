'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Service {
  id: string;
  name: string;
  size: string;
  price: number;
  category: 'regular' | 'deep';
  type: 'apartment' | 'house' | 'villa';
}

const services: Service[] = [
  // Regular Cleaning - Apartments
  { id: 'reg-studio', name: 'Studio', size: '20-30 sq.m', price: 490, category: 'regular', type: 'apartment' },
  { id: 'reg-big-studio', name: 'Big Studio', size: '30-45 sq.m', price: 590, category: 'regular', type: 'apartment' },
  { id: 'reg-1br-small', name: '1 Bedroom', size: '35-45 sq.m', price: 690, category: 'regular', type: 'apartment' },
  { id: 'reg-1br-large', name: '1 Bedroom', size: '45-60 sq.m', price: 850, category: 'regular', type: 'apartment' },
  { id: 'reg-2br', name: '2 Bedroom', size: '60-80 sq.m', price: 990, category: 'regular', type: 'apartment' },
  { id: 'reg-2-3br-medium', name: '2-3 Bedroom', size: '80-100 sq.m', price: 1190, category: 'regular', type: 'apartment' },
  { id: 'reg-2-3br-large', name: '2-3 Bedroom', size: '100-140 sq.m', price: 1390, category: 'regular', type: 'apartment' },
  { id: 'reg-3-4br-medium', name: '3-4 Bedroom', size: '140-160 sq.m', price: 1590, category: 'regular', type: 'apartment' },
  { id: 'reg-3-4br-large', name: '3-4 Bedroom', size: '160-200 sq.m', price: 1890, category: 'regular', type: 'apartment' },
  
  // Regular Cleaning - Houses & Villas
  { id: 'house-reg-small', name: 'Small House', size: '70-100 sq.m', price: 1490, category: 'regular', type: 'house' },
  { id: 'house-reg-medium', name: 'Medium House', size: '100-130 sq.m', price: 1850, category: 'regular', type: 'house' },
  { id: 'house-reg-large', name: 'Large House', size: '130-170 sq.m', price: 2400, category: 'regular', type: 'house' },
  { id: 'house-reg-xlarge', name: 'XL House', size: '170-200 sq.m', price: 2950, category: 'regular', type: 'house' },
  { id: 'house-reg-xxlarge', name: 'XXL House', size: '200+ sq.m', price: 3600, category: 'regular', type: 'house' },
  { id: 'villa-reg', name: 'Villa', size: '300+ sq.m', price: 5250, category: 'regular', type: 'villa' },
  
  // Deep Cleaning - Apartments
  { id: 'deep-studio', name: 'Studio', size: '20-30 sq.m', price: 750, category: 'deep', type: 'apartment' },
  { id: 'deep-big-studio', name: 'Big Studio', size: '30-45 sq.m', price: 990, category: 'deep', type: 'apartment' },
  { id: 'deep-1br-small', name: '1 Bedroom', size: '35-45 sq.m', price: 1090, category: 'deep', type: 'apartment' },
  { id: 'deep-1br-large', name: '1 Bedroom', size: '45-60 sq.m', price: 1390, category: 'deep', type: 'apartment' },
  { id: 'deep-2br', name: '2 Bedroom', size: '60-80 sq.m', price: 1890, category: 'deep', type: 'apartment' },
  { id: 'deep-2-3br-medium', name: '2-3 Bedroom', size: '80-100 sq.m', price: 2190, category: 'deep', type: 'apartment' },
  { id: 'deep-2-3br-large', name: '2-3 Bedroom', size: '100-140 sq.m', price: 2490, category: 'deep', type: 'apartment' },
  { id: 'deep-3-4br-medium', name: '3-4 Bedroom', size: '140-160 sq.m', price: 2890, category: 'deep', type: 'apartment' },
  { id: 'deep-3-4br-large', name: '3-4 Bedroom', size: '160-200 sq.m', price: 3490, category: 'deep', type: 'apartment' },
  
  // Deep Cleaning - Houses & Villas
  { id: 'house-deep-small', name: 'Small House', size: '70-100 sq.m', price: 2990, category: 'deep', type: 'house' },
  { id: 'house-deep-medium', name: 'Medium House', size: '100-130 sq.m', price: 3700, category: 'deep', type: 'house' },
  { id: 'house-deep-large', name: 'Large House', size: '130-170 sq.m', price: 4800, category: 'deep', type: 'house' },
  { id: 'house-deep-xlarge', name: 'XL House', size: '170-200 sq.m', price: 5900, category: 'deep', type: 'house' },
  { id: 'house-deep-xxlarge', name: 'XXL House', size: '200+ sq.m', price: 7200, category: 'deep', type: 'house' },
  { id: 'villa-deep', name: 'Villa', size: '300+ sq.m', price: 10500, category: 'deep', type: 'villa' },
];

export default function HomeCleaningServicesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<'regular' | 'deep'>('regular');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices = services.filter(s => s.category === selectedCategory);

  const proceedToBooking = (service: Service) => {
    // Create cart format expected by booking page
    const cart = [{
      service: {
        id: service.id,
        name: service.name,
        size: service.size,
        price: service.price,
        category: service.category
      },
      quantity: 1
    }];
    
    sessionStorage.setItem('cleaningCart', JSON.stringify(cart));
    sessionStorage.setItem('cleaningType', 'home');
    router.push('/en/home-cleaning/booking');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.push('/en/home-cleaning')}
              className="text-white/80 hover:text-white"
            >
              ← Back
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Home Cleaning Services</h1>
          <p className="text-xl text-blue-100">Professional cleaning for apartments, houses, and villas</p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Category Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-xl shadow-lg p-2">
            <button
              onClick={() => setSelectedCategory('regular')}
              className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${
                selectedCategory === 'regular'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🏠 Regular Cleaning
            </button>
            <button
              onClick={() => setSelectedCategory('deep')}
              className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${
                selectedCategory === 'deep'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ✨ Deep Cleaning
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className={`mb-12 p-6 rounded-xl ${
          selectedCategory === 'regular' ? 'bg-blue-50 border-2 border-blue-200' : 'bg-purple-50 border-2 border-purple-200'
        }`}>
          <h3 className="font-bold text-lg mb-2">
            {selectedCategory === 'regular' ? '🏠 Regular Cleaning' : '✨ Deep Cleaning'}
          </h3>
          <p className="text-gray-700">
            {selectedCategory === 'regular' 
              ? 'Perfect for weekly or bi-weekly maintenance. Includes dusting, vacuuming, mopping, bathroom & kitchen cleaning.'
              : 'Thorough cleaning including hard-to-reach areas, inside cabinets, appliances, windows, and detailed sanitization.'
            }
          </p>
        </div>

        {/* Services Grid */}
        <div>
          {/* Apartments & Condos */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <span className="text-3xl">🏢</span>
              Apartments & Condos
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredServices.filter(s => s.type === 'apartment').map(service => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100 group"
                >
                  <h3 className="font-bold text-lg mb-1 text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{service.size}</p>
                  <div className="text-3xl font-bold text-blue-600 mb-4">
                    AED {service.price}
                  </div>
                  <button 
                    type="button"
                    onClick={() => proceedToBooking(service)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Book Now →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Houses */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <span className="text-3xl">🏡</span>
              Houses
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredServices.filter(s => s.type === 'house').map(service => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100 group"
                >
                  <h3 className="font-bold text-lg mb-1 text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{service.size}</p>
                  <div className="text-3xl font-bold text-blue-600 mb-4">
                    AED {service.price}
                  </div>
                  <button 
                    type="button"
                    onClick={() => proceedToBooking(service)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Book Now →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Villas */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <span className="text-3xl">🏰</span>
              Villas
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredServices.filter(s => s.type === 'villa').map(service => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100 group"
                >
                  <h3 className="font-bold text-lg mb-1 text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{service.size}</p>
                  <div className="text-3xl font-bold text-blue-600 mb-4">
                    AED {service.price}
                  </div>
                  <button 
                    type="button"
                    onClick={() => proceedToBooking(service)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Book Now →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="bg-gray-50 py-16 px-4 mt-12">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            What's Included?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-3">🧹</div>
              <h3 className="font-bold mb-2">Dusting & Vacuuming</h3>
              <p className="text-sm text-gray-600">All surfaces, furniture, and floors</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-3">🚿</div>
              <h3 className="font-bold mb-2">Bathroom Cleaning</h3>
              <p className="text-sm text-gray-600">Toilet, sink, shower, and tiles</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-3">🍳</div>
              <h3 className="font-bold mb-2">Kitchen Cleaning</h3>
              <p className="text-sm text-gray-600">Counters, appliances, and floors</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-3">🪟</div>
              <h3 className="font-bold mb-2">Windows & Mirrors</h3>
              <p className="text-sm text-gray-600">Streak-free shine guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
