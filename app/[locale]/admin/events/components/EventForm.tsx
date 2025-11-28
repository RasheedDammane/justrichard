'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Save, X, Plus, Trash2, DollarSign, Users, MapPin } from 'lucide-react';

interface EventFormProps {
  locale: string;
  initialData?: any;
  isEdit?: boolean;
  categories?: any[];
  cities?: any[];
}

export default function EventForm({ locale, initialData, isEdit = false, categories = [], cities = [] }: EventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    shortDescription: initialData?.shortDescription || '',
    coverImage: initialData?.coverImage || '',
    categoryId: initialData?.categoryId || '',
    eventType: initialData?.eventType || 'conference',
    startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().slice(0, 16) : '',
    endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().slice(0, 16) : '',
    locationType: initialData?.locationType || 'physical',
    venueName: initialData?.venueName || '',
    venueAddress: initialData?.venueAddress || '',
    cityId: initialData?.cityId || '',
    meetingUrl: initialData?.meetingUrl || '',
    capacity: initialData?.capacity || '',
    isFree: initialData?.isFree !== undefined ? initialData.isFree : true,
    isPaid: initialData?.isPaid || false,
    ticketPrice: initialData?.ticketPrice || '',
    currency: initialData?.currency || 'AED',
    dressCode: initialData?.dressCode || '',
    organizerName: initialData?.organizerName || '',
    organizerEmail: initialData?.organizerEmail || '',
    organizerPhone: initialData?.organizerPhone || '',
    organizerWebsite: initialData?.organizerWebsite || '',
    requiresApproval: initialData?.requiresApproval || false,
    maxAttendees: initialData?.maxAttendees || '',
    registrationDeadline: initialData?.registrationDeadline ? new Date(initialData.registrationDeadline).toISOString().slice(0, 16) : '',
    // New fields
    tags: initialData?.tags || '',
    ageRestriction: initialData?.ageRestriction || '',
    language: initialData?.language || 'English',
    videoUrl: initialData?.videoUrl || '',
    refundPolicy: initialData?.refundPolicy || '',
    latitude: initialData?.latitude || '',
    longitude: initialData?.longitude || '',
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
    status: initialData?.status || 'draft',
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
    isFeatured: initialData?.isFeatured || false,
  });

  // Dynamic arrays
  const [highlights, setHighlights] = useState<string[]>(initialData?.highlights || []);
  const [faqItems, setFaqItems] = useState<{question: string; answer: string}[]>(initialData?.faq || []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEdit && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, isEdit]);

  // Toggle isPaid when isFree changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      isPaid: !prev.isFree
    }));
  }, [formData.isFree]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEdit 
        ? `/api/events/${initialData.id}`
        : '/api/events';
      
      const method = isEdit ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
        ticketPrice: formData.ticketPrice ? parseFloat(formData.ticketPrice) : null,
        maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : null,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        registrationDeadline: formData.registrationDeadline ? new Date(formData.registrationDeadline) : null,
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save event');
      }

      router.push(`/${locale}/admin/events`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">
            {isEdit ? 'Edit Event' : 'Create New Event'}
          </h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Event Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Tech Conference 2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Slug *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="tech-conference-2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Short Description</label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Brief description (max 160 characters)"
            maxLength={160}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Detailed description of the event..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cover Image URL</label>
          <input
            type="url"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      {/* Date & Time */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Date & Time</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date & Time *</label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Date & Time *</label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Registration Deadline</label>
            <input
              type="datetime-local"
              name="registrationDeadline"
              value={formData.registrationDeadline}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Location
        </h2>
        
        <div>
          <label className="block text-sm font-medium mb-1">Location Type *</label>
          <select
            name="locationType"
            value={formData.locationType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="physical">Physical</option>
            <option value="online">Online</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        {(formData.locationType === 'physical' || formData.locationType === 'hybrid') && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Venue Name</label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Dubai World Trade Centre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <select
                  name="cityId"
                  value={formData.cityId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select city...</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Venue Address</label>
              <input
                type="text"
                name="venueAddress"
                value={formData.venueAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Full address"
              />
            </div>
          </>
        )}

        {(formData.locationType === 'online' || formData.locationType === 'hybrid') && (
          <div>
            <label className="block text-sm font-medium mb-1">Meeting URL</label>
            <input
              type="url"
              name="meetingUrl"
              value={formData.meetingUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://zoom.us/j/..."
            />
          </div>
        )}
      </div>

      {/* Pricing & Capacity */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Pricing & Capacity
        </h2>
        
        <div className="flex items-center gap-6 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFree"
              checked={formData.isFree}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm font-medium">Free Event</span>
          </label>
        </div>

        {!formData.isFree && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ticket Price *</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  onChange={handleChange}
                  required={!formData.isFree}
                  min="0"
                  step="0.01"
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="AED">AED</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Maximum attendees"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Max Attendees</label>
            <input
              type="number"
              name="maxAttendees"
              value={formData.maxAttendees}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Registration limit"
            />
          </div>
        </div>
      </div>

      {/* Organizer Information */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Organizer Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Organizer Name</label>
            <input
              type="text"
              name="organizerName"
              value={formData.organizerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Company or person name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Organizer Email</label>
            <input
              type="email"
              name="organizerEmail"
              value={formData.organizerEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="contact@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Organizer Phone</label>
            <input
              type="tel"
              name="organizerPhone"
              value={formData.organizerPhone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="+971 50 123 4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Organizer Website</label>
            <input
              type="url"
              name="organizerWebsite"
              value={formData.organizerWebsite}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Event Type</label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
              <option value="seminar">Seminar</option>
              <option value="networking">Networking</option>
              <option value="exhibition">Exhibition</option>
              <option value="concert">Concert</option>
              <option value="sports">Sports</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Dress Code</label>
            <select
              name="dressCode"
              value={formData.dressCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">None specified</option>
              <option value="casual">Casual</option>
              <option value="business-casual">Business Casual</option>
              <option value="business">Business</option>
              <option value="formal">Formal</option>
              <option value="black-tie">Black Tie</option>
            </select>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="requiresApproval"
              checked={formData.requiresApproval}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm font-medium">Requires Approval for Registration</span>
          </label>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">SEO</h2>
        
        <div>
          <label className="block text-sm font-medium mb-1">Meta Title</label>
          <input
            type="text"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="SEO title (max 60 characters)"
            maxLength={60}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Meta Description</label>
          <textarea
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="SEO description (max 160 characters)"
            maxLength={160}
          />
        </div>
      </div>

      {/* Status */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Status</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Publication Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm font-medium">Active</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm font-medium">Featured</span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
        >
          <X className="w-5 h-5" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          {loading ? 'Saving...' : isEdit ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
}
