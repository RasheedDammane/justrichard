'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, Building2, CheckCircle, Mail, Phone, Upload, 
  ArrowRight, ArrowLeft, MapPin, Globe, Facebook, 
  Instagram, Twitter, Linkedin, Youtube, Star 
} from 'lucide-react';
import GooglePlacesAutocomplete from '@/components/GooglePlacesAutocomplete';

interface Business {
  placeId: string;
  name: string;
  address: string;
  vicinity?: string;
  location: { lat: number; lng: number };
  types: string[];
  category?: string;
  businessStatus?: string;
  rating?: number;
  userRatingsTotal?: number;
  priceLevel?: number;
  photos?: any[];
  phone?: string;
  internationalPhone?: string;
  website?: string;
  plusCode?: string;
  openingHours?: any;
  addressComponents?: {
    streetNumber?: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    countryCode?: string;
    postalCode?: string;
  };
  services?: {
    delivery?: boolean;
    dineIn?: boolean;
    takeout?: boolean;
    reservable?: boolean;
  };
  wheelchairAccessible?: boolean;
  icon?: string;
}

interface ClaimData {
  business?: Business;
  claimantName: string;
  claimantEmail: string;
  claimantPhone: string;
  claimantRole: string;
  verificationMethod: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
  };
}

export default function ClaimBusinessPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [claimData, setClaimData] = useState<ClaimData>({
    claimantName: '',
    claimantEmail: '',
    claimantPhone: '',
    claimantRole: 'Owner',
    verificationMethod: 'email',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: '',
    },
  });

  const handleSelectBusiness = (business: Business) => {
    setClaimData({ ...claimData, business });
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!claimData.business || !claimData.claimantName || !claimData.claimantEmail) {
      alert('Please fill all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const business = claimData.business;
      
      const res = await fetch('/api/business-claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Business Info
          googlePlaceId: business.placeId || null,
          businessName: business.name,
          address: business.address,
          city: business.addressComponents?.city,
          state: business.addressComponents?.state,
          country: business.addressComponents?.country,
          countryCode: business.addressComponents?.countryCode,
          postalCode: business.addressComponents?.postalCode,
          phone: business.phone,
          internationalPhone: business.internationalPhone,
          website: business.website,
          category: business.category,
          businessStatus: business.businessStatus,
          
          // Location
          latitude: business.location?.lat,
          longitude: business.location?.lng,
          vicinity: business.vicinity,
          plusCode: business.plusCode,
          
          // Horaires
          openingHours: business.openingHours,
          
          // Ratings
          rating: business.rating,
          userRatingsTotal: business.userRatingsTotal,
          priceLevel: business.priceLevel,
          
          // Services
          delivery: business.services?.delivery,
          dineIn: business.services?.dineIn,
          takeout: business.services?.takeout,
          reservable: business.services?.reservable,
          wheelchairAccessible: business.wheelchairAccessible,
          
          // Photos
          photos: business.photos || [],
          icon: business.icon,
          
          // Social Media
          facebook: claimData.socialMedia.facebook,
          instagram: claimData.socialMedia.instagram,
          twitter: claimData.socialMedia.twitter,
          linkedin: claimData.socialMedia.linkedin,
          youtube: claimData.socialMedia.youtube,
          
          // Google Data
          googleData: business,
          
          // Claimant Info
          claimantName: claimData.claimantName,
          claimantEmail: claimData.claimantEmail,
          claimantPhone: claimData.claimantPhone,
          claimantRole: claimData.claimantRole,
          verificationMethod: claimData.verificationMethod,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStep(4); // Success step
      } else {
        alert(data.error || 'Failed to submit claim');
      }
    } catch (error) {
      console.error('Error submitting claim:', error);
      alert('Failed to submit claim');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Building2 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Claim Your Business
          </h1>
          <p className="text-lg text-gray-600">
            Take control of your business listing in 3 easy steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step >= s 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {step > s ? <CheckCircle className="w-6 h-6" /> : s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step > s ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">Find Business</span>
            <span className="text-sm text-gray-600">Your Info</span>
            <span className="text-sm text-gray-600">Verify</span>
          </div>
        </div>

        {/* Step 1: Search Business */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Find Your Business
            </h2>
            <p className="text-gray-600 mb-6">
              Search for your business using Google Places. We'll automatically fill in the details.
            </p>
            
            <GooglePlacesAutocomplete
              onSelect={handleSelectBusiness}
              placeholder="Search for your business (e.g., 'Starbucks Dubai Mall')"
              className="mb-6"
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>💡 Tip:</strong> Type your business name and location for best results.
                If you can't find your business, you can add it manually in the next step.
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Business Details & Claimant Info */}
        {step === 2 && claimData.business && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Confirm Business Details
            </h2>

            {/* Business Preview */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Building2 className="h-12 w-12 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {claimData.business.name}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{claimData.business.address}</span>
                    </div>
                    {claimData.business.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{claimData.business.phone}</span>
                      </div>
                    )}
                    {claimData.business.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <a 
                          href={claimData.business.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {claimData.business.website}
                        </a>
                      </div>
                    )}
                    {claimData.business.rating && (
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>
                          {claimData.business.rating} ({claimData.business.userRatingsTotal} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                  {claimData.business.placeId && (
                    <code className="text-xs font-mono text-gray-500 mt-2 block">
                      Google Place ID: {claimData.business.placeId}
                    </code>
                  )}
                </div>
              </div>
            </div>

            {/* Claimant Information */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Your Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={claimData.claimantName}
                  onChange={(e) => setClaimData({ ...claimData, claimantName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={claimData.claimantEmail}
                  onChange={(e) => setClaimData({ ...claimData, claimantEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={claimData.claimantPhone}
                  onChange={(e) => setClaimData({ ...claimData, claimantPhone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+971 50 123 4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Role *
                </label>
                <select
                  value={claimData.claimantRole}
                  onChange={(e) => setClaimData({ ...claimData, claimantRole: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Owner">Owner</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Authorized Employee</option>
                </select>
              </div>
            </div>

            {/* Social Media (Optional) */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Social Media (Optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-blue-600" />
                  Facebook
                </label>
                <input
                  type="url"
                  value={claimData.socialMedia.facebook}
                  onChange={(e) => setClaimData({ 
                    ...claimData, 
                    socialMedia: { ...claimData.socialMedia, facebook: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://facebook.com/yourbusiness"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-pink-600" />
                  Instagram
                </label>
                <input
                  type="url"
                  value={claimData.socialMedia.instagram}
                  onChange={(e) => setClaimData({ 
                    ...claimData, 
                    socialMedia: { ...claimData.socialMedia, instagram: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://instagram.com/yourbusiness"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-blue-400" />
                  Twitter
                </label>
                <input
                  type="url"
                  value={claimData.socialMedia.twitter}
                  onChange={(e) => setClaimData({ 
                    ...claimData, 
                    socialMedia: { ...claimData.socialMedia, twitter: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://twitter.com/yourbusiness"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-blue-700" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={claimData.socialMedia.linkedin}
                  onChange={(e) => setClaimData({ 
                    ...claimData, 
                    socialMedia: { ...claimData.socialMedia, linkedin: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://linkedin.com/company/yourbusiness"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!claimData.claimantName || !claimData.claimantEmail}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Continue
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Verification Method */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Choose Verification Method
            </h2>
            <p className="text-gray-600 mb-8">
              We need to verify that you're authorized to claim this business.
            </p>

            <div className="space-y-4 mb-8">
              <label className="flex items-start gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="radio"
                  name="verification"
                  value="email"
                  checked={claimData.verificationMethod === 'email'}
                  onChange={(e) => setClaimData({ ...claimData, verificationMethod: e.target.value })}
                  className="mt-1"
                />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Email Verification</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    We'll send a verification code to your email address.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="radio"
                  name="verification"
                  value="phone"
                  checked={claimData.verificationMethod === 'phone'}
                  onChange={(e) => setClaimData({ ...claimData, verificationMethod: e.target.value })}
                  className="mt-1"
                />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Phone Verification</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    We'll send a verification code via SMS to your phone number.
                  </p>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between pt-6 border-t">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitting ? 'Submitting...' : 'Submit Claim'}
                <CheckCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Claim Submitted Successfully!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We've sent a verification {claimData.verificationMethod === 'email' ? 'email' : 'SMS'} to{' '}
                <strong>
                  {claimData.verificationMethod === 'email' 
                    ? claimData.claimantEmail 
                    : claimData.claimantPhone}
                </strong>
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
              <ul className="text-sm text-blue-800 text-left space-y-2">
                <li>✓ Check your {claimData.verificationMethod === 'email' ? 'email inbox' : 'phone'} for the verification code</li>
                <li>✓ Our team will review your claim within 24-48 hours</li>
                <li>✓ Once approved, you'll get full access to manage your business listing</li>
              </ul>
            </div>

            <button
              onClick={() => router.push('/en')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
