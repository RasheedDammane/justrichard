export default function PartnershipsPage() {
  const partnershipTypes = [
    {
      icon: '🚗',
      title: 'Car Rental Companies',
      description: 'Join our network of premium car rental providers',
      benefits: [
        'Access to thousands of customers',
        'Increased booking volume',
        'Marketing and promotion support',
        'Flexible commission structure',
        'Real-time booking management'
      ]
    },
    {
      icon: '🚤',
      title: 'Yacht Operators',
      description: 'List your yacht fleet on our platform',
      benefits: [
        'Reach high-value clientele',
        'Premium listing visibility',
        'Booking calendar integration',
        'Professional photography support',
        'Dedicated account manager'
      ]
    },
    {
      icon: '🏠',
      title: 'Property Owners',
      description: 'List your properties for short and long-term rentals',
      benefits: [
        'Maximum occupancy rates',
        'Competitive commission rates',
        'Verified guest screening',
        'Damage protection coverage',
        'Automated payment processing'
      ]
    },
    {
      icon: '🚕',
      title: 'Transfer Services',
      description: 'Provide reliable airport and city transfers',
      benefits: [
        'Steady stream of bookings',
        'Flight tracking integration',
        'Instant booking confirmations',
        'Driver app and support',
        'Performance bonuses'
      ]
    },
    {
      icon: '🏛️',
      title: 'Hotels & Resorts',
      description: 'Partner with us for accommodation bookings',
      benefits: [
        'Increased direct bookings',
        'Channel management tools',
        'Dynamic pricing support',
        'Guest review management',
        'Revenue optimization'
      ]
    },
    {
      icon: '🎉',
      title: 'Activity Providers',
      description: 'Offer tours, experiences, and activities',
      benefits: [
        'Expand your customer base',
        'Easy booking management',
        'Marketing exposure',
        'Flexible scheduling',
        'Group booking support'
      ]
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Users' },
    { number: '1,000+', label: 'Service Providers' },
    { number: '100,000+', label: 'Bookings Completed' },
    { number: '4.8/5', label: 'Average Rating' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl font-bold mb-6">Partner With JustRichard</h1>
          <p className="text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Join Thailand and UAE's fastest-growing premium service marketplace. 
            Grow your business with access to thousands of customers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#apply"
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-colors shadow-lg"
            >
              Become a Partner
            </a>
            <a
              href="#benefits"
              className="bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-800 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Why Partner Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Partner With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Grow Your Business</h3>
              <p className="text-gray-700">
                Access our growing customer base of over 50,000 active users across Thailand and the UAE. 
                Increase your bookings and revenue with our powerful marketing platform and targeted promotions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-5xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Management</h3>
              <p className="text-gray-700">
                Our intuitive partner dashboard makes it simple to manage your listings, bookings, availability, 
                and payments. Real-time notifications and automated processes save you time and effort.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Competitive Rates</h3>
              <p className="text-gray-700">
                Enjoy competitive commission rates with transparent pricing. No hidden fees, no surprises. 
                Fast and reliable payment processing with multiple payout options to suit your business needs.
              </p>
            </div>
          </div>
        </div>

        {/* Partnership Types */}
        <div className="mb-16" id="benefits">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Partnership Opportunities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="text-5xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Apply Online</h3>
              <p className="text-sm text-gray-600">
                Fill out our simple application form with your business details and service information.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Verification</h3>
              <p className="text-sm text-gray-600">
                Our team reviews your application and verifies your credentials, licenses, and insurance.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Setup & Training</h3>
              <p className="text-sm text-gray-600">
                Get onboarded with dedicated support, training materials, and access to your partner dashboard.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Start Earning</h3>
              <p className="text-sm text-gray-600">
                Go live on our platform and start receiving bookings from thousands of customers.
              </p>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Partner Requirements</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">General Requirements</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span><strong>Valid Business License:</strong> Must have a registered business with valid operating licenses in Thailand or UAE</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span><strong>Insurance Coverage:</strong> Comprehensive insurance coverage for your services and operations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span><strong>Quality Standards:</strong> Commitment to maintaining high service quality and customer satisfaction</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span><strong>Professional Staff:</strong> Trained and professional staff or drivers with proper certifications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span><strong>Safety Compliance:</strong> Adherence to all safety regulations and industry standards</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Requirements</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span><strong>Internet Access:</strong> Reliable internet connection for managing bookings and communications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span><strong>Email & Phone:</strong> Active email and phone number for customer and platform communications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span><strong>Banking Details:</strong> Valid bank account for receiving payments and payouts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span><strong>Documentation:</strong> Ability to provide required documentation including photos, descriptions, and pricing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span><strong>Response Time:</strong> Commitment to responding to booking requests within 2 hours during business hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Partner Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Bangkok Luxury Cars</h3>
              <p className="text-sm text-gray-600 mb-3">
                "Since joining JustRichard, our bookings have increased by 300%. The platform is easy to use, 
                and the support team is always helpful. Highly recommended!"
              </p>
              <div className="text-sm text-orange-600 font-semibold">+300% Bookings</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🚤</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Pattaya Yacht Charters</h3>
              <p className="text-sm text-gray-600 mb-3">
                "JustRichard connected us with high-value clients we couldn't reach before. The commission rates 
                are fair, and payments are always on time. Great partnership!"
              </p>
              <div className="text-sm text-orange-600 font-semibold">+250% Revenue</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Dubai Property Group</h3>
              <p className="text-sm text-gray-600 mb-3">
                "The platform has helped us achieve 95% occupancy rates. The booking management tools are 
                excellent, and customer support is outstanding. Best decision we made!"
              </p>
              <div className="text-sm text-orange-600 font-semibold">95% Occupancy</div>
            </div>
          </div>
        </div>

        {/* Application Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16" id="apply">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Ready to Partner With Us?</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Fill out the form below to start your partnership application. Our team will review your submission 
            and get back to you within 48 hours.
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Your Company Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Full Name"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="business@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="+66 12 345 6789"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Type *</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option>Select service type</option>
                    <option>Car Rental</option>
                    <option>Yacht Charter</option>
                    <option>Property Rental</option>
                    <option>Airport Transfer</option>
                    <option>Hotel/Resort</option>
                    <option>Activity Provider</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option>Select location</option>
                    <option>Bangkok, Thailand</option>
                    <option>Pattaya, Thailand</option>
                    <option>Dubai, UAE</option>
                    <option>Abu Dhabi, UAE</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your business *</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Describe your business, services, experience, and why you want to partner with JustRichard..."
                />
              </div>
              <button className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl">
                Submit Application
              </button>
              <p className="text-xs text-gray-500 text-center">
                By submitting this application, you agree to our Partner Terms and Conditions. 
                We will contact you within 48 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Have Questions?</h2>
          <p className="text-orange-100 mb-6 text-lg">
            Our partnerships team is here to help answer any questions about joining JustRichard
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:partnerships@justrichard.com"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              📧 Email Us
            </a>
            <a
              href="tel:+6621234569"
              className="bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-800 transition-colors"
            >
              📞 Call +66 2 123 4569
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
