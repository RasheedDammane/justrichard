'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Eye, Copy, Upload } from 'lucide-react';

// Sections
import BasicInfoSection from './sections/BasicInfoSection';
import LocationSection from './sections/LocationSection';
import DetailsSection from './sections/DetailsSection';
import PricingSection from './sections/PricingSection';
import FeaturesSection from './sections/FeaturesSection';
import MediaSection from './sections/MediaSection';
import FloorPlansSection from './sections/FloorPlansSection';
import ContactSection from './sections/ContactSection';
import DocumentsSection from './sections/DocumentsSection';
import SEOSection from './sections/SEOSection';
import SettingsSection from './sections/SettingsSection';

interface PropertyFormProps {
  locale: string;
  propertyId?: string;
}

export default function PropertyFormComplete({ locale, propertyId }: PropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Reference data
  const [countries, setCountries] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  
  // Form data
  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    subtitle: '',
    description: '',
    status: 'DRAFT',
    type: 'RENT',
    isFeatured: false,
    visibility: 'PUBLIC',
    
    // Location
    addressLine1: '',
    addressLine2: '',
    zipCode: '',
    countryId: '',
    stateId: '',
    cityId: '',
    areaId: '',
    latitude: null as number | null,
    longitude: null as number | null,
    mapZoom: 15,
    
    // Details
    bedrooms: null as number | null,
    bathrooms: null as number | null,
    parkingSpaces: null as number | null,
    garages: null as number | null,
    garageSize: null as number | null,
    garageSizeUnit: 'sqft',
    areaSize: null as number | null,
    areaUnit: 'sqft',
    landArea: null as number | null,
    landAreaUnit: 'sqft',
    yearBuilt: null as number | null,
    propertyCode: '',
    
    // Pricing
    price: null as number | null,
    priceCurrencyId: '',
    pricePostfix: '/month',
    oldPrice: null as number | null,
    secondaryPriceLabel: '',
    rentalDetails: null as any,
    
    // Media
    coverImageId: '',
    videoUrl: '',
    virtualTourUrl: '',
    
    // Contact
    ownerId: '',
    contactPhone: '',
    contactEmail: '',
    contactWhatsapp: '',
    showOwnerOnFront: true,
    
    // SEO
    seoTitle: '',
    seoDescription: '',
    
    // Settings
    expirationDate: null as Date | null,
    energyClass: '',
    privateNote: '',
    disclaimer: '',
    
    // Relations (IDs only)
    selectedFeatureIds: [] as string[],
    mediaIds: [] as string[],
    documentIds: [] as string[],
    floorPlans: [] as any[],
  });

  useEffect(() => {
    fetchReferenceData();
    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  const fetchReferenceData = async () => {
    try {
      const [
        countriesRes,
        citiesRes,
        statesRes,
        areasRes,
        currenciesRes,
        featuresRes,
        usersRes
      ] = await Promise.all([
        fetch('/api/geography/countries'),
        fetch('/api/geography/cities'),
        fetch('/api/states'),
        fetch('/api/areas'),
        fetch('/api/admin/currencies'),
        fetch('/api/admin/property-features'),
        fetch('/api/admin/users'),
      ]);

      const [
        countriesData,
        citiesData,
        statesData,
        areasData,
        currenciesData,
        featuresData,
        usersData
      ] = await Promise.all([
        countriesRes.json(),
        citiesRes.json(),
        statesRes.json(),
        areasRes.json(),
        currenciesRes.json(),
        featuresRes.json(),
        usersRes.json(),
      ]);

      setCountries(countriesData.countries || []);
      setCities(citiesData.cities || []);
      setStates(statesData.states || []);
      setAreas(areasData.areas || []);
      setCurrencies(currenciesData.currencies || []);
      setFeatures(featuresData.features || []);
      setUsers(usersData.users || []);
    } catch (error) {
      console.error('Error fetching reference data:', error);
    }
  };

  const fetchProperty = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/properties/${propertyId}`);
      const data = await response.json();
      
      if (response.ok && data.property) {
        const p = data.property;
        
        // Map property data to form
        setFormData({
          title: p.title || '',
          subtitle: p.subtitle || '',
          description: p.description || '',
          status: p.status,
          type: p.type,
          isFeatured: p.isFeatured,
          visibility: p.visibility,
          
          addressLine1: p.addressLine1 || '',
          addressLine2: p.addressLine2 || '',
          zipCode: p.zipCode || '',
          countryId: p.countryId || '',
          stateId: p.stateId || '',
          cityId: p.cityId || '',
          areaId: p.areaId || '',
          latitude: p.latitude,
          longitude: p.longitude,
          mapZoom: p.mapZoom || 15,
          
          bedrooms: p.bedrooms,
          bathrooms: p.bathrooms,
          parkingSpaces: p.parkingSpaces,
          garages: p.garages,
          garageSize: p.garageSize,
          garageSizeUnit: p.garageSizeUnit || 'sqft',
          areaSize: p.areaSize,
          areaUnit: p.areaUnit || 'sqft',
          landArea: p.landArea,
          landAreaUnit: p.landAreaUnit || 'sqft',
          yearBuilt: p.yearBuilt,
          propertyCode: p.propertyCode || '',
          
          price: p.price,
          priceCurrencyId: p.priceCurrencyId || '',
          pricePostfix: p.pricePostfix || '/month',
          oldPrice: p.oldPrice,
          secondaryPriceLabel: p.secondaryPriceLabel || '',
          rentalDetails: p.rentalDetails,
          
          coverImageId: p.coverImageId || '',
          videoUrl: p.videoUrl || '',
          virtualTourUrl: p.virtualTourUrl || '',
          
          ownerId: p.ownerId || '',
          contactPhone: p.contactPhone || '',
          contactEmail: p.contactEmail || '',
          contactWhatsapp: p.contactWhatsapp || '',
          showOwnerOnFront: p.showOwnerOnFront !== false,
          
          seoTitle: p.seoTitle || '',
          seoDescription: p.seoDescription || '',
          
          expirationDate: p.expirationDate ? new Date(p.expirationDate) : null,
          energyClass: p.energyClass || '',
          privateNote: p.privateNote || '',
          disclaimer: p.disclaimer || '',
          
          selectedFeatureIds: p.features?.map((f: any) => f.featureId) || [],
          mediaIds: p.media?.map((m: any) => m.mediaId) || [],
          documentIds: p.documents?.map((d: any) => d.mediaId) || [],
          floorPlans: p.floorPlans || [],
        });
      }
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, publish = false) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = propertyId 
        ? `/api/admin/properties/${propertyId}`
        : '/api/admin/properties';
      
      const method = propertyId ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        status: publish ? 'PUBLISHED' : formData.status,
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(publish ? 'Property published!' : (propertyId ? 'Property updated!' : 'Property created!'));
        router.push(`/${locale}/admin/properties`);
      } else {
        alert(data.error || 'Failed to save property');
      }
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Failed to save property');
    } finally {
      setSaving(false);
    }
  };

  const handleDuplicate = async () => {
    if (!propertyId) return;
    
    try {
      const response = await fetch(`/api/admin/properties/${propertyId}/duplicate`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        alert('Property duplicated!');
        router.push(`/${locale}/admin/properties/${data.property.id}/edit`);
      } else {
        alert(data.error || 'Failed to duplicate property');
      }
    } catch (error) {
      console.error('Error duplicating property:', error);
      alert('Failed to duplicate property');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
      {/* Header Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {propertyId ? 'Edit Property' : 'Create New Property'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {formData.title || 'Untitled Property'}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            
            {propertyId && (
              <button
                type="button"
                onClick={handleDuplicate}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Duplicate
              </button>
            )}
            
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
            
            <button
              type="button"
              onClick={(e: any) => handleSubmit(e, true)}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              {saving ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Sections */}
        <div className="lg:col-span-2 space-y-6">
          <BasicInfoSection formData={formData} setFormData={setFormData} />
          <LocationSection 
            formData={formData} 
            setFormData={setFormData}
            countries={countries}
            cities={cities}
            states={states}
            areas={areas}
          />
          <DetailsSection formData={formData} setFormData={setFormData} />
          <PricingSection 
            formData={formData} 
            setFormData={setFormData}
            currencies={currencies}
          />
          <FeaturesSection 
            formData={formData} 
            setFormData={setFormData}
            features={features}
          />
          <MediaSection 
            formData={formData} 
            setFormData={setFormData}
            propertyId={propertyId}
          />
          <FloorPlansSection 
            formData={formData} 
            setFormData={setFormData}
            currencies={currencies}
          />
          <ContactSection 
            formData={formData} 
            setFormData={setFormData}
            users={users}
          />
          <DocumentsSection 
            formData={formData} 
            setFormData={setFormData}
            propertyId={propertyId}
          />
          <SEOSection formData={formData} setFormData={setFormData} />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          <SettingsSection formData={formData} setFormData={setFormData} />
        </div>
      </div>
    </form>
  );
}
