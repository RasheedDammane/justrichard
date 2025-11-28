'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  Clock,
  Video,
  CheckCircle,
  Award,
  Heart,
  DollarSign,
  Users,
} from 'lucide-react';

interface Doctor {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  title: string;
  photo: string | null;
  specialty: string;
  subSpecialties: string[];
  yearsOfExperience: number;
  clinicName: string | null;
  clinicAddress: string | null;
  consultationFee: number;
  acceptsInsurance: boolean;
  acceptsOnlineBooking: boolean;
  acceptsVideoConsult: boolean;
  rating: number;
  reviewCount: number;
  totalPatients: number;
  isVerified: boolean;
  isPremium: boolean;
  languages: string[];
  City: { name: string };
  Country: { name: string };
}

export default function DoctorsPage() {
  const params = useParams();
  const locale = params.locale as string;

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedConsultationType, setSelectedConsultationType] = useState('all');
  const [acceptsInsurance, setAcceptsInsurance] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [searchTerm, selectedSpecialty, selectedConsultationType, acceptsInsurance, doctors]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('/api/doctors');
      const data = await response.json();
      setDoctors(data);
      setFilteredDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDoctors = () => {
    let filtered = [...doctors];

    if (searchTerm) {
      filtered = filtered.filter(
        (d) =>
          `${d.firstName} ${d.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.clinicName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter((d) => d.specialty === selectedSpecialty);
    }

    if (selectedConsultationType === 'video') {
      filtered = filtered.filter((d) => d.acceptsVideoConsult);
    } else if (selectedConsultationType === 'in-person') {
      filtered = filtered.filter((d) => d.acceptsOnlineBooking);
    }

    if (acceptsInsurance) {
      filtered = filtered.filter((d) => d.acceptsInsurance);
    }

    setFilteredDoctors(filtered);
  };

  const specialties = Array.from(new Set(doctors.map((d) => d.specialty))).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find & Book Top Doctors in Dubai
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Book appointments with verified doctors online. Video consultations available.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{doctors.length}+</div>
                <div className="text-sm text-blue-100">Verified Doctors</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{specialties.length}+</div>
                <div className="text-sm text-blue-100">Specialties</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-blue-100">Online Booking</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">
                  {doctors.filter((d) => d.acceptsVideoConsult).length}+
                </div>
                <div className="text-sm text-blue-100">Video Consult</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by doctor name, specialty, or clinic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>

            {/* Specialty Filter (Desktop) */}
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="hidden md:block px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Specialties</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>

            {/* Consultation Type Filter (Desktop) */}
            <select
              value={selectedConsultationType}
              onChange={(e) => setSelectedConsultationType(e.target.value)}
              className="hidden md:block px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="in-person">In-Person</option>
              <option value="video">Video Consultation</option>
            </select>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden mt-4 space-y-3 pb-4">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="all">All Specialties</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              <select
                value={selectedConsultationType}
                onChange={(e) => setSelectedConsultationType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="all">All Types</option>
                <option value="in-person">In-Person</option>
                <option value="video">Video Consultation</option>
              </select>
              <label className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={acceptsInsurance}
                  onChange={(e) => setAcceptsInsurance(e.target.checked)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">Accepts Insurance</span>
              </label>
            </div>
          )}

          {/* Desktop Insurance Filter */}
          <div className="hidden md:flex items-center gap-4 mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={acceptsInsurance}
                onChange={(e) => setAcceptsInsurance(e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Accepts Insurance</span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredDoctors.length} Doctors Found
          </h2>
          <p className="text-gray-600">
            {selectedSpecialty !== 'all' && `in ${selectedSpecialty} `}
            {selectedConsultationType !== 'all' && `offering ${selectedConsultationType} consultations`}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading doctors...</p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  {/* Doctor Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-6xl flex-shrink-0">{doctor.photo}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link
                            href={`/${locale}/doctors/${doctor.slug}`}
                            className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                          >
                            {doctor.title} {doctor.firstName} {doctor.lastName}
                          </Link>
                          <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                          <p className="text-sm text-gray-600">{doctor.yearsOfExperience} years experience</p>
                        </div>
                        {doctor.isPremium && (
                          <Award className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {doctor.isVerified && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                    {doctor.acceptsVideoConsult && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        <Video className="w-3 h-3" />
                        Video Consult
                      </span>
                    )}
                    {doctor.acceptsInsurance && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        Insurance
                      </span>
                    )}
                    {doctor.acceptsOnlineBooking && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                        <Calendar className="w-3 h-3" />
                        Online Booking
                      </span>
                    )}
                  </div>

                  {/* Clinic Info */}
                  {doctor.clinicName && (
                    <div className="mb-4 pb-4 border-b">
                      <p className="text-sm text-gray-600 mb-1">Clinic:</p>
                      <p className="font-medium text-gray-900">{doctor.clinicName}</p>
                      <div className="flex items-center gap-1 text-gray-600 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{doctor.City.name}</span>
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-1 text-yellow-500 mb-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-semibold text-gray-900">{doctor.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">{doctor.reviewCount} reviews</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-blue-600 mb-1">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-semibold text-gray-900">{doctor.totalPatients}</span>
                      </div>
                      <p className="text-xs text-gray-500">Patients</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-green-600 mb-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm font-semibold text-gray-900">{doctor.consultationFee}</span>
                      </div>
                      <p className="text-xs text-gray-500">AED</p>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Languages:</p>
                    <p className="text-sm text-gray-700">{doctor.languages.join(', ')}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href={`/${locale}/doctors/${doctor.slug}`}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      View Profile & Book
                    </Link>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
