'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  Star,
  Award,
  CheckCircle,
  Clock,
  DollarSign,
  Calendar,
  Video,
  Users,
  Briefcase,
  GraduationCap,
  Shield,
  Languages,
  Building2,
  X,
} from 'lucide-react';

interface Doctor {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  title: string;
  gender: string;
  photo: string | null;
  specialty: string;
  subSpecialties: string[];
  yearsOfExperience: number;
  education: string[];
  certifications: string[];
  languages: string[];
  clinicName: string | null;
  clinicAddress: string | null;
  consultationFee: number;
  acceptsInsurance: boolean;
  insuranceProviders: string[];
  workingDays: string[];
  workingHours: { start: string; end: string };
  consultationDuration: number;
  services: string[];
  treatmentAreas: string[];
  phone: string;
  email: string;
  whatsapp: string | null;
  website: string | null;
  rating: number;
  reviewCount: number;
  totalPatients: number;
  totalAppointments: number;
  isVerified: boolean;
  isPremium: boolean;
  acceptsOnlineBooking: boolean;
  acceptsVideoConsult: boolean;
  City: { name: string };
  Country: { name: string };
}

export default function DoctorDetailPage() {
  const params = useParams();
  const locale = params.locale as string;
  const slug = params.slug as string;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    fetchDoctor();
  }, [slug]);

  const fetchDoctor = async () => {
    try {
      const response = await fetch(`/api/doctors/${slug}`);
      const data = await response.json();
      setDoctor(data);
    } catch (error) {
      console.error('Error fetching doctor:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading doctor profile...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctor not found</h2>
          <Link href={`/${locale}/doctors`} className="text-blue-600 hover:underline">
            Back to doctors list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href={`/${locale}/doctors`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Doctors
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-6 mb-6">
                <div className="text-8xl flex-shrink-0">{doctor.photo}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {doctor.title} {doctor.firstName} {doctor.lastName}
                      </h1>
                      <p className="text-xl text-blue-600 font-medium mb-1">{doctor.specialty}</p>
                      <p className="text-gray-600">{doctor.yearsOfExperience} years of experience</p>
                    </div>
                    {doctor.isPremium && <Award className="w-8 h-8 text-yellow-500" />}
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {doctor.isVerified && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                        <CheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    )}
                    {doctor.acceptsVideoConsult && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                        <Video className="w-4 h-4" />
                        Video Consultation
                      </span>
                    )}
                    {doctor.acceptsInsurance && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                        Accepts Insurance
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="text-xl font-bold text-gray-900">{doctor.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600">{doctor.reviewCount} Reviews</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                        <Users className="w-5 h-5" />
                        <span className="text-xl font-bold text-gray-900">{doctor.totalPatients}</span>
                      </div>
                      <p className="text-sm text-gray-600">Patients</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                        <Calendar className="w-5 h-5" />
                        <span className="text-xl font-bold text-gray-900">{doctor.totalAppointments}</span>
                      </div>
                      <p className="text-sm text-gray-600">Appointments</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
                        <DollarSign className="w-5 h-5" />
                        <span className="text-xl font-bold text-gray-900">{doctor.consultationFee}</span>
                      </div>
                      <p className="text-sm text-gray-600">AED</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-Specialties */}
            {doctor.subSpecialties && doctor.subSpecialties.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Sub-Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {doctor.subSpecialties.map((sub, index) => (
                    <span key={index} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                Education
              </h2>
              <ul className="space-y-3">
                {doctor.education.map((edu, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-purple-600" />
                Certifications
              </h2>
              <div className="flex flex-wrap gap-3">
                {doctor.certifications.map((cert, index) => (
                  <span key={index} className="px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 rounded-lg font-medium">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-green-600" />
                Services Offered
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {doctor.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment Areas */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Treatment Areas</h2>
              <div className="flex flex-wrap gap-2">
                {doctor.treatmentAreas.map((area, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Insurance */}
            {doctor.acceptsInsurance && doctor.insuranceProviders.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Accepted Insurance</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {doctor.insuranceProviders.map((provider, index) => (
                    <div key={index} className="px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center font-medium">
                      {provider}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Booking Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Book Appointment</h3>
                
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg mb-4 flex items-center justify-center gap-2 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  Book Now
                </button>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{doctor.consultationDuration} minutes consultation</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>{doctor.consultationFee} AED per visit</span>
                  </div>
                </div>
              </div>

              {/* Clinic Info */}
              {doctor.clinicName && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Clinic
                  </h3>
                  <p className="font-medium text-gray-900 mb-2">{doctor.clinicName}</p>
                  <div className="flex items-start gap-2 text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{doctor.clinicAddress}</span>
                  </div>
                  <p className="text-sm text-gray-600">{doctor.City.name}, {doctor.Country.name}</p>
                </div>
              )}

              {/* Working Hours */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Working Hours</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Days:</span> {doctor.workingDays.join(', ')}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Hours:</span> {doctor.workingHours.start} - {doctor.workingHours.end}
                  </p>
                </div>
              </div>

              {/* Languages */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-purple-600" />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((lang, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href={`tel:${doctor.phone}`} className="text-blue-600 hover:underline text-sm">
                      {doctor.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${doctor.email}`} className="text-blue-600 hover:underline text-sm">
                      {doctor.email}
                    </a>
                  </div>
                  {doctor.whatsapp && (
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-gray-400" />
                      <a
                        href={`https://wa.me/${doctor.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        WhatsApp
                      </a>
                    </div>
                  )}
                  {doctor.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <a
                        href={`https://${doctor.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Book with {doctor.title} {doctor.lastName}
                </h3>
                <p className="text-gray-600 mb-6">
                  {doctor.specialty} • {doctor.consultationFee} AED
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  To complete your booking, please contact us directly:
                </p>
                <div className="space-y-3">
                  <a
                    href={`tel:${doctor.phone}`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    Call {doctor.phone}
                  </a>
                  {doctor.whatsapp && (
                    <a
                      href={`https://wa.me/${doctor.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      WhatsApp
                    </a>
                  )}
                  <a
                    href={`mailto:${doctor.email}`}
                    className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
