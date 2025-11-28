import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Cleaning Services Dubai | JustRichard',
  description: 'Professional home cleaning, furniture cleaning, and laundry services in Dubai. Book now for same-day service!',
};

export default function HomeCleaningPage() {
  const services = [
    {
      id: 'home',
      title: 'Home Cleaning',
      icon: '🏠',
      description: 'Regular and deep cleaning for apartments, condos, houses, and villas',
      features: ['Regular Cleaning', 'Deep Cleaning', 'Move-in/Move-out', 'Post-Construction'],
      href: '/en/home-cleaning/home',
      color: 'from-blue-500 to-blue-600',
      image: '/images/home-cleaning.jpg'
    },
    {
      id: 'furniture',
      title: 'Furniture Cleaning',
      icon: '🛋️',
      description: 'Professional cleaning for sofas, mattresses, carpets, and curtains',
      features: ['Sofa Cleaning', 'Mattress Cleaning', 'Carpet Cleaning', 'Curtain Cleaning'],
      href: '/en/home-cleaning/furniture',
      color: 'from-purple-500 to-purple-600',
      image: '/images/furniture-cleaning.jpg'
    },
    {
      id: 'laundry',
      title: 'Laundry & Dry Cleaning',
      icon: '👔',
      description: 'Wash, iron, fold, and dry cleaning services for all your garments',
      features: ['Wash & Iron', 'Wash & Fold', 'Dry Cleaning', 'Home Linens'],
      href: '/en/home-cleaning/laundry',
      color: 'from-green-500 to-green-600',
      image: '/images/laundry-cleaning.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Professional Cleaning Services
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Choose from our range of professional cleaning services in Dubai
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <span>✓</span> Same Day Service
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <span>✓</span> Trained Professionals
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <span>✓</span> Eco-Friendly Products
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <span>✓</span> 100% Satisfaction
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Services</h2>
          <p className="text-xl text-gray-600">Select the service you need</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Header with Gradient */}
              <div className={`bg-gradient-to-r ${service.color} p-8 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 text-9xl opacity-10 transform translate-x-8 -translate-y-4">
                  {service.icon}
                </div>
                <div className="relative z-10">
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-white/90">{service.description}</p>
                </div>
              </div>

              {/* Features List */}
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between text-blue-600 font-semibold group-hover:text-blue-700">
                  <span>View Services</span>
                  <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose JustRichard?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <span className="text-3xl">👨‍🔧</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Verified Professionals</h3>
              <p className="text-gray-600 text-sm">All cleaners are background-checked and trained</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Eco-Friendly</h3>
              <p className="text-gray-600 text-sm">Safe, non-toxic cleaning products</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Same Day Service</h3>
              <p className="text-gray-600 text-sm">Book now, get service today</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <span className="text-3xl">💯</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Satisfaction Guaranteed</h3>
              <p className="text-gray-600 text-sm">100% money-back guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Choose your service and book in just a few clicks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/en/home-cleaning/home"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Book Home Cleaning
            </Link>
            <Link
              href="/en/contact"
              className="px-8 py-4 bg-blue-700 text-white rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors border-2 border-white/30"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
