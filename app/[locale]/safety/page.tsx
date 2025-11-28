import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Safety Guidelines | JustRichard - Your Safety is Our Priority',
  description: 'Comprehensive safety guidelines for using JustRichard platform. Learn about verified professionals, secure payments, privacy protection, and emergency procedures.',
};

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Safety Guidelines</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your safety and security are our top priorities. Learn how we protect you and what you can do to stay safe while using JustRichard.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-4 border-blue-600 pb-3 inline-block">Our Commitment to Your Safety</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                At JustRichard, we understand that trust is the foundation of our marketplace. Whether you're booking a doctor's appointment, renting a luxury yacht, hiring a lawyer, or finding a domestic worker, your safety and peace of mind matter to us. We've implemented comprehensive safety measures and guidelines to ensure every interaction on our platform is secure, transparent, and reliable.
              </p>
              <p className="mb-4">
                This comprehensive guide outlines our safety protocols, verification processes, and best practices to help you make informed decisions and protect yourself throughout your experience with JustRichard. We continuously update our safety measures to address emerging risks and maintain the highest standards of security for our community.
              </p>
            </div>
          </section>

          {/* Verified Professionals */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-4 border-green-600 pb-3 inline-block">Verified Professionals & Background Checks</h2>
            <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6 rounded-r-lg">
              <p className="text-green-900 font-semibold mb-2">✓ All service providers undergo rigorous verification</p>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                Every professional on JustRichard goes through a multi-step verification process before they can offer their services. This includes identity verification, professional credential checks, and background screening where applicable. For medical professionals such as doctors and dentists, we verify their medical licenses, board certifications, and professional affiliations with relevant medical councils.
              </p>
              <p className="mb-4">
                Legal professionals including lawyers must provide proof of their bar association membership and good standing. Service providers in sensitive categories such as domestic workers, coaches, and childcare providers undergo enhanced background checks including criminal record verification and reference checks from previous employers.
              </p>
              <p className="mb-4">
                Our verification badges indicate the level of verification completed. A blue checkmark means basic identity verification, while a gold shield indicates enhanced verification with professional credentials and background checks. Always look for these badges when selecting a service provider.
              </p>
            </div>
          </section>

          {/* Secure Payments */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-4 border-purple-600 pb-3 inline-block">Secure Payment Protection</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="font-bold text-lg mb-3 text-purple-900">🔒 Encrypted Transactions</h3>
                <p className="text-gray-700">All payments are processed through industry-leading encrypted payment gateways including Stripe and PayPal, ensuring your financial information is never exposed.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="font-bold text-lg mb-3 text-purple-900">💳 Secure Payment Methods</h3>
                <p className="text-gray-700">We support major credit cards, debit cards, and digital wallets. Your payment details are tokenized and never stored on our servers.</p>
              </div>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                Never make payments outside the JustRichard platform. Our secure payment system protects both customers and service providers by holding funds in escrow until services are completed satisfactorily. This ensures you only pay for services you receive and provides recourse in case of disputes.
              </p>
              <p className="mb-4">
                If a service provider asks you to pay via cash, wire transfer, or any method outside our platform, report this immediately to our safety team. Such requests violate our terms of service and may indicate fraudulent activity. We monitor all transactions for suspicious patterns and employ advanced fraud detection systems to protect your financial security.
              </p>
            </div>
          </section>

          {/* Privacy & Data Protection */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-4 border-indigo-600 pb-3 inline-block">Privacy & Data Protection</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                Your personal information is protected by enterprise-grade security measures and strict privacy policies. We comply with international data protection regulations including GDPR and implement encryption both in transit and at rest. Your data is stored on secure servers with multiple redundancy layers and regular security audits.
              </p>
              <p className="mb-4">
                We never share your personal information with third parties without your explicit consent, except as required by law. Service providers only receive the minimum information necessary to provide their services. Your contact details, payment information, and personal data remain confidential and are protected by our comprehensive privacy policy.
              </p>
              <p className="mb-4">
                You have full control over your data. You can review, update, or delete your personal information at any time through your account settings. We also provide transparency reports detailing any data requests from authorities and our responses to such requests.
              </p>
            </div>
          </section>

          {/* Communication Safety */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-4 border-orange-600 pb-3 inline-block">Safe Communication Practices</h2>
            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-6 rounded-r-lg">
              <p className="text-orange-900 font-semibold">⚠️ Important: Keep all communications within the JustRichard platform</p>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                Our in-platform messaging system is monitored for safety and provides a record of all communications. This protects both parties and helps resolve any disputes that may arise. Avoid sharing personal contact information such as phone numbers, email addresses, or social media profiles until you've established trust and verified the legitimacy of the service provider.
              </p>
              <p className="mb-4">
                Be cautious of service providers who pressure you to communicate outside the platform or make immediate decisions. Legitimate professionals understand the importance of following proper procedures and will respect your need to verify their credentials and take time to make informed decisions.
              </p>
              <p className="mb-4">
                Never share sensitive personal information such as passport numbers, social security numbers, or financial account details through messaging. JustRichard staff will never ask for your password or payment information through messages. If you receive such requests, report them immediately as they are likely phishing attempts.
              </p>
            </div>
          </section>

          {/* Meeting Safety */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-4 border-red-600 pb-3 inline-block">In-Person Meeting Safety</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                When meeting service providers in person, whether at their office, your home, or another location, follow these essential safety guidelines. For first meetings, consider choosing public locations or professional offices. For home services such as domestic workers, handymen, or coaches, inform a trusted friend or family member about the appointment including the time, location, and service provider's details.
              </p>
              <p className="mb-4">
                Trust your instincts. If something feels wrong or uncomfortable, it's okay to reschedule or cancel. Legitimate professionals will understand and respect your concerns. For medical appointments, verify the clinic or hospital address and ensure it matches the information provided in the professional's profile.
              </p>
              <p className="mb-4">
                When renting vehicles, yachts, or properties, inspect them thoroughly before making payment. Take photos or videos of the condition, check all safety equipment, and verify that all promised amenities are present and functional. For yacht rentals, ensure life jackets and safety equipment are available and in good condition.
              </p>
            </div>
          </section>

          {/* Reviews & Ratings */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-4 border-yellow-600 pb-3 inline-block">Reviews & Ratings System</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                Our review system is a powerful tool for maintaining quality and safety. All reviews are verified to come from actual customers who have completed transactions. We employ sophisticated algorithms to detect and prevent fake reviews, ensuring the ratings you see reflect genuine experiences.
              </p>
              <p className="mb-4">
                Before booking any service, carefully read recent reviews paying attention to comments about professionalism, punctuality, quality of service, and any safety concerns. Look for patterns in reviews rather than focusing on single extreme opinions. Service providers with consistently high ratings and positive feedback are generally more reliable.
              </p>
              <p className="mb-4">
                After receiving a service, please leave an honest review. Your feedback helps other users make informed decisions and encourages service providers to maintain high standards. Be specific about your experience, both positive and negative aspects, to provide valuable information to the community.
              </p>
            </div>
          </section>

          {/* Emergency Procedures */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-4 border-red-700 pb-3 inline-block">Emergency Procedures & Support</h2>
            <div className="bg-red-50 border-2 border-red-600 p-6 mb-6 rounded-lg">
              <h3 className="font-bold text-xl mb-3 text-red-900">🚨 In Case of Emergency</h3>
              <p className="text-red-900 mb-2">• Call local emergency services (Police: 999, Ambulance: 998)</p>
              <p className="text-red-900 mb-2">• Contact JustRichard Safety Team: +971-XX-XXX-XXXX (24/7)</p>
              <p className="text-red-900">• Report through the app's emergency button</p>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                Our dedicated safety team is available 24/7 to handle urgent safety concerns. If you experience or witness any dangerous, threatening, or illegal behavior, contact us immediately. We take all safety reports seriously and investigate them promptly with appropriate action taken against violators including permanent bans from the platform.
              </p>
              <p className="mb-4">
                For non-emergency safety concerns such as suspicious profiles, inappropriate messages, or policy violations, use our in-app reporting feature. Provide as much detail as possible including screenshots, dates, and descriptions of the incident. All reports are confidential and we protect the identity of reporters.
              </p>
            </div>
          </section>

          {/* Red Flags */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-4 border-pink-600 pb-3 inline-block">Warning Signs & Red Flags</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-600">
                <p className="text-pink-900 font-semibold">🚩 Requests for off-platform payment</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-600">
                <p className="text-pink-900 font-semibold">🚩 Pressure to make immediate decisions</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-600">
                <p className="text-pink-900 font-semibold">🚩 Prices significantly below market rate</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-600">
                <p className="text-pink-900 font-semibold">🚩 Refusal to provide credentials</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-600">
                <p className="text-pink-900 font-semibold">🚩 Incomplete or suspicious profiles</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-600">
                <p className="text-pink-900 font-semibold">🚩 Requests for excessive personal information</p>
              </div>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                Be alert to these warning signs and report any suspicious behavior immediately. Scammers often use urgency tactics, offer deals that seem too good to be true, or try to move conversations off the platform. Trust your instincts and don't hesitate to walk away from situations that make you uncomfortable.
              </p>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-4 border-blue-600 pb-3 inline-block">Your Safety is a Shared Responsibility</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                While we implement robust safety measures and continuously monitor our platform, your safety also depends on following these guidelines and exercising good judgment. Stay informed, be cautious, and don't hesitate to reach out to our support team with any questions or concerns.
              </p>
              <p className="mb-4">
                Together, we can maintain JustRichard as a safe, trusted marketplace where customers and service providers can connect with confidence. Thank you for being part of our community and helping us keep everyone safe.
              </p>
            </div>
          </section>

          {/* Contact */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-4">Need Help or Have Safety Concerns?</h3>
            <p className="mb-6 text-blue-100">Our safety team is here to help 24/7</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="/en/contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Contact Safety Team
              </a>
              <a href="/en/help" className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                Visit Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
