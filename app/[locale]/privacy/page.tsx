export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Privacy Policy</h1>
            <p className="text-gray-600">Last Updated: November 21, 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="mb-4">
                At JustRichard, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Platform, including our website and mobile applications. We understand the importance of data privacy and comply with applicable data protection laws in Thailand, the United Arab Emirates, and international regulations including GDPR where applicable.
              </p>
              <p className="mb-4">
                By using the JustRichard Platform, you consent to the data practices described in this Privacy Policy. If you do not agree with our policies and practices, please do not use our Platform. We may update this Privacy Policy from time to time, and we will notify you of any material changes through email or a prominent notice on our Platform.
              </p>
              <p className="mb-4">
                This Privacy Policy applies to all users of our Platform, including those who browse without creating an account, registered users, service providers, and business partners. We encourage you to read this policy carefully to understand how we handle your personal information.
              </p>
            </section>

            {/* Information Collection */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Information You Provide Directly</h3>
              <p className="mb-4">
                We collect information that you voluntarily provide when using our Platform:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Account Information:</strong> Name, email address, phone number, date of birth, profile photo, and password when you create an account.</li>
                <li><strong>Booking Information:</strong> Travel dates, preferences, special requests, and guest information when making reservations.</li>
                <li><strong>Payment Information:</strong> Credit card details, billing address, and payment history (processed securely through our payment partners).</li>
                <li><strong>Identity Verification:</strong> Government-issued ID, driver's license, passport information for certain services requiring verification.</li>
                <li><strong>Communications:</strong> Messages, reviews, ratings, and feedback you provide through our Platform.</li>
                <li><strong>Profile Information:</strong> Preferences, interests, and saved favorites to personalize your experience.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Information Collected Automatically</h3>
              <p className="mb-4">
                When you access our Platform, we automatically collect certain information:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers, and mobile network information.</li>
                <li><strong>Usage Data:</strong> Pages viewed, time spent on pages, links clicked, search queries, and browsing patterns.</li>
                <li><strong>Location Data:</strong> Approximate location based on IP address, and precise location if you grant permission on mobile devices.</li>
                <li><strong>Cookies and Tracking:</strong> We use cookies, web beacons, and similar technologies to track user activity and preferences.</li>
                <li><strong>Log Data:</strong> Server logs including access times, error messages, and system activity.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Information from Third Parties</h3>
              <p className="mb-4">
                We may receive information about you from third-party sources:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Social Media:</strong> If you connect your account with social media platforms, we receive basic profile information.</li>
                <li><strong>Service Providers:</strong> Information from our service providers regarding completed bookings and service quality.</li>
                <li><strong>Business Partners:</strong> Data from partners who help us provide services or market our Platform.</li>
                <li><strong>Public Sources:</strong> Publicly available information to verify identity and prevent fraud.</li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">
                We use the collected information for the following purposes:
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Service Provision</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Process and manage your bookings and reservations</li>
                <li>Facilitate communication between you and service providers</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send booking confirmations, updates, and service-related notifications</li>
                <li>Process payments and prevent fraudulent transactions</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Platform Improvement</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Analyze usage patterns to improve Platform functionality and user experience</li>
                <li>Develop new features and services based on user feedback</li>
                <li>Conduct research and analytics to understand user preferences</li>
                <li>Test and troubleshoot technical issues</li>
                <li>Optimize search results and recommendations</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Marketing and Communications</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Send promotional offers, newsletters, and marketing communications (with your consent)</li>
                <li>Personalize content and recommendations based on your preferences</li>
                <li>Conduct surveys and request feedback on our services</li>
                <li>Inform you about new services, features, and special offers</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.4 Security and Legal Compliance</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Verify identity and prevent fraud, abuse, and unauthorized access</li>
                <li>Enforce our Terms of Service and other policies</li>
                <li>Comply with legal obligations and respond to lawful requests</li>
                <li>Protect the rights, property, and safety of JustRichard, users, and the public</li>
                <li>Resolve disputes and investigate complaints</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Share Your Information</h2>
              <p className="mb-4">
                We may share your information in the following circumstances:
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Service Providers</h3>
              <p className="mb-4">
                We share necessary information with service providers (car rental companies, yacht operators, property owners) to fulfill your bookings. They receive only the information needed to provide the service and are contractually obligated to protect your data.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Business Partners</h3>
              <p className="mb-4">
                We may share aggregated or anonymized data with business partners for analytics, marketing, and business development purposes. This data cannot be used to identify you personally.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Payment Processors</h3>
              <p className="mb-4">
                Payment information is shared with secure payment processors (Stripe, PayPal) to process transactions. We do not store complete credit card information on our servers.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.4 Legal Requirements</h3>
              <p className="mb-4">
                We may disclose your information if required by law, court order, or government request, or if we believe disclosure is necessary to protect our rights, prevent fraud, or ensure safety.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.5 Business Transfers</h3>
              <p className="mb-4">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity, subject to the same privacy protections.
              </p>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Encryption:</strong> All data transmission is encrypted using SSL/TLS protocols</li>
                <li><strong>Secure Storage:</strong> Personal data is stored on secure servers with restricted access</li>
                <li><strong>Access Controls:</strong> Only authorized personnel have access to personal information</li>
                <li><strong>Regular Audits:</strong> We conduct regular security audits and vulnerability assessments</li>
                <li><strong>Incident Response:</strong> We have procedures in place to respond to data breaches promptly</li>
              </ul>
              <p className="mb-4">
                However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of your account credentials.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Privacy Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                <li><strong>Objection:</strong> Object to processing of your information for certain purposes</li>
                <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
                <li><strong>Withdrawal of Consent:</strong> Withdraw consent for marketing communications at any time</li>
              </ul>
              <p className="mb-4">
                To exercise these rights, please contact us at privacy@justrichard.com. We will respond to your request within 30 days.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to enhance your experience:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for Platform functionality and security</li>
                <li><strong>Performance Cookies:</strong> Help us understand how users interact with our Platform</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Track your activity to deliver personalized advertisements</li>
              </ul>
              <p className="mb-4">
                You can control cookies through your browser settings. However, disabling certain cookies may limit Platform functionality.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
              <p className="mb-4">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Specifically:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Account information: Retained while your account is active and for 2 years after account closure</li>
                <li>Booking history: Retained for 7 years for tax and legal compliance</li>
                <li>Payment information: Retained according to payment processor policies and legal requirements</li>
                <li>Marketing data: Retained until you unsubscribe or request deletion</li>
                <li>Log data: Retained for 90 days for security and troubleshooting purposes</li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="mb-4">
                Our Platform is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child without parental consent, we will take steps to delete that information promptly.
              </p>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Data Transfers</h2>
              <p className="mb-4">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards, including standard contractual clauses approved by relevant authorities.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="mb-4">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> privacy@justrichard.com</li>
                <li><strong>Phone:</strong> +66 2 123 4567 (Thailand) | +971 4 123 4567 (UAE)</li>
                <li><strong>Address:</strong> Data Protection Officer, JustRichard, Bangkok, Thailand</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
