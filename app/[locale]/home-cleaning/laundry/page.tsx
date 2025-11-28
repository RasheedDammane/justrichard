'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'wash-iron' | 'iron' | 'wash-fold' | 'dry-clean' | 'home-linen';
}

const services: Service[] = [
  // Wash & Iron
  { id: 'wi-small', name: 'Wash & Iron - Small Bag', description: 'Up to 10 items, 48h delivery', price: 89, originalPrice: 110, category: 'wash-iron' },
  { id: 'wi-medium', name: 'Wash & Iron - Medium Bag', description: 'Up to 20 items, 48h delivery', price: 109, originalPrice: 130, category: 'wash-iron' },
  { id: 'wi-large', name: 'Wash & Iron - Large Bag', description: 'Up to 30 items, 48h delivery', price: 149, originalPrice: 175, category: 'wash-iron' },
  
  // Iron Only
  { id: 'iron-small', name: 'Iron - Small Bag', description: 'Up to 10 items, 48h delivery', price: 59, originalPrice: 80, category: 'iron' },
  { id: 'iron-medium', name: 'Iron - Medium Bag', description: 'Up to 20 items, 48h delivery', price: 79, originalPrice: 95, category: 'iron' },
  { id: 'iron-large', name: 'Iron - Large Bag', description: 'Up to 30 items, 48h delivery', price: 109, originalPrice: 130, category: 'iron' },
  
  // Wash & Fold
  { id: 'wf-small', name: 'Wash & Fold - Small Bag', description: 'Up to 10 items, 48h delivery', price: 49, originalPrice: 70, category: 'wash-fold' },
  { id: 'wf-medium', name: 'Wash & Fold - Medium Bag', description: 'Up to 20 items, 48h delivery', price: 59, originalPrice: 79, category: 'wash-fold' },
  { id: 'wf-large', name: 'Wash & Fold - Large Bag', description: 'Up to 30 items, 48h delivery', price: 69, originalPrice: 89, category: 'wash-fold' },
  
  // Dry Cleaning
  { id: 'dc-suit', name: 'Suit (2-Piece)', description: 'Keep your suit sharp', price: 39, originalPrice: 49, category: 'dry-clean' },
  { id: 'dc-jacket', name: 'Jacket, Coat or Blazer', description: 'Serious glow-up for outerwear', price: 29, originalPrice: 39, category: 'dry-clean' },
  { id: 'dc-shirt', name: 'Shirt, T-Shirt or Blouse', description: 'Freshen up your fit', price: 11, originalPrice: 15, category: 'dry-clean' },
  { id: 'dc-trouser', name: 'Trouser or Skirt', description: 'Level up your look', price: 11, originalPrice: 15, category: 'dry-clean' },
  { id: 'dc-dress', name: 'Dress (Formal/Casual)', description: 'Without embroidery or beadwork', price: 22, originalPrice: 27, category: 'dry-clean' },
  { id: 'dc-party-dress', name: 'Party/Embroidered Dress', description: 'Delicate dress care', price: 50, originalPrice: 70, category: 'dry-clean' },
  { id: 'dc-abaya', name: 'Abaya', description: 'Elegance refreshed', price: 18, originalPrice: 22, category: 'dry-clean' },
  { id: 'dc-kandura', name: 'Kandura', description: 'Serious flair for your kandura', price: 15, originalPrice: 20, category: 'dry-clean' },
  { id: 'dc-other', name: 'Other Items', description: 'Custom service, pricing after service', price: 39, category: 'dry-clean' },
  
  // Home Linen
  { id: 'hl-set', name: 'Home Linens (Up to 15 items)', description: 'Towels, pillows, sheets & fabrics', price: 89, originalPrice: 110, category: 'home-linen' },
];

export default function LaundryPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<'wash-iron' | 'iron' | 'wash-fold' | 'dry-clean' | 'home-linen'>('wash-iron');
  const [cart, setCart] = useState<{ service: Service; quantity: number }[]>([]);

  const categories = [
    { id: 'wash-iron' as const, name: 'Wash & Iron', icon: '👕', color: 'blue' },
    { id: 'iron' as const, name: 'Iron Only', icon: '🔥', color: 'orange' },
    { id: 'wash-fold' as const, name: 'Wash & Fold', icon: '🧺', color: 'green' },
    { id: 'dry-clean' as const, name: 'Dry Cleaning', icon: '👔', color: 'purple' },
    { id: 'home-linen' as const, name: 'Home Linens', icon: '🛏️', color: 'pink' },
  ];

  const filteredServices = services.filter(s => s.category === selectedCategory);

  const addToCart = (service: Service) => {
    const existing = cart.find(item => item.service.id === service.id);
    if (existing) {
      setCart(cart.map(item => 
        item.service.id === service.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { service, quantity: 1 }]);
    }
  };

  const removeFromCart = (serviceId: string) => {
    setCart(cart.filter(item => item.service.id !== serviceId));
  };

  const updateQuantity = (serviceId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(serviceId);
    } else {
      setCart(cart.map(item => 
        item.service.id === serviceId 
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.service.price * item.quantity), 0);
  };

  const proceedToBooking = () => {
    if (cart.length === 0) {
      alert('Please select at least one service');
      return;
    }
    sessionStorage.setItem('laundryCart', JSON.stringify(cart));
    sessionStorage.setItem('cleaningType', 'laundry');
    router.push('/en/home-cleaning/booking');
  };

  const getDiscount = (service: Service) => {
    if (!service.originalPrice) return 0;
    return Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.push('/en/home-cleaning')}
              className="text-white/80 hover:text-white"
            >
              ← Back
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Laundry & Dry Cleaning</h1>
          <p className="text-xl text-green-100">Professional laundry services with 48-hour delivery</p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Category Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Select Service Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedCategory === category.id
                    ? 'border-green-600 bg-green-50 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="text-5xl mb-3">{category.icon}</div>
                <div className="font-bold text-sm text-gray-900">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {filteredServices.map(service => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-gray-900">{service.name}</h3>
                    {service.originalPrice && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        -{getDiscount(service)}%
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      AED {service.price}
                    </span>
                    {service.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        AED {service.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(service)}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Your Cart</h3>
              
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <div className="text-5xl mb-3">🛒</div>
                  <p>Your cart is empty</p>
                  <p className="text-sm mt-2">Add services to get started</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.service.id} className="border-b border-gray-100 pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-gray-900">{item.service.name}</h4>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.service.id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            ✕
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.service.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.service.id, item.quantity + 1)}
                              className="w-8 h-8 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-bold text-green-600">
                            AED {item.service.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">AED {getTotalPrice()}</span>
                    </div>
                  </div>

                  <button
                    onClick={proceedToBooking}
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Proceed to Booking →
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 py-16 px-4 mt-12">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Laundry Service Benefits</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="font-bold text-lg mb-2">Free Pickup & Delivery</h3>
              <p className="text-gray-600 text-sm">We come to you</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⏱️</div>
              <h3 className="font-bold text-lg mb-2">48-Hour Service</h3>
              <p className="text-gray-600 text-sm">Fast turnaround time</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="font-bold text-lg mb-2">Eco-Friendly Detergents</h3>
              <p className="text-gray-600 text-sm">Safe for sensitive skin</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="font-bold text-lg mb-2">Professional Care</h3>
              <p className="text-gray-600 text-sm">Expert handling of all fabrics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
