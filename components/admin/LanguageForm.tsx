'use client';

import { useState, useEffect } from 'react';

interface LanguageFormProps {
  language?: any;
  onSave: () => void;
  onCancel: () => void;
}

export default function LanguageForm({ language, onSave, onCancel }: LanguageFormProps) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    nativeName: '',
    isRTL: false,
    isActive: true,
    order: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (language) {
      setFormData({
        code: language.code || '',
        name: language.name || '',
        nativeName: language.nativeName || '',
        isRTL: language.isRTL || false,
        isActive: language.isActive ?? true,
        order: language.order || 0,
      });
    }
  }, [language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = language
        ? `/api/admin/languages/${language.id}`
        : '/api/admin/languages';
      
      const method = language ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSave();
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving language:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Code * <span className="text-gray-400">(ex: en, fr, ar)</span>
          </label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            maxLength={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="en"
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
            placeholder="English"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom Natif *
          </label>
          <input
            type="text"
            name="nativeName"
            value={formData.nativeName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="English"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ordre
          </label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div className="col-span-2 space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isRTL"
              checked={formData.isRTL}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Direction RTL (droite à gauche) - pour Arabe, Hébreu, etc.
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
          {loading ? 'Enregistrement...' : language ? 'Modifier' : 'Créer'}
        </button>
      </div>
    </form>
  );
}
