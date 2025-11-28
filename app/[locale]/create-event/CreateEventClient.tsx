'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, DollarSign, Plus, Trash2, Tag, Video, Globe } from 'lucide-react';

interface CreateEventClientProps {
  locale: string;
  categories: any[];
  cities: any[];
  user: any;
}

export default function CreateEventClient({ locale, categories, cities, user }: CreateEventClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    categoryId: '',
    eventType: 'conference',
    startDate: '',
    endDate: '',
    locationType: 'physical',
    venueName: '',
    venueAddress: '',
    cityId: '',
    meetingUrl: '',
    capacity: '',
    isFree: true,
    ticketPrice: '',
    currency: 'AED',
    tags: '',
    ageRestriction: '',
    language: 'English',
    videoUrl: '',
    refundPolicy: '',
    organizerName: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : '',
    organizerEmail: user?.email || '',
    organizerPhone: '',
  });

  const [highlights, setHighlights] = useState<string[]>(['']);
  const [faqItems, setFaqItems] = useState<{question: string; answer: string}[]>([
    { question: '', answer: '' }
  ]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addHighlight = () => setHighlights([...highlights, '']);
  const removeHighlight = (index: number) => setHighlights(highlights.filter((_, i) => i !== index));
  const updateHighlight = (index: number, value: string) => {
    const updated = [...highlights];
    updated[index] = value;
    setHighlights(updated);
  };

  const addFaq = () => setFaqItems([...faqItems, { question: '', answer: '' }]);
  const removeFaq = (index: number) => setFaqItems(faqItems.filter((_, i) => i !== index));
  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqItems];
    updated[index][field] = value;
    setFaqItems(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
        ticketPrice: formData.ticketPrice ? parseFloat(formData.ticketPrice) : null,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        highlights: highlights.filter(h => h.trim()),
        faq: faqItems.filter(f => f.question.trim() && f.answer.trim()),
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
        status: 'draft', // Always draft for user-created events
        isPaid: !formData.isFree,
      };

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to create event');

      const event = await response.json();
      router.push(`/${locale}/events/${event.slug}`);
    } catch (error) {
      console.error(error);
      alert('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Basic Info' },
    { number: 2, title: 'Date & Location' },
    { number: 3, title: 'Tickets & Pricing' },
    { number: 4, title: 'Additional Details' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= step.number ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step.number}
              </div>
              <div className="text-xs mt-2 text-center">{step.title}</div>
            </div>
            {index < steps.length - 1 && (
              <div className={`h-1 flex-1 ${currentStep > step.number ? 'bg-purple-600' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Basic Information</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Event Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Tech Conference Dubai 2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Event Type</label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
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
            <label className="block text-sm font-medium mb-2">Short Description</label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              maxLength={160}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Brief description (max 160 characters)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Detailed description of your event..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., technology, AI, networking"
            />
          </div>
        </div>
      )}

      {/* Step 2: Date & Location */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Date & Location</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Start Date & Time *</label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Date & Time *</label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location Type *</label>
            <select
              name="locationType"
              value={formData.locationType}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="physical">Physical</option>
              <option value="online">Online</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {(formData.locationType === 'physical' || formData.locationType === 'hybrid') && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Venue Name</label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Dubai World Trade Centre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Venue Address</label>
                <input
                  type="text"
                  name="venueAddress"
                  value={formData.venueAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Full address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <select
                  name="cityId"
                  value={formData.cityId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select city...</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {(formData.locationType === 'online' || formData.locationType === 'hybrid') && (
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Meeting URL
              </label>
              <input
                type="url"
                name="meetingUrl"
                value={formData.meetingUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="https://zoom.us/j/..."
              />
            </div>
          )}
        </div>
      )}

      {/* Step 3: Tickets & Pricing */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Tickets & Pricing</h2>
          
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isFree"
                checked={formData.isFree}
                onChange={handleChange}
                className="w-5 h-5 text-purple-600 rounded"
              />
              <span className="font-medium">This is a free event</span>
            </label>
          </div>

          {!formData.isFree && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ticket Price *</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={handleChange}
                    required={!formData.isFree}
                    min="0"
                    step="0.01"
                    className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="AED">AED</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Capacity (Max Attendees)</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Leave empty for unlimited"
            />
          </div>

          {!formData.isFree && (
            <div>
              <label className="block text-sm font-medium mb-2">Refund Policy</label>
              <textarea
                name="refundPolicy"
                value={formData.refundPolicy}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Describe your refund policy..."
              />
            </div>
          )}
        </div>
      )}

      {/* Step 4: Additional Details */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Additional Details</h2>
          
          {/* Event Highlights */}
          <div>
            <label className="block text-sm font-medium mb-2">Event Highlights</label>
            {highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => updateHighlight(index, e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Keynote speakers, Networking opportunities"
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addHighlight}
              className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg"
            >
              <Plus className="w-5 h-5" />
              Add Highlight
            </button>
          </div>

          {/* FAQ */}
          <div>
            <label className="block text-sm font-medium mb-2">FAQ</label>
            {faqItems.map((faq, index) => (
              <div key={index} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">Question {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="text-red-600 hover:bg-red-50 rounded p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFaq(index, 'question', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
                  placeholder="Question"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Answer"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addFaq}
              className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg"
            >
              <Plus className="w-5 h-5" />
              Add FAQ
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Age Restriction</label>
              <select
                name="ageRestriction"
                value={formData.ageRestriction}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">No restriction</option>
                <option value="All ages">All ages</option>
                <option value="18+">18+</option>
                <option value="21+">21+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Video className="w-4 h-4" />
              Promo Video URL
            </label>
            <input
              type="url"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="https://youtube.com/..."
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep - 1)}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Previous
          </button>
        )}
        
        {currentStep < 4 ? (
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep + 1)}
            className="ml-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="ml-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Event'}
          </button>
        )}
      </div>
    </form>
  );
}
