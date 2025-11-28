'use client';

import { useState, useEffect } from 'react';

interface CurrencyFormProps {
  currency?: any;
  onSave: () => void;
  onCancel: () => void;
}

export default function CurrencyForm({ currency, onSave, onCancel }: CurrencyFormProps) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    symbol: '',
    exchangeRate: '1',
    isActive: true,
    isDefault: false,
    decimalPlaces: 2,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currency) {
      setFormData({
        code: currency.code || '',
        name: currency.name || '',
        symbol: currency.symbol || '',
        exchangeRate: currency.exchangeRate?.toString() || '1',
        isActive: currency.isActive ?? true,
        isDefault: currency.isDefault || false,
        decimalPlaces: currency.decimalPlaces || 2,
      });
    }
  }, [currency]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        exchangeRate: parseFloat(formData.exchangeRate),
        decimalPlaces: parseInt(formData.decimalPlaces.toString()),
      };

      const url = currency
        ? `/api/admin/currencies/${currency.id}`
        : '/api/admin/currencies';
      
      const method = currency ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onSave();
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving currency:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Code * <span className="text-gray-400">(ex: USD, EUR)</span>
          </label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            maxLength={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="USD"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="US Dollar"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Symbole *
          </label>
          <input
            type="text"
            name="symbol"
            value={formData.symbol}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="$"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Taux de change
          </label>
          <input
            type="number"
            step="0.0001"
            name="exchangeRate"
            value={formData.exchangeRate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="1.0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Décimales
          </label>
          <input
            type="number"
            name="decimalPlaces"
            value={formData.decimalPlaces}
            onChange={handleChange}
            min="0"
            max="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="2"
          />
        </div>

        <div className="col-span-2 space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              ⭐ Devise par défaut
            </span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Actif</span>
          </label>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Astuce:</strong> Le taux de change est utilisé pour convertir les prix. 
          Par exemple, si 1 USD = 0.85 EUR, entrez 0.85 pour EUR.
        </p>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Enregistrement...' : currency ? 'Modifier' : 'Créer'}
        </button>
      </div>
    </form>
  );
}
