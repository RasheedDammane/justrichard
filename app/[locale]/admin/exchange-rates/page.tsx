'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { RefreshCw, TrendingUp, Clock, Plus, X } from 'lucide-react';

interface ExchangeRate {
  id: string;
  rate: number;
  source: string | null;
  lastUpdated: string;
  fromCurrency: {
    code: string;
    name: string;
    symbol: string;
  };
  toCurrency: {
    code: string;
    name: string;
    symbol: string;
  };
}

interface Currency {
  id: string;
  code: string;
  name: string;
}

export default function ExchangeRatesPage() {
  const params = useParams();
  const locale = params.locale as string;

  const [loading, setLoading] = useState(true);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    fromCurrencyId: '',
    toCurrencyId: '',
    rate: '',
    source: 'manual',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ratesRes, currenciesRes] = await Promise.all([
        fetch('/api/admin/exchange-rates'),
        fetch('/api/admin/currencies?activeOnly=true'),
      ]);

      const [ratesData, currenciesData] = await Promise.all([
        ratesRes.json(),
        currenciesRes.json(),
      ]);

      if (ratesRes.ok) {
        setExchangeRates(ratesData.exchangeRates || []);
      }
      if (currenciesRes.ok) {
        setCurrencies(currenciesData.currencies || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/exchange-rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          rate: parseFloat(formData.rate),
        }),
      });

      if (response.ok) {
        setShowAddModal(false);
        setFormData({
          fromCurrencyId: '',
          toCurrencyId: '',
          rate: '',
          source: 'manual',
        });
        fetchData();
      } else {
        const data = await response.json();
        alert(data.error || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error('Error creating exchange rate:', error);
      alert('Erreur lors de la création');
    }
  };

  const groupedRates = exchangeRates.reduce((acc, rate) => {
    const key = rate.fromCurrency.code;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(rate);
    return acc;
  }, {} as Record<string, ExchangeRate[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <TrendingUp className="w-8 h-8" />
                Taux de Change
              </h1>
              <p className="text-primary-100 mt-1">
                {exchangeRates.length} taux configurés
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Ajouter un taux
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Taux</p>
                <p className="text-2xl font-bold text-gray-900">{exchangeRates.length}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-primary-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Devises Actives</p>
                <p className="text-2xl font-bold text-green-600">{currencies.length}</p>
              </div>
              <RefreshCw className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Dernière MAJ</p>
                <p className="text-sm font-bold text-gray-900">
                  {exchangeRates.length > 0
                    ? new Date(exchangeRates[0].lastUpdated).toLocaleDateString('fr-FR')
                    : 'N/A'}
                </p>
              </div>
              <Clock className="w-12 h-12 text-gray-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Exchange Rates by Currency */}
        <div className="space-y-6">
          {Object.entries(groupedRates).map(([fromCode, rates]) => (
            <div key={fromCode} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-bold">
                  De {fromCode} ({rates[0].fromCurrency.name})
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Vers
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Taux
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Exemple
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Source
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Dernière MAJ
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rates.map((rate) => (
                      <tr key={rate.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {rate.toCurrency.code}
                          </div>
                          <div className="text-sm text-gray-500">
                            {rate.toCurrency.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-lg font-bold text-primary-600">
                            {rate.rate.toFixed(6)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          1 {rate.fromCurrency.symbol} = {rate.rate.toFixed(2)} {rate.toCurrency.symbol}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${
                            rate.source === 'manual'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {rate.source || 'manual'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(rate.lastUpdated).toLocaleString('fr-FR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {exchangeRates.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun taux de change
            </h3>
            <p className="text-gray-500 mb-4">
              Commencez par ajouter des taux de change
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700"
            >
              Ajouter un taux
            </button>
          </div>
        )}
      </div>

      {/* Add Exchange Rate Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Ajouter un Taux de Change</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  De la devise *
                </label>
                <select
                  value={formData.fromCurrencyId}
                  onChange={(e) => setFormData({ ...formData, fromCurrencyId: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                >
                  <option value="">Sélectionner...</option>
                  {currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vers la devise *
                </label>
                <select
                  value={formData.toCurrencyId}
                  onChange={(e) => setFormData({ ...formData, toCurrencyId: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                >
                  <option value="">Sélectionner...</option>
                  {currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Taux *
                </label>
                <input
                  type="number"
                  step="0.000001"
                  value={formData.rate}
                  onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
