'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Plus, Trash2 } from 'lucide-react';

interface YachtFormProps {
  locale: string;
  yacht?: any;
}

export default function YachtForm({ locale, yacht }: YachtFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // Parse JSON arrays from yacht data
  const parseJsonArray = (data: any) => Array.isArray(data) ? data : [];
  const parseJsonObject = (data: any) => (data && typeof data === 'object') ? data : {};

  const [specializations, setSpecializations] = useState<string[]>(parseJsonArray(yacht?.specializations));
  const [tags, setTags] = useState<string[]>(parseJsonArray(yacht?.tags));
  const [languages, setLanguages] = useState<string[]>(parseJsonArray(yacht?.languages));
  const [certifications, setCertifications] = useState<string[]>(parseJsonArray(yacht?.certifications));
  const [achievements, setAchievements] = useState<string[]>(parseJsonArray(yacht?.achievements));
  const [availableDays, setAvailableDays] = useState<string[]>(parseJsonArray(yacht?.availableDays));
  const [yachtingFormats, setYachtingFormats] = useState<string[]>(parseJsonArray(yacht?.yachtingFormats));
  const [targetAudience, setTargetAudience] = useState<string[]>(parseJsonArray(yacht?.targetAudience));
  const [clientLevels, setClientLevels] = useState<string[]>(parseJsonArray(yacht?.clientLevels));
  
  // Complex objects states
  const [programs, setPrograms] = useState<any[]>(parseJsonArray(yacht?.programs));
  const [education, setEducation] = useState<any[]>(parseJsonArray(yacht?.education));
  const [packagePricing, setPackagePricing] = useState<any[]>(parseJsonArray(yacht?.packagePricing));
  const [locations, setLocations] = useState<any[]>(parseJsonArray(yacht?.locations));
  const [workingHours, setWorkingHours] = useState<any>(parseJsonObject(yacht?.workingHours) || { start: '06:00', end: '21:00' });
  const [bookingTypes, setBookingTypes] = useState<string[]>(parseJsonArray(yacht?.bookingTypes));
  
  const [formData, setFormData] = useState({
    name: yacht?.name || '',
    slug: yacht?.slug || '',
    title: yacht?.title || '',
    bio: yacht?.bio || '',
    mainCategory: yacht?.mainCategory || '',
    experience: yacht?.experience || 0,
    sessionFee: yacht?.sessionFee || '',
    hourlyRate: yacht?.hourlyRate || '',
    currency: yacht?.currency || 'THB',
    cityId: yacht?.cityId || '',
    countryId: yacht?.countryId || '',
    email: yacht?.email || '',
    phone: yacht?.phone || '',
    website: yacht?.website || '',
    instagram: yacht?.instagram || '',
    facebook: yacht?.facebook || '',
    image: yacht?.image || '',
    video: yacht?.video || '',
    totalClients: yacht?.totalClients || 0,
    successRate: yacht?.successRate || '',
    rating: yacht?.rating || '',
    isActive: yacht?.isActive ?? true,
    isFeatured: yacht?.isFeatured ?? false,
    isVerified: yacht?.isVerified ?? true,
    isAvailable: yacht?.isAvailable ?? true,
    acceptsOnline: yacht?.acceptsOnline ?? true,
    acceptsInPerson: yacht?.acceptsInPerson ?? true,
    metaTitle: yacht?.metaTitle || '',
    metaDescription: yacht?.metaDescription || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = yacht 
        ? `/api/admin/yachts/${yacht.id}` 
        : '/api/admin/yachts';
      
      const method = yacht ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          experience: parseInt(formData.experience as any) || 0,
          sessionFee: formData.sessionFee ? parseFloat(formData.sessionFee as any) : null,
          hourlyRate: formData.hourlyRate ? parseFloat(formData.hourlyRate as any) : null,
          totalClients: parseInt(formData.totalClients as any) || 0,
          successRate: formData.successRate ? parseFloat(formData.successRate as any) : null,
          rating: formData.rating ? parseFloat(formData.rating as any) : null,
          // Use state arrays
          specializations,
          tags,
          languages,
          certifications,
          achievements,
          availableDays,
          yachtingFormats,
          targetAudience,
          clientLevels,
          programs,
          education,
          packagePricing,
          locations,
          workingHours,
          bookingTypes,
        }),
      });

      if (response.ok) {
        router.push(`/${locale}/admin/yachts`);
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to save yacht');
      }
    } catch (error) {
      console.error('Error saving yacht:', error);
      alert('Error saving yacht');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Certified Personal Trainer"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Main Category <span className="text-red-500">*</span>
            </label>
            <select
              name="mainCategory"
              value={formData.mainCategory}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              <option value="fitness_yachting">Fitness Yachting</option>
              <option value="sport_yachting">Sport Yachting</option>
              <option value="nutrition_yachting">Nutrition Yachting</option>
              <option value="wellness_yachting">Wellness Yachting</option>
              <option value="life_yachting">Life Yachting</option>
              <option value="business_yachting">Business Yachting</option>
              <option value="career_yachting">Career Yachting</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience (years) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Clients
            </label>
            <input
              type="number"
              name="totalClients"
              value={formData.totalClients}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Specializations & Tags */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">🎯 Specializations & Tags</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Specializations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specializations
            </label>
            <div className="space-y-2">
              {['MMA', 'Boxing', 'Muay Thai', 'BJJ', 'Wrestling', 'Judo', 'Karate', 'Taekwondo', 'Kickboxing'].map((spec) => (
                <label key={spec} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={specializations.includes(spec)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSpecializations([...specializations, spec]);
                      } else {
                        setSpecializations(specializations.filter(s => s !== spec));
                      }
                    }}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{spec}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  #{tag}
                  <button
                    type="button"
                    onClick={() => setTags(tags.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add tag (e.g., fight prep)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const value = (e.target as HTMLInputElement).value.trim();
                    if (value && !tags.includes(value)) {
                      setTags([...tags, value]);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Press Enter to add tag</p>
          </div>
        </div>
      </div>

      {/* Programs Offered */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">📋 Programs Offered</h3>
        
        <div className="space-y-3">
          {programs.map((program, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-gray-900">Program {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => setPrograms(programs.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Program name"
                  value={program.name || ''}
                  onChange={(e) => {
                    const newPrograms = [...programs];
                    newPrograms[index] = { ...program, name: e.target.value };
                    setPrograms(newPrograms);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="Duration (e.g., 12 weeks)"
                  value={program.duration || ''}
                  onChange={(e) => {
                    const newPrograms = [...programs];
                    newPrograms[index] = { ...program, duration: e.target.value };
                    setPrograms(newPrograms);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="Focus area"
                  value={program.focus || ''}
                  onChange={(e) => {
                    const newPrograms = [...programs];
                    newPrograms[index] = { ...program, focus: e.target.value };
                    setPrograms(newPrograms);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => setPrograms([...programs, { name: '', duration: '', focus: '' }])}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Program
          </button>
        </div>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">🎓 Education</h3>
        
        <div className="space-y-3">
          {education.map((edu, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-blue-50">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-gray-900">Education {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => setEducation(education.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Degree/Certificate"
                  value={edu.degree || ''}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index] = { ...edu, degree: e.target.value };
                    setEducation(newEducation);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="Institution"
                  value={edu.institution || ''}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index] = { ...edu, institution: e.target.value };
                    setEducation(newEducation);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={edu.year || ''}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index] = { ...edu, year: e.target.value };
                    setEducation(newEducation);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => setEducation([...education, { degree: '', institution: '', year: '' }])}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Education
          </button>
        </div>
      </div>

      {/* Certifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">📜 Certifications</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Certifications
          </label>
          <div className="space-y-2 mb-3">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                <span className="flex-1 text-sm text-gray-700">✓ {cert}</span>
                <button
                  type="button"
                  onClick={() => setCertifications(certifications.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add certification"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const value = (e.target as HTMLInputElement).value.trim();
                  if (value) {
                    setCertifications([...certifications, value]);
                    (e.target as HTMLInputElement).value = '';
                  }
                }
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Press Enter to add</p>
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">🏆 Achievements</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Achievements
          </label>
          <div className="space-y-2 mb-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-2 bg-yellow-50 p-2 rounded">
                <span className="flex-1 text-sm text-gray-700">★ {achievement}</span>
                <button
                  type="button"
                  onClick={() => setAchievements(achievements.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add achievement"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const value = (e.target as HTMLInputElement).value.trim();
                  if (value) {
                    setAchievements([...achievements, value]);
                    (e.target as HTMLInputElement).value = '';
                  }
                }
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Press Enter to add</p>
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">🌍 Languages</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Languages Spoken
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['English', 'Thai', 'French', 'Spanish', 'German', 'Chinese', 'Japanese', 'Arabic'].map((lang) => (
              <label key={lang} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={languages.includes(lang)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setLanguages([...languages, lang]);
                    } else {
                      setLanguages(languages.filter(l => l !== lang));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{lang}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Yachting Formats & Target Audience */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">📋 Yachting Formats & Target Audience</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Yachting Formats */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Yachting Formats
            </label>
            <div className="space-y-2">
              {['In Person', 'Online', 'Private Session', 'Group Class', 'Semi-Private', 'Workshop'].map((format) => (
                <label key={format} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={yachtingFormats.includes(format)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setYachtingFormats([...yachtingFormats, format]);
                      } else {
                        setYachtingFormats(yachtingFormats.filter(f => f !== format));
                      }
                    }}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{format}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Audience
            </label>
            <div className="space-y-2">
              {['Men', 'Women', 'Athletes', 'Teenagers', 'Kids', 'Seniors', 'Beginners', 'Professionals'].map((audience) => (
                <label key={audience} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={targetAudience.includes(audience)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTargetAudience([...targetAudience, audience]);
                      } else {
                        setTargetAudience(targetAudience.filter(a => a !== audience));
                      }
                    }}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{audience}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Client Levels */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Client Levels
          </label>
          <div className="flex flex-wrap gap-4">
            {['Beginner', 'Intermediate', 'Advanced', 'Professional', 'Elite'].map((level) => (
              <label key={level} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={clientLevels.includes(level)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setClientLevels([...clientLevels, level]);
                    } else {
                      setClientLevels(clientLevels.filter(l => l !== level));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Pricing</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Session Fee
            </label>
            <input
              type="number"
              name="sessionFee"
              value={formData.sessionFee}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hourly Rate
            </label>
            <input
              type="number"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="THB">THB</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="AED">AED</option>
            </select>
          </div>
        </div>

        {/* Package Pricing */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📦 Package Pricing
          </label>
          <div className="space-y-3">
            {packagePricing.map((pkg, index) => (
              <div key={index} className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-gray-900">Package {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => setPackagePricing(packagePricing.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Package name"
                    value={pkg.name || ''}
                    onChange={(e) => {
                      const newPackages = [...packagePricing];
                      newPackages[index] = { ...pkg, name: e.target.value };
                      setPackagePricing(newPackages);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={pkg.price || ''}
                    onChange={(e) => {
                      const newPackages = [...packagePricing];
                      newPackages[index] = { ...pkg, price: parseFloat(e.target.value) || 0 };
                      setPackagePricing(newPackages);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Sessions (optional)"
                    value={pkg.sessions || ''}
                    onChange={(e) => {
                      const newPackages = [...packagePricing];
                      newPackages[index] = { ...pkg, sessions: e.target.value ? parseInt(e.target.value) : undefined };
                      setPackagePricing(newPackages);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => setPackagePricing([...packagePricing, { name: '', price: 0, sessions: undefined }])}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-500 hover:text-purple-500 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Package
            </button>
          </div>
        </div>
      </div>

      {/* Availability & Schedule */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">⏰ Availability & Schedule</h3>
        
        {/* Available Days */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Days
          </label>
          <div className="flex flex-wrap gap-3">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <label key={day} className="flex items-center space-x-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={availableDays.includes(day)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAvailableDays([...availableDays, day]);
                    } else {
                      setAvailableDays(availableDays.filter(d => d !== day));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">{day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ⏰ Working Hours
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={workingHours.start || '06:00'}
                onChange={(e) => setWorkingHours({ ...workingHours, start: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                End Time
              </label>
              <input
                type="time"
                value={workingHours.end || '21:00'}
                onChange={(e) => setWorkingHours({ ...workingHours, end: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        {/* Booking Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📅 Booking Types
          </label>
          <div className="flex flex-wrap gap-3">
            {['Instant', 'Request', 'Consultation', 'Trial Session', 'Assessment'].map((type) => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer bg-orange-50 px-4 py-2 rounded-lg border border-orange-200 hover:bg-orange-100">
                <input
                  type="checkbox"
                  checked={bookingTypes.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setBookingTypes([...bookingTypes, type]);
                    } else {
                      setBookingTypes(bookingTypes.filter(t => t !== type));
                    }
                  }}
                  className="w-4 h-4 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
                />
                <span className="text-sm font-medium text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Training Locations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">📍 Training Locations</h3>
        
        <div className="space-y-3">
          {locations.map((location, index) => (
            <div key={index} className="border border-green-200 rounded-lg p-4 bg-green-50">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-gray-900">Location {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => setLocations(locations.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <select
                    value={location.type || 'Gym'}
                    onChange={(e) => {
                      const newLocations = [...locations];
                      newLocations[index] = { ...location, type: e.target.value };
                      setLocations(newLocations);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="Gym">🏋️ Gym</option>
                    <option value="Studio">🎯 Studio</option>
                    <option value="Outdoor">🌳 Outdoor</option>
                    <option value="Online">💻 Online</option>
                    <option value="Home">🏠 Home Visit</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Location name"
                    value={location.name || ''}
                    onChange={(e) => {
                      const newLocations = [...locations];
                      newLocations[index] = { ...location, name: e.target.value };
                      setLocations(newLocations);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder={location.type === 'Online' ? 'Platform (e.g., Zoom / Google Meet)' : 'Address'}
                  value={location.address || location.platform || ''}
                  onChange={(e) => {
                    const newLocations = [...locations];
                    if (location.type === 'Online') {
                      newLocations[index] = { ...location, platform: e.target.value };
                      delete newLocations[index].address;
                    } else {
                      newLocations[index] = { ...location, address: e.target.value };
                      delete newLocations[index].platform;
                    }
                    setLocations(newLocations);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => setLocations([...locations, { type: 'Gym', name: '', address: '' }])}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-500 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Location
          </button>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instagram
            </label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="@username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facebook
            </label>
            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Media</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video URL
            </label>
            <input
              type="url"
              name="video"
              value={formData.video}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Location</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="cityId"
              value={formData.cityId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="countryId"
              value={formData.countryId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Success Rate (%)
            </label>
            <input
              type="number"
              name="successRate"
              value={formData.successRate}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">SEO</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Title
            </label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Description
            </label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Status Toggles */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Status</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Active</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Featured</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="isVerified"
              checked={formData.isVerified}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Verified</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Available</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="acceptsOnline"
              checked={formData.acceptsOnline}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Accepts Online</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="acceptsInPerson"
              checked={formData.acceptsInPerson}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Accepts In-Person</span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 pt-6 border-t">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : 'Save Yacht'}
        </button>
      </div>
    </form>
  );
}
