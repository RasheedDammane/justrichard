export default function HelpPage() {
  const helpTopics = [
    {
      icon: '🚗',
      title: 'Car Rentals',
      description: 'Everything about renting luxury vehicles',
      link: '/en/help/car-rentals',
      topics: [
        'How to book a car',
        'Required documents',
        'Insurance options',
        'Pickup and return process',
        'Fuel policy',
        'Additional drivers'
      ]
    },
    {
      icon: '🚤',
      title: 'Yacht Charters',
      description: 'Guide to booking and enjoying yacht experiences',
      link: '/en/help/yachts',
      topics: [
        'Charter types and durations',
        'What\'s included',
        'Catering options',
        'Safety guidelines',
        'Weather cancellations',
        'Special events'
      ]
    },
    {
      icon: '🏠',
      title: 'Property Rentals',
      description: 'Find and book your perfect accommodation',
      link: '/en/help/properties',
      topics: [
        'Search and filters',
        'Check-in procedures',
        'House rules',
        'Utilities and amenities',
        'Long-term rentals',
        'Property issues'
      ]
    },
    {
      icon: '🚕',
      title: 'Airport Transfers',
      description: 'Reliable transportation services',
      link: '/en/help/transfers',
      topics: [
        'Booking process',
        'Meeting your driver',
        'Flight delays',
        'Multiple stops',
        'Luggage allowance',
        'Vehicle options'
      ]
    },
    {
      icon: '💳',
      title: 'Payments & Billing',
      description: 'Payment methods and refund policies',
      link: '/en/help/payments',
      topics: [
        'Accepted payment methods',
        'Secure checkout',
        'Refund process',
        'Invoices and receipts',
        'Currency conversion',
        'Payment issues'
      ]
    },
    {
      icon: '👤',
      title: 'Account Management',
      description: 'Manage your profile and preferences',
      link: '/en/help/account',
      topics: [
        'Create an account',
        'Update profile',
        'Password reset',
        'Notification settings',
        'Saved favorites',
        'Delete account'
      ]
    }
  ];

  const quickLinks = [
    { title: 'Track My Booking', icon: '📍', link: '/en/bookings' },
    { title: 'Modify Booking', icon: '✏️', link: '/en/bookings' },
    { title: 'Cancel Booking', icon: '❌', link: '/en/bookings' },
    { title: 'Contact Support', icon: '💬', link: '/en/contact' },
    { title: 'Report Issue', icon: '⚠️', link: '/en/contact' },
    { title: 'View FAQ', icon: '❓', link: '/en/faq' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Welcome to the JustRichard Help Center. Find answers, guides, and support for all our services.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles, guides, or topics..."
                className="w-full px-6 py-4 pr-12 text-lg border-2 border-gray-300 rounded-full focus:border-orange-500 focus:outline-none shadow-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.link}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{link.icon}</div>
                <div className="text-sm font-medium text-gray-900">{link.title}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Help Topics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Topic</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpTopics.map((topic, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="text-5xl mb-4">{topic.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <ul className="space-y-2 mb-4">
                  {topic.topics.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={topic.link}
                  className="text-orange-600 font-semibold hover:text-orange-700 inline-flex items-center"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Guides */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Guides</h2>
          
          <div className="space-y-8">
            {/* Guide 1 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Getting Started with JustRichard</h3>
              <p className="text-gray-700 mb-4">
                Welcome to JustRichard! This comprehensive guide will help you navigate our platform and make the most of our premium services. Whether you're looking to rent a luxury car, charter a yacht, book a property, or arrange airport transfers, we've made the process simple and secure.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Step 1: Create Your Account</strong><br />
                Start by creating a free account. Click "Sign Up" in the top right corner, provide your email and create a password. You can also sign up using your social media accounts for faster registration. Once registered, you'll have access to your personal dashboard where you can manage all your bookings, save favorites, and track your service history.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Step 2: Browse Services</strong><br />
                Explore our four main service categories: Luxury Car Rentals, Yacht Charters, Property Rentals, and Airport Transfers. Each category offers advanced filters to help you find exactly what you need. Filter by location, price range, dates, capacity, and specific features. Our detailed listings include high-quality photos, comprehensive descriptions, customer reviews, and transparent pricing.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Step 3: Make a Booking</strong><br />
                Once you've found your perfect service, select your dates and any optional extras. Review the total price breakdown, cancellation policy, and terms. Proceed to our secure checkout where you can pay using credit cards, debit cards, or digital wallets. You'll receive instant confirmation via email and SMS with all booking details and provider contact information.
              </p>
            </div>

            {/* Guide 2 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Understanding Our Cancellation Policies</h3>
              <p className="text-gray-700 mb-4">
                We understand that plans can change. Our cancellation policies are designed to be fair to both customers and service providers. Policies vary by service type and are clearly displayed before you confirm your booking.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Car Rentals:</strong> Free cancellation up to 48 hours before your scheduled pickup time. Cancellations made 24-48 hours before pickup receive a 50% refund. Cancellations within 24 hours are non-refundable. No-shows result in full charge.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Yacht Charters:</strong> Free cancellation up to 7 days before your charter date. Cancellations made 3-7 days before receive a 50% refund. Cancellations within 72 hours are non-refundable. Weather-related cancellations initiated by the operator result in full refunds or rescheduling options.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Properties:</strong> Cancellation policies vary by property and are set by individual owners. Most properties offer free cancellation up to 7 days before check-in. Some properties may have stricter policies during peak seasons. Always review the specific property's cancellation policy before booking.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Airport Transfers:</strong> Free cancellation up to 24 hours before scheduled pickup. Cancellations made 12-24 hours before receive a 50% refund. Cancellations within 12 hours are non-refundable. Flight delays are automatically accommodated at no extra charge.
              </p>
              <p className="text-gray-700">
                All refunds are processed within 7-14 business days to your original payment method. Service fees and payment processing charges are typically non-refundable. For special circumstances or urgent cancellations, contact our 24/7 support team who may be able to assist with alternative arrangements.
              </p>
            </div>

            {/* Guide 3 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety and Security on JustRichard</h3>
              <p className="text-gray-700 mb-4">
                Your safety and security are our top priorities. We implement multiple layers of protection to ensure your experience is safe, secure, and worry-free.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Verified Service Providers:</strong> All service providers on our platform undergo rigorous verification. We check business licenses, insurance coverage, safety certifications, and conduct background checks. Providers must maintain high ratings and positive customer reviews to remain on our platform.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Secure Payments:</strong> All transactions are processed through our encrypted payment gateway using industry-standard SSL/TLS protocols. We partner with trusted payment processors like Stripe and PayPal. We never store complete credit card information on our servers. Your payment data is protected by PCI DSS compliance standards.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Data Privacy:</strong> We comply with international data protection regulations including GDPR. Your personal information is encrypted, stored securely, and never sold to third parties. You have full control over your data and can request access, correction, or deletion at any time.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>24/7 Support:</strong> Our customer support team is available around the clock to assist with any issues or emergencies. Every booking includes emergency contact numbers. We have dedicated teams to handle urgent situations and ensure your safety.
              </p>
              <p className="text-gray-700">
                <strong>Insurance Coverage:</strong> Most services include basic insurance coverage. We recommend purchasing additional travel insurance for comprehensive protection. We can recommend trusted insurance partners who offer coverage for trip cancellations, medical emergencies, and other travel-related issues.
              </p>
            </div>

            {/* Guide 4 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Maximizing Your Experience</h3>
              <p className="text-gray-700 mb-4">
                Get the most out of JustRichard with these expert tips and best practices:
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Book in Advance:</strong> For the best selection and prices, book your services as early as possible, especially during peak seasons and holidays. Early bookings often qualify for special discounts and promotional offers.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Read Reviews:</strong> Take time to read customer reviews and ratings. They provide valuable insights into service quality, provider reliability, and overall experience. Look for recent reviews and consistent positive feedback.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Communicate Clearly:</strong> Provide accurate information when booking and communicate any special requests or requirements. The more information you provide, the better we can serve you.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Save Favorites:</strong> Use the "Save" feature to bookmark services you're interested in. This makes it easy to compare options and return to your favorites later.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Join Our Newsletter:</strong> Subscribe to receive exclusive offers, new service announcements, travel tips, and special promotions. Members often get early access to deals and limited-time offers.
              </p>
              <p className="text-gray-700">
                <strong>Leave Reviews:</strong> After your experience, please leave a review. Your feedback helps other users make informed decisions and helps us maintain high service standards. We appreciate honest, constructive reviews.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">Can't Find What You're Looking For?</h2>
          <p className="text-orange-100 mb-6 text-lg">
            Our support team is here to help 24/7
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/en/contact"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </a>
            <a
              href="/en/faq"
              className="bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-800 transition-colors inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              View FAQ
            </a>
            <a
              href="tel:+6621234567"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
          </div>
          <p className="mt-6 text-sm text-orange-100">
            Available 24/7 • Average response time: 2 hours • Support in English, French, and Thai
          </p>
        </div>
      </div>
    </div>
  );
}
