'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'sofa' | 'mattress' | 'carpet' | 'curtain';
}

const services: Service[] = [
  // Sofa Cleaning
  { id: 'sofa-3seat', name: '3 Seater Sofa', description: 'Stains removed & freshness restored', price: 137, originalPrice: 189, category: 'sofa' },
  { id: 'sofa-3seat-l', name: '3 Seater L-Shaped', description: 'Deep clean, fresh vibes, no stains', price: 160, originalPrice: 199, category: 'sofa' },
  { id: 'sofa-3seat-bed', name: '3 Seater Sofa Bed', description: 'Stains vanish, comfort returns', price: 229, originalPrice: 269, category: 'sofa' },
  { id: 'sofa-3seat-l-bed', name: '3 Seater L-Shaped Sofa Bed', description: 'Fresh makeover with stains out', price: 249, originalPrice: 289, category: 'sofa' },
  { id: 'sofa-4seat', name: '4 Seater Sofa', description: 'Fresh, comfy MVP of your lounge', price: 179, originalPrice: 289, category: 'sofa' },
  { id: 'sofa-4seat-l', name: '4 Seater L-Shaped', description: 'Stains leave & comfort stays', price: 199, originalPrice: 299, category: 'sofa' },
  { id: 'sofa-5seat', name: '5 Seater Sofa', description: 'From oh-boy to oh-wow', price: 199, originalPrice: 370, category: 'sofa' },
  { id: 'sofa-5seat-l', name: '5 Seater L-Shaped', description: 'Feels-like-brand-new moment', price: 229, originalPrice: 370, category: 'sofa' },
  { id: 'sofa-7seat', name: '7 Seater Sofa', description: 'Stains out, comfort maxed', price: 249, originalPrice: 420, category: 'sofa' },
  { id: 'sofa-single', name: 'Single Seat', description: 'Hide those spaghetti stains no more', price: 69, originalPrice: 89, category: 'sofa' },
  
  // Mattress Cleaning
  { id: 'mattress-king', name: 'King Mattress', description: 'Royal refresh, bye-bye dust', price: 240, originalPrice: 259, category: 'mattress' },
  { id: 'mattress-queen', name: 'Queen Mattress', description: 'Goodbye dust & stains', price: 183, originalPrice: 229, category: 'mattress' },
  { id: 'mattress-single', name: 'Single Mattress', description: 'Clean, fresh & ready for sleep', price: 149, originalPrice: 249, category: 'mattress' },
  
  // Carpet Cleaning
  { id: 'carpet-small', name: 'Small Carpet (150x300cm)', description: 'Small carpet, major refresh', price: 105, originalPrice: 150, category: 'carpet' },
  { id: 'carpet-medium', name: 'Medium Carpet (180x275cm)', description: 'Dream underfoot', price: 149, originalPrice: 170, category: 'carpet' },
  { id: 'carpet-large', name: 'Large Carpet (240x365cm)', description: 'Dusty to dreamy', price: 189, originalPrice: 300, category: 'carpet' },
  { id: 'carpet-xlarge', name: 'X-Large Carpet (up to 1600cm)', description: 'Extra mile for extra large', price: 300, originalPrice: 350, category: 'carpet' },
  { id: 'carpet-wall', name: 'Wall to Wall Carpet', description: 'Measuring + Inspection included', price: 149, originalPrice: 250, category: 'carpet' },
  
  // Curtain Cleaning
  { id: 'curtain-small', name: 'Small Curtains (300x300cm)', description: 'Refresh & spruce up your space', price: 100, originalPrice: 155, category: 'curtain' },
  { id: 'curtain-medium', name: 'Medium Curtains (430x300cm)', description: 'Fresh, clean & like new', price: 155, originalPrice: 225, category: 'curtain' },
  { id: 'curtain-large', name: 'Large Curtains (830x300cm)', description: 'Deep vacuum & steam, no shrinkage', price: 315, originalPrice: 375, category: 'curtain' },
  { id: 'curtain-xlarge', name: 'X-Large Curtains (1000x300cm)', description: 'Extra tall, expertly cleaned', price: 365, originalPrice: 425, category: 'curtain' },
  { id: 'curtain-custom', name: 'Custom Size Curtains', description: 'No matter the size, we clean it', price: 149, originalPrice: 200, category: 'curtain' },
];

export default function FurnitureCleaningPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<'sofa' | 'mattress' | 'carpet' | 'curtain'>('sofa');
  const [cart, setCart] = useState<{ service: Service; quantity: number }[]>([]);

  const categories = [
    { id: 'sofa' as const, name: 'Sofa Cleaning', icon: '🛋️', color: 'blue' },
    { id: 'mattress' as const, name: 'Mattress Cleaning', icon: '🛏️', color: 'purple' },
    { id: 'carpet' as const, name: 'Carpet Cleaning', icon: '🧹', color: 'green' },
    { id: 'curtain' as const, name: 'Curtain Cleaning', icon: '🪟', color: 'orange' },
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
    sessionStorage.setItem('furnitureCart', JSON.stringify(cart));
    sessionStorage.setItem('cleaningType', 'furniture');
    router.push('/en/home-cleaning/booking');
  };

  const getDiscount = (service: Service) => {
    if (!service.originalPrice) return 0;
    return Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.push('/en/home-cleaning')}
              className="text-white/80 hover:text-white"
            >
              ← Back
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Furniture Cleaning Services</h1>
          <p className="text-xl text-purple-100">Professional cleaning for sofas, mattresses, carpets & curtains</p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Category Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Select Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedCategory === category.id
                    ? `border-${category.color}-600 bg-${category.color}-50 shadow-lg scale-105`
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="text-5xl mb-3">{category.icon}</div>
                <div className="font-bold text-gray-900">{category.name}</div>
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
                    <span className="text-2xl font-bold text-purple-600">
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
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
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
                          <span className="font-bold text-purple-600">
                            AED {item.service.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-purple-600">AED {getTotalPrice()}</span>
                    </div>
                  </div>

                  <button
                    onClick={proceedToBooking}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
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
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Our Furniture Cleaning?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">💨</div>
              <h3 className="font-bold text-lg mb-2">Deep Steam Cleaning</h3>
              <p className="text-gray-600 text-sm">Removes dirt, allergens & bacteria</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="font-bold text-lg mb-2">Eco-Friendly</h3>
              <p className="text-gray-600 text-sm">Safe for kids & pets</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="font-bold text-lg mb-2">Fast Drying</h3>
              <p className="text-gray-600 text-sm">Use your furniture within hours</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="font-bold text-lg mb-2">Stain Removal</h3>
              <p className="text-gray-600 text-sm">Expert treatment for tough stains</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
