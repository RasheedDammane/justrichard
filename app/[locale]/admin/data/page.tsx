'use client';

import { useState, useEffect } from 'react';
import CountryForm from '@/components/admin/CountryForm';
import LanguageForm from '@/components/admin/LanguageForm';
import CityForm from '@/components/admin/CityForm';
import CurrencyForm from '@/components/admin/CurrencyForm';

type Tab = 'countries' | 'languages' | 'currencies' | 'cities';

export default function AdminDataPage() {
  const [activeTab, setActiveTab] = useState<Tab>('countries');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/${activeTab}`);
      const result = await response.json();
      setData(result.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
    
    try {
      await fetch(`/api/admin/${activeTab}/${id}`, { method: 'DELETE' });
      loadData();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          📊 Administration des Données
        </h1>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: 'countries', label: '🌍 Pays', count: data.length },
                { id: 'languages', label: '🗣️ Langues', count: data.length },
                { id: 'currencies', label: '💰 Devises', count: data.length },
                { id: 'cities', label: '🏙️ Villes', count: data.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 px-2 py-1 text-xs bg-gray-100 rounded-full">
                    {activeTab === tab.id ? tab.count : ''}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <input
              type="search"
              placeholder="Rechercher..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleCreate}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <span>➕</span>
            Ajouter
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">
              Chargement...
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {activeTab === 'countries' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Drapeau</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Devise</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </>
                  )}
                  {activeTab === 'languages' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom Natif</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Direction</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </>
                  )}
                  {activeTab === 'currencies' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Symbole</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Défaut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </>
                  )}
                  {activeTab === 'cities' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pays</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    {activeTab === 'countries' && (
                      <>
                        <td className="px-6 py-4 text-2xl">{item.flag}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.code}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.currency}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {item.isActive ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-sm space-x-2">
                          <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900">✏️</button>
                          <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">🗑️</button>
                        </td>
                      </>
                    )}
                    {activeTab === 'languages' && (
                      <>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.code}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.nativeName}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.isRTL ? 'RTL ←' : 'LTR →'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {item.isActive ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-sm space-x-2">
                          <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900">✏️</button>
                          <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">🗑️</button>
                        </td>
                      </>
                    )}
                    {activeTab === 'currencies' && (
                      <>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.code}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.symbol}</td>
                        <td className="px-6 py-4">{item.isDefault && <span className="text-yellow-500">⭐</span>}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {item.isActive ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-sm space-x-2">
                          <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900">✏️</button>
                          <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">🗑️</button>
                        </td>
                      </>
                    )}
                    {activeTab === 'cities' && (
                      <>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.Country?.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.slug}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {item.isActive ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-sm space-x-2">
                          <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900">✏️</button>
                          <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">🗑️</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">
                {editingItem ? '✏️ Modifier' : '➕ Ajouter'} {' '}
                {activeTab === 'countries' && 'un pays'}
                {activeTab === 'languages' && 'une langue'}
                {activeTab === 'currencies' && 'une devise'}
                {activeTab === 'cities' && 'une ville'}
              </h2>
              
              {activeTab === 'countries' && (
                <CountryForm
                  country={editingItem}
                  onSave={() => {
                    setShowForm(false);
                    setEditingItem(null);
                    loadData();
                  }}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                />
              )}
              
              {activeTab === 'languages' && (
                <LanguageForm
                  language={editingItem}
                  onSave={() => {
                    setShowForm(false);
                    setEditingItem(null);
                    loadData();
                  }}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                />
              )}
              
              {activeTab === 'currencies' && (
                <CurrencyForm
                  currency={editingItem}
                  onSave={() => {
                    setShowForm(false);
                    setEditingItem(null);
                    loadData();
                  }}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                />
              )}
              
              {activeTab === 'cities' && (
                <CityForm
                  city={editingItem}
                  onSave={() => {
                    setShowForm(false);
                    setEditingItem(null);
                    loadData();
                  }}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
