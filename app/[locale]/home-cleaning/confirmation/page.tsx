export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold mb-4 text-gray-900">Booking Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for choosing our cleaning services
          </p>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
            <h2 className="font-bold text-lg mb-3 text-blue-900">What happens next?</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <p className="text-gray-700">You'll receive a confirmation email with all booking details</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <p className="text-gray-700">Our team will contact you 24 hours before the appointment</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <p className="text-gray-700">Our professional cleaners will arrive at the scheduled time</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-3xl mb-2">📧</div>
              <p className="text-sm text-gray-600">Check your email</p>
              <p className="font-semibold">Confirmation sent</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-3xl mb-2">📱</div>
              <p className="text-sm text-gray-600">We'll call you</p>
              <p className="font-semibold">24h before service</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/en/home-cleaning"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Book Another Service
            </a>
            <a
              href="/en"
              className="px-8 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Need help or have questions?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <a href="tel:+971XXXXXXXX" className="text-blue-600 hover:underline font-semibold">
                📞 +971 XX XXX XXXX
              </a>
              <a href="mailto:support@justrichard.com" className="text-blue-600 hover:underline font-semibold">
                ✉️ support@justrichard.com
              </a>
              <a href="https://wa.me/971XXXXXXXX" className="text-blue-600 hover:underline font-semibold">
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
