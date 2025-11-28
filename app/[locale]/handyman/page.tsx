import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Handyman Services Dubai | Professional Home Repair | JustRichard',
  description: 'Expert handyman services in Dubai. Plumbing, electrical, AC repair, carpentry, painting and more. Book trusted professionals today!',
};

export default function HandymanPage() {
  const services = [
    {
      id: 'plumbing',
      title: 'Plumbing',
      icon: '🚰',
      description: 'Leak repair, pipe installation, faucet & toilet services',
      features: ['Leak Detection', 'Pipe Repair', 'Faucet Installation', 'Drain Cleaning'],
      href: '/en/handyman/plumbing',
      color: 'from-blue-500 to-blue-600',
      popular: true
    },
    {
      id: 'electrical',
      title: 'Electrical',
      icon: '⚡',
      description: 'Wiring, outlets, switches, lighting & electrical repairs',
      features: ['Light Installation', 'Outlet Repair', 'Switch Replacement', 'Safety Check'],
      href: '/en/handyman/electrical',
      color: 'from-yellow-500 to-orange-500',
      popular: true
    },
    {
      id: 'ac-repair',
      title: 'AC Repair',
      icon: '❄️',
      description: 'AC installation, repair, cleaning & maintenance',
      features: ['AC Repair', 'AC Cleaning', 'Gas Refill', 'Installation'],
      href: '/en/handyman/ac-repair',
      color: 'from-cyan-500 to-blue-500',
      popular: true
    },
    {
      id: 'carpentry',
      title: 'Carpentry',
      icon: '🪚',
      description: 'Custom furniture, cabinet installation & wood repairs',
      features: ['Custom Furniture', 'Cabinet Install', 'Door Repair', 'Shelving'],
      href: '/en/handyman/carpentry',
      color: 'from-amber-600 to-orange-600',
      popular: true
    },
    {
      id: 'painting',
      title: 'Painting',
      icon: '🎨',
      description: 'Interior & exterior painting, wallpaper & wall repairs',
      features: ['Interior Painting', 'Exterior Painting', 'Wallpaper', 'Wall Repair'],
      href: '/en/handyman/painting',
      color: 'from-pink-500 to-rose-500',
      popular: true
    },
    {
      id: 'appliance-repair',
      title: 'Appliance Repair',
      icon: '🧰',
      description: 'Washing machine, refrigerator, oven & appliance fixes',
      features: ['Washing Machine', 'Refrigerator', 'Oven Repair', 'Dishwasher'],
      href: '/en/handyman/appliance-repair',
      color: 'from-gray-600 to-gray-700',
      popular: true
    },
    {
      id: 'furniture-assembly',
      title: 'Furniture Assembly',
      icon: '🔧',
      description: 'Professional furniture assembly & TV mounting',
      features: ['IKEA Assembly', 'TV Mounting', 'Shelf Hanging', 'Bed Assembly'],
      href: '/en/handyman/furniture-assembly',
      color: 'from-indigo-500 to-purple-500',
      popular: true
    },
    {
      id: 'home-repairs',
      title: 'Home Repairs',
      icon: '🏠',
      description: 'General repairs, door/window fixes & maintenance',
      features: ['Door Repair', 'Window Repair', 'Drywall Patch', 'Lock Repair'],
      href: '/en/handyman/home-repairs',
      color: 'from-green-500 to-emerald-600',
      popular: true
    },
    {
      id: 'flooring-tiling',
      title: 'Flooring & Tiling',
      icon: '🧱',
      description: 'Tile installation, repair, regrouting & floor polishing',
      features: ['Tile Installation', 'Tile Repair', 'Regrouting', 'Floor Polish'],
      href: '/en/handyman/flooring-tiling',
      color: 'from-stone-500 to-slate-600',
      popular: false
    },
    {
      id: 'outdoor-garden',
      title: 'Outdoor & Garden',
      icon: '🏡',
      description: 'Garden maintenance, lawn care & outdoor repairs',
      features: ['Garden Care', 'Lawn Mowing', 'Fence Repair', 'Tree Trimming'],
      href: '/en/handyman/outdoor-garden',
      color: 'from-lime-500 to-green-600',
      popular: false
    },
    {
      id: 'cleaning',
      title: 'Cleaning Services',
      icon: '🧼',
      description: 'House cleaning, deep cleaning & specialized cleaning',
      features: ['House Cleaning', 'Deep Cleaning', 'Carpet Cleaning', 'Window Cleaning'],
      href: '/en/home-cleaning',
      color: 'from-teal-500 to-cyan-500',
      popular: false
    },
    {
      id: 'general',
      title: 'General Handyman',
      icon: '🔨',
      description: 'All-around handyman for various home tasks',
      features: ['General Repairs', 'Maintenance', 'Small Jobs', 'Quick Fixes'],
      href: '/en/handyman/general',
      color: 'from-violet-500 to-purple-600',
      popular: false
    }
  ];

  const popularServices = services.filter(s => s.popular);
  const otherServices = services.filter(s => !s.popular);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-20 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Professional Handyman Services
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Expert home repair and maintenance services in Dubai
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <span>✓</span> Licensed Professionals
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <span>✓</span> Same Day Service
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <span>✓</span> Fixed Pricing
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <span>✓</span> 100% Satisfaction
            </div>
          </div>
        </div>
      </div>

      {/* Popular Services */}
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Most Popular Services</h2>
          <p className="text-xl text-gray-600">Choose from our most requested handyman services</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {popularServices.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Header with Gradient */}
              <div className={`bg-gradient-to-r ${service.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 text-8xl opacity-10 transform translate-x-6 -translate-y-2">
                  {service.icon}
                </div>
                <div className="relative z-10">
                  <div className="text-5xl mb-3">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-white/90 text-sm">{service.description}</p>
                </div>
              </div>

              {/* Features List */}
              <div className="p-5">
                <ul className="space-y-2 mb-4">
                  {service.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between text-orange-600 font-semibold group-hover:text-orange-700">
                  <span>Book Now</span>
                  <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Other Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">All Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherServices.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${service.color} p-5 text-white`}>
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <h3 className="text-lg font-bold">{service.title}</h3>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  <div className="text-orange-600 font-semibold text-sm group-hover:text-orange-700">
                    View Services →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose JustRichard?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <span className="text-3xl">👨‍🔧</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Licensed Experts</h3>
              <p className="text-gray-600 text-sm">Certified and experienced professionals</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Fixed Pricing</h3>
              <p className="text-gray-600 text-sm">No hidden fees, transparent rates</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Same Day Service</h3>
              <p className="text-gray-600 text-sm">Quick response and fast service</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Warranty Included</h3>
              <p className="text-gray-600 text-sm">All work comes with guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Need a Handyman?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Book a professional for your home repair needs today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/en/handyman/general"
              className="px-8 py-4 bg-white text-orange-600 rounded-lg font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg"
            >
              Book General Handyman
            </Link>
            <Link
              href="/en/contact"
              className="px-8 py-4 bg-orange-700 text-white rounded-lg font-bold text-lg hover:bg-orange-800 transition-colors border-2 border-white/30"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
