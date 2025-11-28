'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will respond within 24 hours.');
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Get help via email with detailed responses',
      contact: 'support@justrichard.com',
      link: 'mailto:support@justrichard.com',
      response: 'Response within 2-4 hours'
    },
    {
      icon: '📞',
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      contact: '+66 2 123 4567 (Thailand)',
      link: 'tel:+6621234567',
      response: 'Available 24/7'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Instant messaging with support agents',
      contact: 'Available on website',
      link: '#',
      response: 'Average wait: 2 minutes'
    },
    {
      icon: '🌐',
      title: 'WhatsApp',
      description: 'Message us on WhatsApp for quick help',
      contact: '+66 98 765 4321',
      link: 'https://wa.me/66987654321',
      response: 'Response within 1 hour'
    }
  ];

  const offices = [
    {
      country: '🇹🇭 Thailand',
      city: 'Bangkok',
      address: '123 Sukhumvit Road, Khlong Toei',
      postal: 'Bangkok 10110, Thailand',
      phone: '+66 2 123 4567',
      email: 'thailand@justrichard.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM (ICT)'
    },
    {
      country: '🇦🇪 UAE',
      city: 'Dubai',
      address: '456 Sheikh Zayed Road, Business Bay',
      postal: 'Dubai, United Arab Emirates',
      phone: '+971 4 123 4567',
      email: 'dubai@justrichard.com',
      hours: 'Sun-Thu: 9:00 AM - 6:00 PM (GST)'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help! Reach out to our support team 24/7 for assistance with bookings, 
            questions, or any issues you may encounter.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{method.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{method.description}</p>
              <p className="text-sm font-semibold text-orange-600 mb-2">{method.contact}</p>
              <p className="text-xs text-gray-500">{method.response}</p>
            </a>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="+66 12 345 6789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select a category</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="support">Customer Support</option>
                  <option value="technical">Technical Issue</option>
                  <option value="payment">Payment & Billing</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our Privacy Policy and Terms of Service.
                We typically respond within 24 hours.
              </p>
            </form>
          </div>

          {/* Office Locations & Additional Info */}
          <div className="space-y-6">
            {/* Office Locations */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Offices</h2>
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{office.country}</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p className="flex items-start">
                        <span className="text-orange-500 mr-2">📍</span>
                        <span>
                          <strong>{office.city}</strong><br />
                          {office.address}<br />
                          {office.postal}
                        </span>
                      </p>
                      <p className="flex items-center">
                        <span className="text-orange-500 mr-2">📞</span>
                        <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="hover:text-orange-600">
                          {office.phone}
                        </a>
                      </p>
                      <p className="flex items-center">
                        <span className="text-orange-500 mr-2">📧</span>
                        <a href={`mailto:${office.email}`} className="hover:text-orange-600">
                          {office.email}
                        </a>
                      </p>
                      <p className="flex items-center">
                        <span className="text-orange-500 mr-2">🕐</span>
                        <span>{office.hours}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Support */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
              <p className="text-orange-100 mb-6">
                For urgent matters or if you need immediate assistance with an active booking, 
                please call our 24/7 emergency hotline.
              </p>
              <div className="space-y-3">
                <a
                  href="tel:+6621234567"
                  className="block bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold text-center hover:bg-orange-50 transition-colors"
                >
                  📞 Call Emergency Hotline
                </a>
                <a
                  href="https://wa.me/66987654321"
                  className="block bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-orange-800 transition-colors"
                >
                  💬 WhatsApp Support
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Support Hours</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Phone Support:</span>
                  <span className="font-semibold text-gray-900">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Live Chat:</span>
                  <span className="font-semibold text-gray-900">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Email Support:</span>
                  <span className="font-semibold text-gray-900">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Office Hours:</span>
                  <span className="font-semibold text-gray-900">Mon-Fri 9AM-6PM</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-600">
                  <strong>Average Response Times:</strong><br />
                  • Phone: Immediate<br />
                  • Live Chat: 2-5 minutes<br />
                  • Email: 2-4 hours<br />
                  • Contact Form: 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Contacted Departments</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Support</h3>
              <p className="text-gray-700 mb-3">
                Our customer support team is available 24/7 to assist with booking inquiries, modifications, 
                cancellations, and general questions about our services. We're committed to providing prompt 
                and helpful responses to ensure your experience with JustRichard is seamless.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Best for:</strong> Booking help, account issues, service questions<br />
                <strong>Email:</strong> support@justrichard.com<br />
                <strong>Phone:</strong> +66 2 123 4567
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Support</h3>
              <p className="text-gray-700 mb-3">
                Experiencing technical difficulties with our website or mobile app? Our technical team 
                is here to help resolve any issues with login problems, payment processing, or platform functionality. 
                We work quickly to ensure you can access our services without interruption.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Best for:</strong> Website issues, app problems, payment errors<br />
                <strong>Email:</strong> tech@justrichard.com<br />
                <strong>Phone:</strong> +66 2 123 4568
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Partnerships & Business</h3>
              <p className="text-gray-700 mb-3">
                Interested in partnering with JustRichard? Whether you're a service provider looking to join 
                our platform, a business seeking corporate solutions, or exploring collaboration opportunities, 
                our partnerships team is ready to discuss how we can work together.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Best for:</strong> Service provider applications, corporate accounts, collaborations<br />
                <strong>Email:</strong> partnerships@justrichard.com<br />
                <strong>Phone:</strong> +66 2 123 4569
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Media & Press</h3>
              <p className="text-gray-700 mb-3">
                For media inquiries, press releases, interview requests, or information about JustRichard 
                for publication purposes, please contact our media relations team. We're happy to provide 
                information, statements, and arrange interviews with our leadership team.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Best for:</strong> Press inquiries, media requests, interviews<br />
                <strong>Email:</strong> press@justrichard.com<br />
                <strong>Phone:</strong> +66 2 123 4570
              </p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Connect With Us on Social Media</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Follow us for updates, travel tips, special offers, and customer stories. 
            We're active on all major social platforms and love engaging with our community!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://facebook.com/justrichard" target="_blank" rel="noopener noreferrer" 
               className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors">
              📘 Facebook
            </a>
            <a href="https://instagram.com/justrichard" target="_blank" rel="noopener noreferrer"
               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-lg font-semibold transition-colors">
              📸 Instagram
            </a>
            <a href="https://twitter.com/justrichard" target="_blank" rel="noopener noreferrer"
               className="bg-sky-500 hover:bg-sky-600 px-6 py-3 rounded-lg font-semibold transition-colors">
              🐦 Twitter
            </a>
            <a href="https://linkedin.com/company/justrichard" target="_blank" rel="noopener noreferrer"
               className="bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-lg font-semibold transition-colors">
              💼 LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
