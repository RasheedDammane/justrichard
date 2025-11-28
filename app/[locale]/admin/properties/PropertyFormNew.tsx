'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Upload } from 'lucide-react';
import Tabs from '@/components/ui/Tabs';
import { useAdminTranslation } from '@/hooks/useAdminTranslation';

interface PropertyFormProps {
  locale: string;
  property?: any;
}

export default function PropertyFormNew({ locale, property }: PropertyFormProps) {
  const router = useRouter();
  const t = useAdminTranslation('properties');
  const tCommon = useAdminTranslation('common');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Base
    name: property?.name || '',
    slug: property?.slug || '',
    description: property?.description || '',
    type: property?.type || 'apartment',
    status: property?.status || 'draft',
    listingType: property?.listingType || 'sale',
    
    // Prix
    salePrice: property?.salePrice || '',
    rentPrice: property?.rentPrice || '',
    pricePerNight: property?.pricePerNight || '',
    pricePerWeek: property?.pricePerWeek || '',
    pricePerMonth: property?.pricePerMonth || '',
    secondPrice: property?.secondPrice || '',
    currency: property?.currency || 'AED',
    pricePrefix: property?.pricePrefix || '',
    pricePostfix: property?.pricePostfix || '',
    pricePlaceholder: property?.pricePlaceholder || '',
    enablePricePlaceholder: property?.enablePricePlaceholder || false,
    
    // Pièces & Espaces
    bedrooms: property?.bedrooms || '',
    bathrooms: property?.bathrooms || '',
    rooms: property?.rooms || '',
    garages: property?.garages || '',
    garageSize: property?.garageSize || '',
    floor: property?.floor || '',
    furnished: property?.furnished || false,
    
    // Surface
    area: property?.area || '',
    areaPostfix: property?.areaPostfix || 'm²',
    landArea: property?.landArea || '',
    landAreaPostfix: property?.landAreaPostfix || '',
    
    // Détails
    yearBuilt: property?.yearBuilt || '',
    propertyId: property?.propertyId || '',
    
    // Localisation
    cityId: property?.cityId || '',
    countryId: property?.countryId || '',
    stateId: property?.stateId || '',
    neighborhoodId: property?.neighborhoodId || '',
    address: property?.address || '',
    streetAddress: property?.streetAddress || '',
    zipCode: property?.zipCode || '',
    latitude: property?.latitude || '',
    longitude: property?.longitude || '',
    
    // Média
    images: property?.images || [],
    video: property?.video || '',
    videoUrl: property?.videoUrl || '',
    virtualTour: property?.virtualTour || '',
    sliderImage: property?.sliderImage || '',
    customSlider: property?.customSlider || false,
    
    // Features
    features: property?.features || [],
    amenities: property?.amenities || [],
    labels: property?.labels || [],
    
    // Plans & Documents
    floorPlans: property?.floorPlans || [],
    documents: property?.documents || [],
    
    // Agent
    authorType: property?.authorType || 'author',
    agentId: property?.agentId || '',
    agencyId: property?.agencyId || '',
    
    // Options
    isFeatured: property?.isFeatured || false,
    loginRequired: property?.loginRequired || false,
    isActive: property?.isActive || true,
    
    // SEO
    metaTitle: property?.metaTitle || '',
    metaDescription: property?.metaDescription || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = property 
        ? `/api/admin/properties/${property.id}`
        : '/api/admin/properties';
      
      const method = property ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/${locale}/admin/properties`);
        router.refresh();
      } else {
        alert('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Tab 1: Informations de base
  const basicInfoTab = (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('form.title')} *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: Appartement moderne avec vue sur mer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('form.description')}
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder={t('form.description')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.propertyType')} *
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="townhouse">Townhouse</option>
            <option value="penthouse">Penthouse</option>
            <option value="studio">Studio</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.listingType')} *
          </label>
          <select
            name="listingType"
            value={formData.listingType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('form.status')}
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="sold">Sold</option>
          <option value="rented">Rented</option>
        </select>
      </div>
    </div>
  );

  // Tab 2: Prix & Devise
  const priceTab = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.currency')}
          </label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="AED">AED</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="THB">THB</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.salePrice')}
          </label>
          <input
            type="number"
            name="salePrice"
            value={formData.salePrice}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.rentPrice')}
          </label>
          <input
            type="number"
            name="rentPrice"
            value={formData.rentPrice}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.secondPrice')}
          </label>
          <input
            type="number"
            name="secondPrice"
            value={formData.secondPrice}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div className="flex items-center pt-8">
          <input
            type="checkbox"
            name="enablePricePlaceholder"
            checked={formData.enablePricePlaceholder}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm font-medium text-gray-700">
            {t('form.enablePricePlaceholder')}
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.pricePrefix')}
          </label>
          <input
            type="text"
            name="pricePrefix"
            value={formData.pricePrefix}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder={t('form.pricePrefixPlaceholder')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.pricePostfix')}
          </label>
          <input
            type="text"
            name="pricePostfix"
            value={formData.pricePostfix}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder={t('form.pricePostfixPlaceholder')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.pricePlaceholder')}
          </label>
          <input
            type="text"
            name="pricePlaceholder"
            value={formData.pricePlaceholder}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  // Tab 3: Détails & Pièces
  const detailsTab = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.bedrooms')}
          </label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.bathrooms')}
          </label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.rooms')}
          </label>
          <input
            type="number"
            name="rooms"
            value={formData.rooms}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.garages')}
          </label>
          <input
            type="number"
            name="garages"
            value={formData.garages}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.area')}
          </label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.areaPostfix')}
          </label>
          <input
            type="text"
            name="areaPostfix"
            value={formData.areaPostfix}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder={t('form.areaPostfixPlaceholder')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.landArea')}
          </label>
          <input
            type="number"
            name="landArea"
            value={formData.landArea}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.garageSize')}
          </label>
          <input
            type="text"
            name="garageSize"
            value={formData.garageSize}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder={t('form.garageSizePlaceholder')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.floor')}
          </label>
          <input
            type="number"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div className="flex items-center pt-8">
          <input
            type="checkbox"
            name="furnished"
            checked={formData.furnished}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm font-medium text-gray-700">
            {t('form.furnished')}
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.yearBuilt')}
          </label>
          <input
            type="number"
            name="yearBuilt"
            value={formData.yearBuilt}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="2024"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.propertyId')}
          </label>
          <input
            type="text"
            name="propertyId"
            value={formData.propertyId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder={t('form.propertyIdPlaceholder')}
          />
        </div>
      </div>
    </div>
  );

  // Tab 4: Localisation
  const locationTab = (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('form.streetAddress')}
        </label>
        <input
          type="text"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder={t('form.streetAddressPlaceholder')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address (Full)
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.zipCode')}
          </label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City ID
          </label>
          <input
            type="text"
            name="cityId"
            value={formData.cityId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  // Tab 5: Média
  const mediaTab = (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('form.images')}
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">{t('form.imagesHelp')}</p>
          <button
            type="button"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Upload Images
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('form.videoUrl')}
        </label>
        <input
          type="url"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder={t('form.videoUrlPlaceholder')}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="customSlider"
          checked={formData.customSlider}
          onChange={handleChange}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="ml-2 text-sm font-medium text-gray-700">
          {t('form.customSlider')}
        </label>
      </div>

      {formData.customSlider && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.sliderImage')}
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Suggested size 2000px x 700px</p>
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Upload Slider Image
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Tab 6: Plans & Documents
  const plansTab = (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('form.floorPlans')}
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">Upload floor plans (Min 800x600px)</p>
          <button
            type="button"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Floor Plan
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('form.documents')}
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">PDF files, Map images or other documents</p>
          <button
            type="button"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Document
          </button>
        </div>
      </div>
    </div>
  );

  // Tab 7: Options
  const optionsTab = (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('form.authorType')}
        </label>
        <select
          name="authorType"
          value={formData.authorType}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="author">{t('form.authorInfo')}</option>
          <option value="agent">{t('form.agentInfo')}</option>
          <option value="agency">{t('form.agencyInfo')}</option>
          <option value="none">{t('form.noDisplay')}</option>
        </select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm font-medium text-gray-700">
            {t('form.featured')}
          </label>
        </div>
        <p className="text-sm text-gray-500 ml-6">{t('form.featuredHelp')}</p>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="loginRequired"
            checked={formData.loginRequired}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm font-medium text-gray-700">
            {t('form.loginRequired')}
          </label>
        </div>
        <p className="text-sm text-gray-500 ml-6">{t('form.loginRequiredHelp')}</p>
      </div>
    </div>
  );

  const tabs = [
    { id: 'basic', label: 'Basic Info', content: basicInfoTab },
    { id: 'price', label: 'Price & Currency', content: priceTab },
    { id: 'details', label: 'Details & Rooms', content: detailsTab },
    { id: 'location', label: 'Location', content: locationTab },
    { id: 'media', label: 'Media', content: mediaTab },
    { id: 'plans', label: 'Plans & Documents', content: plansTab },
    { id: 'options', label: 'Options', content: optionsTab },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs tabs={tabs} defaultTab="basic" />

      {/* Actions */}
      <div className="flex items-center gap-4 pt-6 border-t sticky bottom-0 bg-white py-4">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          <Save className="w-5 h-5" />
          {loading ? tCommon('saving') : tCommon('save')}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
        >
          <X className="w-5 h-5" />
          {tCommon('cancel')}
        </button>
      </div>
    </form>
  );
}
