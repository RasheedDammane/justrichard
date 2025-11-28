'use client';
import { DollarSign } from 'lucide-react';
export default function PricingSection({ formData, setFormData, currencies }: any) {
  const handleChange = (e: any) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value === '' ? null : e.target.value }));
  };
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5" />Pricing
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
            <input type="number" name="price" value={formData.price || ''} onChange={handleChange} min="0" step="0.01" placeholder="1500" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select name="priceCurrencyId" value={formData.priceCurrencyId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">Select Currency</option>
              {currencies.map((c: any) => (<option key={c.id} value={c.id}>{c.code} - {c.name}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Postfix</label>
            <input type="text" name="pricePostfix" value={formData.pricePostfix} onChange={handleChange} placeholder="/month" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Old Price (for discount display)</label>
            <input type="number" name="oldPrice" value={formData.oldPrice || ''} onChange={handleChange} min="0" step="0.01" placeholder="2000" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Price Label</label>
            <input type="text" name="secondaryPriceLabel" value={formData.secondaryPriceLabel} onChange={handleChange} placeholder="Starting from" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
