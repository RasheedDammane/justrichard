import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            About CommunityHub
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-6">
              CommunityHub is your trusted platform connecting you with verified professionals and services across multiple countries.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              We aim to simplify your life by providing easy access to quality services and trusted professionals. Whether you're looking for real estate agents, accountants, translators, or any other professional service, we've got you covered.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">What We Offer</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Verified professionals across 15+ categories</li>
              <li>Services in multiple countries (UAE, Philippines, Thailand, and more)</li>
              <li>Support for 9 languages</li>
              <li>Easy booking and communication</li>
              <li>Transparent pricing and reviews</li>
              <li>24/7 customer support</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">🛡️ Trust & Safety</h3>
                <p className="text-gray-700">All professionals are verified and vetted for your peace of mind.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">⭐ Quality</h3>
                <p className="text-gray-700">We maintain high standards to ensure excellent service delivery.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">🌍 Accessibility</h3>
                <p className="text-gray-700">Available in 9 languages across multiple countries.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">💬 Support</h3>
                <p className="text-gray-700">Our team is always here to help you.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> contact@communityhub.com
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Phone:</strong> +971 4 123 4567
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> Dubai, United Arab Emirates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
