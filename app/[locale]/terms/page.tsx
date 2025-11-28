export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Terms of Service</h1>
            <p className="text-gray-600">Last Updated: November 21, 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction and Acceptance</h2>
              <p className="mb-4">
                Welcome to JustRichard, your trusted platform for discovering and booking premium services across Thailand and the UAE. These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "you", or "your") and JustRichard ("we", "us", or "our") governing your access to and use of our platform, including our website, mobile applications, and all related services (collectively, the "Platform").
              </p>
              <p className="mb-4">
                By accessing or using the JustRichard Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy and any additional terms and conditions that may apply to specific services offered through our Platform. If you do not agree with any part of these Terms, you must immediately discontinue use of our Platform.
              </p>
              <p className="mb-4">
                JustRichard operates as a comprehensive marketplace connecting users with verified service providers across multiple categories including luxury car rentals, yacht charters, property rentals, airport transfers, and various lifestyle services. Our Platform facilitates transactions between users and service providers but does not directly provide the underlying services unless explicitly stated.
              </p>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Platform Services</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Service Categories</h3>
              <p className="mb-4">
                JustRichard provides access to the following service categories:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Luxury Car Rentals:</strong> Premium vehicle rentals including sports cars, SUVs, and luxury sedans with flexible rental periods and comprehensive insurance options.</li>
                <li><strong>Yacht Charters:</strong> Private yacht bookings for various occasions, ranging from intimate gatherings to large events, with experienced crew and customizable itineraries.</li>
                <li><strong>Property Rentals:</strong> Short-term and long-term accommodation options including condos, villas, apartments, and serviced residences in prime locations.</li>
                <li><strong>Airport Transfers:</strong> Reliable transportation services between airports and destinations with professional drivers and various vehicle options.</li>
                <li><strong>Lifestyle Services:</strong> Additional premium services including event planning, concierge services, and personalized experiences.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Service Provider Verification</h3>
              <p className="mb-4">
                We implement a rigorous verification process for all service providers on our Platform. This includes verification of business licenses, insurance coverage, safety certifications, and customer reviews. However, while we strive to ensure quality and reliability, JustRichard acts as an intermediary and does not guarantee the quality, safety, or legality of services provided by third-party providers. Users are encouraged to conduct their own due diligence and report any concerns immediately.
              </p>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Responsibilities</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Account Registration</h3>
              <p className="mb-4">
                To access certain features of our Platform, you must create an account by providing accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account or any other breach of security.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 User Eligibility</h3>
              <p className="mb-4">
                You must be at least 18 years old to use our Platform and book services. For certain services such as car rentals, additional age requirements and valid driver's licenses may apply. By using our Platform, you represent and warrant that you meet all eligibility requirements and have the legal capacity to enter into binding contracts.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Prohibited Activities</h3>
              <p className="mb-4">
                Users are strictly prohibited from:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Using the Platform for any illegal or unauthorized purpose</li>
                <li>Impersonating any person or entity or falsely stating your affiliation</li>
                <li>Interfering with or disrupting the Platform's functionality</li>
                <li>Attempting to gain unauthorized access to any portion of the Platform</li>
                <li>Using automated systems or software to extract data from the Platform</li>
                <li>Posting or transmitting any harmful, threatening, or offensive content</li>
                <li>Engaging in fraudulent activities or payment disputes without valid cause</li>
              </ul>
            </section>

            {/* Bookings and Payments */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Bookings, Payments, and Cancellations</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Booking Process</h3>
              <p className="mb-4">
                When you make a booking through our Platform, you are entering into a contract directly with the service provider. JustRichard facilitates this transaction but is not a party to the contract. All bookings are subject to availability and confirmation by the service provider. We reserve the right to refuse or cancel any booking at our discretion.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Pricing and Payment</h3>
              <p className="mb-4">
                All prices displayed on our Platform are in the currency specified (THB for Thailand, AED for UAE) and include applicable taxes unless otherwise stated. Prices are subject to change without notice until booking confirmation. Payment must be made through our secure payment gateway using accepted payment methods including credit cards, debit cards, and digital wallets. Additional fees may apply for certain payment methods.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Cancellation and Refund Policy</h3>
              <p className="mb-4">
                Cancellation policies vary by service provider and service type. Standard cancellation terms are:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Car Rentals:</strong> Free cancellation up to 48 hours before pickup; 50% refund for cancellations within 24-48 hours; no refund for cancellations within 24 hours.</li>
                <li><strong>Yacht Charters:</strong> Free cancellation up to 7 days before charter date; 50% refund for cancellations within 3-7 days; no refund for cancellations within 72 hours.</li>
                <li><strong>Properties:</strong> Cancellation policy varies by property; typically free cancellation up to 7 days before check-in.</li>
                <li><strong>Transfers:</strong> Free cancellation up to 24 hours before scheduled pickup; 50% refund for cancellations within 12-24 hours.</li>
              </ul>
              <p className="mb-4">
                Refunds will be processed within 7-14 business days to the original payment method. Service fees and processing charges are non-refundable.
              </p>
            </section>

            {/* Liability */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Liability and Disclaimers</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Platform Disclaimer</h3>
              <p className="mb-4">
                The Platform is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. JustRichard does not warrant that the Platform will be uninterrupted, error-free, or free from viruses or other harmful components. We do not guarantee the accuracy, completeness, or reliability of any content on the Platform.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Limitation of Liability</h3>
              <p className="mb-4">
                To the maximum extent permitted by law, JustRichard shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Platform or services booked through the Platform. Our total liability for any claims shall not exceed the amount paid by you for the specific service giving rise to the claim.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.3 Third-Party Services</h3>
              <p className="mb-4">
                JustRichard is not responsible for the actions, omissions, or services provided by third-party service providers. Any disputes regarding service quality, safety, or performance should be addressed directly with the service provider. However, we encourage users to report any issues to our customer support team for assistance and documentation.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property Rights</h2>
              <p className="mb-4">
                All content on the JustRichard Platform, including but not limited to text, graphics, logos, images, software, and design elements, is the property of JustRichard or its licensors and is protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
              </p>
              <p className="mb-4">
                Users retain ownership of content they submit to the Platform (such as reviews and photos) but grant JustRichard a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content for the purpose of operating and promoting the Platform.
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Modifications to Terms</h2>
              <p className="mb-4">
                JustRichard reserves the right to modify these Terms at any time. We will notify users of material changes via email or through a prominent notice on the Platform. Your continued use of the Platform after such modifications constitutes acceptance of the updated Terms. We recommend reviewing these Terms periodically to stay informed of any changes.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Governing Law and Dispute Resolution</h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of Thailand and the United Arab Emirates, depending on the jurisdiction where services are provided. Any disputes arising from these Terms or your use of the Platform shall be resolved through binding arbitration in accordance with the rules of the respective jurisdiction's arbitration authority.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
              <p className="mb-4">
                For questions or concerns regarding these Terms of Service, please contact us:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> legal@justrichard.com</li>
                <li><strong>Phone:</strong> +66 2 123 4567 (Thailand) | +971 4 123 4567 (UAE)</li>
                <li><strong>Address:</strong> Bangkok, Thailand | Dubai, UAE</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
