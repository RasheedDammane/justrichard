'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqs: FAQItem[] = [
    // General Questions
    {
      category: 'general',
      question: 'What is JustRichard and what services do you offer?',
      answer: 'JustRichard is a comprehensive premium service marketplace operating in Thailand and the UAE. We connect users with verified service providers across multiple categories including luxury car rentals, yacht charters, property rentals (condos, villas, apartments), airport transfers, and various lifestyle services. Our platform ensures quality, reliability, and seamless booking experiences for all your premium service needs.'
    },
    {
      category: 'general',
      question: 'In which locations do you operate?',
      answer: 'We currently operate in two primary markets: Thailand (Bangkok, Pattaya, and surrounding areas) and the United Arab Emirates (Dubai and Abu Dhabi). We are continuously expanding our service coverage to include more destinations and plan to add new locations based on user demand and market opportunities.'
    },
    {
      category: 'general',
      question: 'How do I create an account on JustRichard?',
      answer: 'Creating an account is simple and free. Click on the "Sign Up" button in the top right corner of our website, provide your email address, create a secure password, and verify your email. You can also sign up using your social media accounts (Facebook, Google) for faster registration. Once registered, you can manage bookings, save favorites, and access exclusive member benefits.'
    },
    {
      category: 'general',
      question: 'Is it safe to book services through JustRichard?',
      answer: 'Absolutely. We implement multiple security measures including SSL encryption for all transactions, verified service provider screening, secure payment processing through trusted partners (Stripe, PayPal), and 24/7 customer support. All service providers undergo rigorous verification including business license checks, insurance verification, and customer review analysis. We also offer buyer protection and dispute resolution services.'
    },

    // Booking Questions
    {
      category: 'booking',
      question: 'How do I make a booking?',
      answer: 'Browse our services by category (cars, yachts, properties, transfers), use filters to narrow your search, select your preferred service, choose your dates and options, review the total price, and proceed to secure checkout. You will receive instant confirmation via email and SMS. Your booking details will be available in your account dashboard where you can manage, modify, or cancel as needed.'
    },
    {
      category: 'booking',
      question: 'Can I modify or cancel my booking?',
      answer: 'Yes, you can modify or cancel most bookings through your account dashboard. Cancellation policies vary by service type and provider. Generally: Car rentals allow free cancellation up to 48 hours before pickup, yacht charters up to 7 days before, properties up to 7 days before check-in, and transfers up to 24 hours before pickup. Refunds are processed within 7-14 business days. Please review the specific cancellation policy for your booking before confirming.'
    },
    {
      category: 'booking',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, digital wallets (Apple Pay, Google Pay), and bank transfers for certain bookings. All payments are processed securely through our encrypted payment gateway. We do not store complete credit card information on our servers. For corporate bookings, we also offer invoice payment options with approved credit terms.'
    },
    {
      category: 'booking',
      question: 'Will I receive a confirmation after booking?',
      answer: 'Yes, immediately after completing your booking, you will receive a confirmation email with all booking details including service information, dates, location, provider contact details, and booking reference number. You will also receive SMS confirmation. A copy of your booking is always available in your account dashboard. We recommend saving or printing your confirmation for reference.'
    },

    // Car Rental Questions
    {
      category: 'cars',
      question: 'What are the requirements to rent a car?',
      answer: 'To rent a car through JustRichard, you must be at least 21 years old (25 for luxury vehicles), hold a valid driver\'s license for at least 1 year (2 years for premium cars), provide a valid passport or national ID, and have a credit card in your name for the security deposit. International visitors need an International Driving Permit (IDP) along with their home country license. Some luxury vehicles may have additional requirements.'
    },
    {
      category: 'cars',
      question: 'What is included in the car rental price?',
      answer: 'Our car rental prices include basic insurance coverage, unlimited mileage (for most vehicles), 24/7 roadside assistance, and vehicle registration fees. Additional options available at extra cost include: comprehensive insurance (CDW), additional drivers, GPS navigation, child seats, airport delivery/pickup, and extended coverage. Fuel is not included - vehicles are provided with a full tank and should be returned with a full tank.'
    },
    {
      category: 'cars',
      question: 'Can I rent a car for someone else?',
      answer: 'The primary renter must be present at pickup with valid documents. However, you can add additional drivers to the rental agreement for a small fee. All drivers must meet the age and license requirements and be present during pickup to provide their documents. The primary renter remains responsible for the vehicle and any charges incurred during the rental period.'
    },

    // Yacht Charter Questions
    {
      category: 'yachts',
      question: 'What is included in a yacht charter?',
      answer: 'Standard yacht charters include the vessel rental, experienced captain and crew, basic insurance, fuel for standard routes, safety equipment, and basic amenities. Many yachts also include water sports equipment, sound systems, and refreshments. Catering, special decorations, extended routes, and premium beverages can be arranged at additional cost. Each yacht listing specifies what is included and what optional extras are available.'
    },
    {
      category: 'yachts',
      question: 'How many people can a yacht accommodate?',
      answer: 'Our yacht fleet ranges from intimate vessels for 8-12 guests to large yachts accommodating up to 100+ guests. Each yacht listing clearly states the maximum capacity. For safety and comfort, we recommend booking based on the stated capacity. The number of guests affects pricing, and some yachts offer different rates for different group sizes. Contact us for recommendations based on your group size and event type.'
    },
    {
      category: 'yachts',
      question: 'Can I bring my own food and drinks on the yacht?',
      answer: 'Policies vary by yacht and charter type. Many yachts allow you to bring your own food and beverages, while others require you to use their catering services. Some yachts charge a corkage fee for outside food and drinks. We recommend checking the specific yacht\'s policy in the listing or contacting us before your charter. We can also arrange professional catering services to make your experience hassle-free.'
    },

    // Property Rental Questions
    {
      category: 'properties',
      question: 'What types of properties are available?',
      answer: 'We offer a wide range of accommodation options including luxury condos, beachfront villas, city apartments, serviced residences, penthouses, townhouses, and pool villas. Properties range from studio apartments for solo travelers to large villas accommodating families and groups. All properties are verified, and listings include detailed descriptions, photos, amenities, and location information. You can filter by property type, bedrooms, price, and location.'
    },
    {
      category: 'properties',
      question: 'What is the minimum rental period?',
      answer: 'Minimum rental periods vary by property. Most properties have a minimum stay of 1-3 nights for short-term rentals. Some properties offer monthly rates for long-term stays (30+ days) at discounted prices. During peak seasons and holidays, minimum stay requirements may be longer. Each property listing specifies the minimum stay requirement. Contact us for flexible arrangements or special requests.'
    },
    {
      category: 'properties',
      question: 'Are utilities included in the rental price?',
      answer: 'For short-term rentals (less than 30 days), utilities (electricity, water, internet) are typically included in the nightly rate. For monthly rentals, utility arrangements vary by property - some include utilities up to a certain limit, while others require separate payment. Each property listing clearly states what is included. Additional services like housekeeping, laundry, and parking may be available at extra cost.'
    },

    // Transfer Questions
    {
      category: 'transfers',
      question: 'How do airport transfers work?',
      answer: 'Book your transfer by selecting your pickup location (airport), destination, date, time, and number of passengers. Choose your vehicle type (sedan, SUV, van, luxury). After booking, you will receive driver details and contact information. Your driver will meet you at the designated meeting point with a name sign. Flight tracking is included - if your flight is delayed, your driver will adjust pickup time automatically. All transfers include meet and greet service and luggage assistance.'
    },
    {
      category: 'transfers',
      question: 'Can I book a transfer for multiple stops?',
      answer: 'Yes, you can book transfers with multiple stops. When making your booking, specify all pickup and drop-off locations. Additional stops may incur extra charges based on distance and time. For complex itineraries or full-day transfers, consider booking our hourly transfer service which provides more flexibility. Contact our customer service team for custom transfer arrangements and pricing.'
    },

    // Payment and Refunds
    {
      category: 'payment',
      question: 'When will I be charged for my booking?',
      answer: 'Payment timing depends on the service type. For most bookings, full payment is required at the time of booking to confirm your reservation. Some properties and long-term rentals may require a deposit (typically 30-50%) with the balance due before check-in. Corporate accounts may have different payment terms. All payment schedules are clearly displayed before you confirm your booking.'
    },
    {
      category: 'payment',
      question: 'How long does it take to receive a refund?',
      answer: 'Refunds are processed within 7-14 business days from the cancellation date, depending on your payment method and bank processing times. The refund will be credited to the original payment method used for booking. You will receive an email confirmation when the refund is initiated. Service fees and processing charges are typically non-refundable. For urgent refund inquiries, contact our customer support team.'
    },
    {
      category: 'payment',
      question: 'Do you charge any additional fees?',
      answer: 'Our pricing is transparent. The price you see includes the service cost and our service fee. Additional costs may include: optional extras you select (insurance, equipment, catering), taxes (where applicable), payment processing fees for certain payment methods, and any modifications after booking. All fees are clearly itemized before you confirm your booking. There are no hidden charges.'
    },

    // Support Questions
    {
      category: 'support',
      question: 'How can I contact customer support?',
      answer: 'Our customer support team is available 24/7 to assist you. Contact us via: Email at support@justrichard.com (response within 2 hours), Phone at +66 2 123 4567 (Thailand) or +971 4 123 4567 (UAE), Live chat on our website and mobile app, or through your account dashboard. For urgent issues during your booking, use the emergency contact number provided in your confirmation email.'
    },
    {
      category: 'support',
      question: 'What if I have an issue during my booking?',
      answer: 'If you encounter any issues during your booking, contact us immediately through our 24/7 support channels. We will work with you and the service provider to resolve the issue promptly. Document the issue with photos if possible. For serious issues, we offer alternative arrangements or refunds as appropriate. Your satisfaction is our priority, and we have dedicated teams to handle urgent situations and ensure your experience meets expectations.'
    },
    {
      category: 'support',
      question: 'Do you offer travel insurance?',
      answer: 'While we do not directly provide travel insurance, we strongly recommend purchasing comprehensive travel insurance for your trips. We can recommend trusted insurance partners who offer coverage for trip cancellations, medical emergencies, lost luggage, and other travel-related issues. Some of our premium services include basic insurance coverage, but additional protection is advisable for complete peace of mind.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', icon: '📋' },
    { id: 'general', name: 'General', icon: '❓' },
    { id: 'booking', name: 'Booking', icon: '📅' },
    { id: 'cars', name: 'Car Rentals', icon: '🚗' },
    { id: 'yachts', name: 'Yachts', icon: '🚤' },
    { id: 'properties', name: 'Properties', icon: '🏠' },
    { id: 'transfers', name: 'Transfers', icon: '🚕' },
    { id: 'payment', name: 'Payment', icon: '💳' },
    { id: 'support', name: 'Support', icon: '💬' },
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our services, bookings, payments, and more. 
            Can't find what you're looking for? Contact our 24/7 support team.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-lg shadow-lg">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-5 hover:bg-gray-50 transition-colors flex justify-between items-center"
              >
                <span className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <span className="text-2xl text-orange-500 flex-shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
          <p className="text-orange-100 mb-6 text-lg">
            Our customer support team is available 24/7 to help you
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/en/contact"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@justrichard.com"
              className="bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-800 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
