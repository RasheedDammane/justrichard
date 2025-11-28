'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CartItem {
  service: {
    id: string;
    name: string;
    size: string;
    price: number;
    category: string;
  };
  quantity: number;
}

export default function BookingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    duration: '2',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Dubai',
    area: '',
    building: '',
    apartment: '',
    specialInstructions: '',
  });

  useEffect(() => {
    // Check for different cart types
    const cleaningCart = sessionStorage.getItem('cleaningCart');
    const furnitureCart = sessionStorage.getItem('furnitureCart');
    const laundryCart = sessionStorage.getItem('laundryCart');
    
    const savedCart = cleaningCart || furnitureCart || laundryCart;
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      router.push('/en/home-cleaning');
    }
  }, [router]);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.service.price * item.quantity), 0);
  };

  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
  ];

  const durations = [
    { value: '2', label: '2 hours' },
    { value: '3', label: '3 hours' },
    { value: '4', label: '4 hours' },
    { value: '5', label: '5 hours' },
    { value: '6', label: '6 hours' },
    { value: '8', label: '8 hours (Full day)' },
  ];

  const dubaiAreas = [
    'Dubai Marina', 'Downtown Dubai', 'Jumeirah', 'Business Bay',
    'Palm Jumeirah', 'JBR', 'Arabian Ranches', 'Dubai Hills',
    'JLT', 'Deira', 'Bur Dubai', 'Al Barsha', 'Mirdif', 'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const validateStep = () => {
    if (step === 1) {
      if (!bookingData.date || !bookingData.time) {
        alert('Please select date and time');
        return false;
      }
    } else if (step === 2) {
      if (!bookingData.firstName || !bookingData.lastName || !bookingData.email || !bookingData.phone) {
        alert('Please fill in all required fields');
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
        alert('Please enter a valid email address');
        return false;
      }
    } else if (step === 3) {
      if (!bookingData.address || !bookingData.area) {
        alert('Please fill in your address details');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    const bookingPayload = {
      services: cart,
      ...bookingData,
      totalPrice: getTotalPrice(),
      createdAt: new Date().toISOString(),
    };

    console.log('Booking submitted:', bookingPayload);
    
    // Here you would send to your API
    // await fetch('/api/bookings/cleaning', { method: 'POST', body: JSON.stringify(bookingPayload) });
    
    alert('Booking submitted successfully! We will contact you shortly.');
    sessionStorage.removeItem('cleaningCart');
    router.push('/en/home-cleaning/confirmation');
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {[1, 2, 3, 4].map((s, index) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold ${
                  step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {s}
                </div>
                {index < 3 && (
                  <div className={`w-24 h-1 mx-2 ${
                    step > s ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 text-sm font-semibold text-gray-600">
            <div className="w-12 text-center">Date & Time</div>
            <div className="w-24"></div>
            <div className="w-12 text-center">Contact</div>
            <div className="w-24"></div>
            <div className="w-12 text-center">Address</div>
            <div className="w-24"></div>
            <div className="w-12 text-center">Review</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Step 1: Date & Time */}
              {step === 1 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">Select Date & Time</h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleInputChange}
                      min={getMinDate()}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Preferred Time *
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setBookingData({ ...bookingData, time })}
                          className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                            bookingData.time === time
                              ? 'border-blue-600 bg-blue-50 text-blue-600'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Duration
                    </label>
                    <select
                      name="duration"
                      value={bookingData.duration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {durations.map(d => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                      ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-2">
                      Estimated duration for the cleaning service
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {step === 2 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={bookingData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={bookingData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      placeholder="+971 XX XXX XXXX"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Address */}
              {step === 3 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">Service Address</h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={bookingData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      readOnly
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Area *
                    </label>
                    <select
                      name="area"
                      value={bookingData.area}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Area</option>
                      {dubaiAreas.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={bookingData.address}
                      onChange={handleInputChange}
                      placeholder="Street name and number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Building Name/Number
                      </label>
                      <input
                        type="text"
                        name="building"
                        value={bookingData.building}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Apartment/Villa Number
                      </label>
                      <input
                        type="text"
                        name="apartment"
                        value={bookingData.apartment}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Special Instructions
                    </label>
                    <textarea
                      name="specialInstructions"
                      value={bookingData.specialInstructions}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Any special requests or instructions for our team..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Review & Confirm */}
              {step === 4 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">Review Your Booking</h2>
                  
                  <div className="space-y-6">
                    {/* Services */}
                    <div className="border-b pb-4">
                      <h3 className="font-bold text-lg mb-3">Services</h3>
                      {cart.map(item => (
                        <div key={item.service.id} className="flex justify-between items-center mb-2">
                          <div>
                            <span className="font-semibold">{item.service.name}</span>
                            {item.service.size && <span className="text-gray-500 text-sm ml-2">({item.service.size})</span>}
                            <span className="text-gray-500 ml-2">x{item.quantity}</span>
                          </div>
                          <span className="font-bold">AED {item.service.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Date & Time */}
                    <div className="border-b pb-4">
                      <h3 className="font-bold text-lg mb-3">Date & Time</h3>
                      <p><span className="text-gray-600">Date:</span> <span className="font-semibold">{bookingData.date}</span></p>
                      <p><span className="text-gray-600">Time:</span> <span className="font-semibold">{bookingData.time}</span></p>
                      <p><span className="text-gray-600">Duration:</span> <span className="font-semibold">{bookingData.duration} hours</span></p>
                    </div>

                    {/* Contact */}
                    <div className="border-b pb-4">
                      <h3 className="font-bold text-lg mb-3">Contact Information</h3>
                      <p><span className="text-gray-600">Name:</span> <span className="font-semibold">{bookingData.firstName} {bookingData.lastName}</span></p>
                      <p><span className="text-gray-600">Email:</span> <span className="font-semibold">{bookingData.email}</span></p>
                      <p><span className="text-gray-600">Phone:</span> <span className="font-semibold">{bookingData.phone}</span></p>
                    </div>

                    {/* Address */}
                    <div className="border-b pb-4">
                      <h3 className="font-bold text-lg mb-3">Service Address</h3>
                      <p className="font-semibold">{bookingData.address}</p>
                      {bookingData.building && <p>Building: {bookingData.building}</p>}
                      {bookingData.apartment && <p>Apartment: {bookingData.apartment}</p>}
                      <p>{bookingData.area}, {bookingData.city}</p>
                      {bookingData.specialInstructions && (
                        <div className="mt-2">
                          <p className="text-gray-600 text-sm">Special Instructions:</p>
                          <p className="text-sm italic">{bookingData.specialInstructions}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    onClick={prevStep}
                    className="px-8 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    ← Back
                  </button>
                )}
                {step < 4 ? (
                  <button
                    onClick={nextStep}
                    className="ml-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="ml-auto px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
                  >
                    Confirm Booking ✓
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                {cart.map(item => (
                  <div key={item.service.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.service.name} x{item.quantity}
                    </span>
                    <span className="font-semibold">AED {item.service.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">AED {getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">VAT (5%)</span>
                  <span className="font-semibold">AED {(getTotalPrice() * 0.05).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">AED {(getTotalPrice() * 1.05).toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">✓ Satisfaction Guaranteed</span><br />
                  <span className="text-xs">100% money-back guarantee if you're not satisfied</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
