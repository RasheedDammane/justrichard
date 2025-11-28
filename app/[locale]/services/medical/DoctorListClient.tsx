'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MapPin, Star, Briefcase, Award } from 'lucide-react';

interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  slug: string;
  specialty: string;
  bio: string | null;
  photo: string | null;
  yearsOfExperience: number | null;
  consultationFee: number | null;
  cityId: string;
  countryId: string;
  languages: any;
  isPremium: boolean;
  rating: number;
}

export default function DoctorListClient({ doctors, locale }: { doctors: Doctor[]; locale: string }) {
  const [filters, setFilters] = useState({
    search: '',
    specialty: '',
  });

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesName = `${doc.firstName} ${doc.lastName}`.toLowerCase().includes(searchLower);
        const matchesBio = doc.bio?.toLowerCase().includes(searchLower);
        if (!matchesName && !matchesBio) return false;
      }

      // Specialty filter
      if (filters.specialty && doc.specialty !== filters.specialty) return false;

      return true;
    });
  }, [doctors, filters]);

  const formatLanguages = (langs: any) => {
    if (!langs || !Array.isArray(langs)) return '';
    return langs.map((l: string) => l.toUpperCase()).join(' · ');
  };

  return (
    <div className="space-y-8">
      {/* Simple Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <select
            value={filters.specialty}
            onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Specialties</option>
            <option value="GENERAL_PRACTITIONER">General Practitioner</option>
            <option value="CARDIOLOGIST">Cardiologist</option>
            <option value="DERMATOLOGIST">Dermatologist</option>
            <option value="PEDIATRICIAN">Pediatrician</option>
            <option value="PSYCHIATRIST">Psychiatrist</option>
            <option value="DENTIST">Dentist</option>
            <option value="OPHTHALMOLOGIST">Ophthalmologist</option>
            <option value="GYNECOLOGIST">Gynecologist</option>
            <option value="ORTHOPEDIST">Orthopedist</option>
            <option value="NEUROLOGIST">Neurologist</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          <span className="font-semibold text-gray-900">{filteredDoctors.length}</span> doctor{filteredDoctors.length > 1 ? 's' : ''} found
        </p>
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No doctors match your criteria</p>
          <button
            onClick={() => setFilters({ search: '', specialty: '' })}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <Link key={doctor.id} href={`/${locale}/doctors/${doctor.slug}`} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 text-center">
                {doctor.photo ? (
                  <img src={doctor.photo} alt={`${doctor.firstName} ${doctor.lastName}`} className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-4 border-white" />
                ) : (
                  <div className="w-24 h-24 rounded-full mx-auto mb-3 bg-white/20 flex items-center justify-center text-4xl">👨‍⚕️</div>
                )}
                <h3 className="text-xl font-bold mb-1">Dr. {doctor.firstName} {doctor.lastName}</h3>
                <p className="text-green-100 text-sm">{doctor.specialty.replace(/_/g, ' ')}</p>
                {doctor.isPremium && (
                  <div className="mt-2">
                    <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-semibold">⭐ Premium</span>
                  </div>
                )}
              </div>

              {/* Profile Details */}
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  {doctor.yearsOfExperience && (
                    <div className="flex items-start">
                      <Award className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-gray-500">Experience</div>
                        <div className="font-semibold text-gray-900 text-sm">{doctor.yearsOfExperience}+ years</div>
                      </div>
                    </div>
                  )}

                  {doctor.consultationFee && (
                    <div className="flex items-start">
                      <Briefcase className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-gray-500">Consultation Fee</div>
                        <div className="font-semibold text-gray-900 text-sm">{doctor.consultationFee} AED</div>
                      </div>
                    </div>
                  )}

                  {doctor.languages && (
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-gray-500">Languages</div>
                        <div className="font-semibold text-gray-900 text-sm">{formatLanguages(doctor.languages)}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start">
                    <Star className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500">Rating</div>
                      <div className="font-semibold text-gray-900 text-sm">{doctor.rating.toFixed(1)} ⭐</div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                {doctor.bio && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{doctor.bio}</p>
                )}

                {/* CTA */}
                <div className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-center">
                  View Profile
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
