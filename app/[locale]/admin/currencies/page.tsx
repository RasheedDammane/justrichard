'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2, 
  RefreshCw,
  Star,
  Check,
  X,
} from 'lucide-react';

interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  isActive: boolean;
  isDefault: boolean;
  decimalPlaces: number;
  displayOrder: number;
  exchangeRatesCount?: number;
  _count?: {
    exchangeRatesFrom: number;
    exchangeRatesTo: number;
  };
  createdAt: string;
}

export default function CurrenciesPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const [loading, setLoading] = useState(true);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [defaultCurrency, setDefaultCurrency] = useState<Currency | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState<Currency | null>(null);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    symbol: '',
    isActive: true,
    isDefault: false,
    decimalPlaces: 2,
  });

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/currencies');
      const data = await response.json();
      console.log('API Response:', data);
      if (response.ok && data.currencies) {
        setCurrencies(data.currencies || []);
        const defaultCurr = data.currencies.find((c: Currency) => c.isDefault);
        setDefaultCurrency(defaultCurr || null);
      } else {
        console.error('API Error:', data);
      }
    } catch (error) {
      console.error('Error fetching currencies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/currencies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowAddModal(false);
        setFormData({
          code: '',
          name: '',
          symbol: '',
          isActive: true,
          isDefault: false,
          decimalPlaces: 2,
        });
        fetchCurrencies();
      } else {
        const data = await response.json();
        alert(data.error || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error('Error creating currency:', error);
      alert('Erreur lors de la création');
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/currencies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        fetchCurrencies();
      }
    } catch (error) {
      console.error('Error toggling currency:', error);
    }
  };

  const setAsDefault = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/currencies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDefault: true }),
      });

      if (response.ok) {
        alert('Devise définie par défaut!');
        fetchCurrencies();
      } else {
        const data = await response.json();
        alert(data.error || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error setting default currency:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  const openEditModal = (currency: Currency) => {
    setEditingCurrency(currency);
    setFormData({
      code: currency.code,
      name: currency.name,
      symbol: currency.symbol,
      isActive: currency.isActive,
      isDefault: currency.isDefault,
      decimalPlaces: currency.decimalPlaces,
    });
    setShowEditModal(true);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCurrency) return;

    try {
      const response = await fetch(`/api/admin/currencies/${editingCurrency.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowEditModal(false);
        setEditingCurrency(null);
        setFormData({
          code: '',
          name: '',
          symbol: '',
          isActive: true,
          isDefault: false,
          decimalPlaces: 2,
        });
        fetchCurrencies();
      } else {
        const data = await response.json();
        alert(data.error || 'Erreur lors de la modification');
      }
    } catch (error) {
      console.error('Error updating currency:', error);
      alert('Erreur lors de la modification');
    }
  };

  const deleteCurrency = async (id: string) => {
    if (!confirm('Supprimer cette devise ?')) return;

    try {
      const response = await fetch(`/api/admin/currencies/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchCurrencies();
      } else {
        const data = await response.json();
        alert(data.error || 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting currency:', error);
    }
  };

  const updateExchangeRates = async () => {
    if (!defaultCurrency) {
      alert('Veuillez définir une devise par défaut d\'abord');
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch('/api/admin/exchange-rates/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ baseCurrencyCode: defaultCurrency.code }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Taux de change mis à jour!\nCréés: ${data.created}\nMis à jour: ${data.updated}`);
        fetchCurrencies();
      } else {
        alert(data.error || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error updating exchange rates:', error);
      alert('Erreur lors de la mise à jour');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout locale={locale}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout locale={locale}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <DollarSign className="w-8 h-8" />
              Gestion des Devises
            </h1>
            <p className="text-gray-600 mt-1">
              {currencies.length} devise(s) • Défaut: {defaultCurrency?.code || 'Aucune'}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={updateExchangeRates}
              disabled={updating || !defaultCurrency}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 flex items-center gap-2 disabled:opacity-50 shadow-lg"
            >
              <RefreshCw className={`w-5 h-5 ${updating ? 'animate-spin' : ''}`} />
              Mettre à jour les taux
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Ajouter une devise
            </button>
          </div>
        </div>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Devises</p>
                <p className="text-2xl font-bold text-gray-900">{currencies.length}</p>
              </div>
              <DollarSign className="w-12 h-12 text-primary-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Devises Actives</p>
                <p className="text-2xl font-bold text-green-600">
                  {currencies.filter(c => c.isActive).length}
                </p>
              </div>
              <Check className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Devise par Défaut</p>
                <p className="text-2xl font-bold text-primary-600">
                  {defaultCurrency?.code || 'N/A'}
                </p>
              </div>
              <Star className="w-12 h-12 text-primary-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taux de Change</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currencies.reduce((sum, c) => sum + (c.exchangeRatesCount || 0), 0)}
                </p>
              </div>
              <RefreshCw className="w-12 h-12 text-gray-600 opacity-20" />
            </div>
          </div>
        </div>

      {/* Currencies Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">Liste des Devises</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Symbole
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Décimales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Taux
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currencies.map((currency) => (
                  <tr key={currency.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{currency.code}</span>
                        {currency.isDefault && (
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {currency.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-gray-900">
                      {currency.symbol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {currency.decimalPlaces}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {currency.exchangeRatesCount || 0} taux
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleActive(currency.id, currency.isActive)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          currency.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {currency.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        {!currency.isDefault && (
                          <button
                            onClick={() => setAsDefault(currency.id)}
                            className="p-1 text-yellow-600 hover:bg-yellow-50 rounded"
                            title="Définir par défaut"
                          >
                            <Star className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => openEditModal(currency)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          title="Modifier"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        {!currency.isDefault && (
                          <button
                            onClick={() => deleteCurrency(currency.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      {currencies.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune devise</h3>
          <p className="text-gray-500 mb-4">Commencez par ajouter votre première devise</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg"
          >
            Ajouter une devise
          </button>
        </div>
      )}

      {/* Edit Currency Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Modifier la Devise</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCurrency(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code ISO 4217
                </label>
                <input
                  type="text"
                  value={formData.code}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Symbole *
                </label>
                <input
                  type="text"
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Décimales
                </label>
                <input
                  type="number"
                  value={formData.decimalPlaces}
                  onChange={(e) => setFormData({ ...formData, decimalPlaces: parseInt(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  min="0"
                  max="4"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Par défaut</span>
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingCurrency(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Currency Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Ajouter une Devise</h2>
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
                  Code ISO 4217 *
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="USD, EUR, MAD..."
                  maxLength={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="US Dollar, Euro, Dirham..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Symbole *
                </label>
                <input
                  type="text"
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="$, €, DH..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Décimales
                </label>
                <input
                  type="number"
                  value={formData.decimalPlaces}
                  onChange={(e) => setFormData({ ...formData, decimalPlaces: parseInt(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  min="0"
                  max="4"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Par défaut</span>
                </label>
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
    </AdminLayout>
  );
}
