'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FileText, Save, X, Globe, Trash2 } from 'lucide-react';

interface Translation {
  locale: string;
  title: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
}

export default function EditCMSPagePage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const pageId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    slug: '',
    isActive: true,
  });
  const [activeTab, setActiveTab] = useState('fr');
  const [translations, setTranslations] = useState<Translation[]>([
    { locale: 'fr', title: '', content: '', seoTitle: '', seoDescription: '' },
    { locale: 'en', title: '', content: '', seoTitle: '', seoDescription: '' },
    { locale: 'ar', title: '', content: '', seoTitle: '', seoDescription: '' },
  ]);

  useEffect(() => {
    fetchPage();
  }, [pageId]);

  const fetchPage = async () => {
    try {
      const response = await fetch(`/api/admin/cms-pages/${pageId}`);
      const data = await response.json();
      
      if (response.ok && data.page) {
        const page = data.page;
        setFormData({
          slug: page.slug || '',
          isActive: page.isActive ?? true,
        });

        // Update translations
        const updatedTranslations = ['fr', 'en', 'ar'].map(loc => {
          const existing = page.translations.find((t: any) => t.locale === loc);
          return {
            locale: loc,
            title: existing?.title || '',
            content: existing?.content || '',
            seoTitle: existing?.seoTitle || '',
            seoDescription: existing?.seoDescription || '',
          };
        });
        setTranslations(updatedTranslations);
      }
    } catch (error) {
      console.error('Error fetching page:', error);
      alert('Erreur lors du chargement de la page');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const validTranslations = translations.filter(t => t.title.trim() !== '');

    if (validTranslations.length === 0) {
      alert('Veuillez ajouter au moins une traduction avec un titre');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/admin/cms-pages/${pageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          translations: validTranslations,
        }),
      });

      if (response.ok) {
        router.push(`/${locale}/admin/cms-pages/${pageId}`);
      } else {
        const error = await response.json();
        alert(error.error || 'Erreur lors de la mise à jour de la page');
      }
    } catch (error) {
      console.error('Error updating page:', error);
      alert('Erreur lors de la mise à jour de la page');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette page ? Cette action est irréversible.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/cms-pages/${pageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push(`/${locale}/admin/cms-pages`);
      } else {
        const error = await response.json();
        alert(error.error || 'Erreur lors de la suppression de la page');
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      alert('Erreur lors de la suppression de la page');
    }
  };

  const updateTranslation = (locale: string, field: keyof Translation, value: string) => {
    setTranslations(translations.map(t => 
      t.locale === locale ? { ...t, [field]: value } : t
    ));
  };

  const generateSlug = () => {
    const frTranslation = translations.find(t => t.locale === 'fr');
    if (frTranslation?.title) {
      const slug = frTranslation.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData({ ...formData, slug });
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const currentTranslation = translations.find(t => t.locale === activeTab) || translations[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold">Modifier la Page CMS</h1>
          <p className="text-primary-100 mt-1">Mettre à jour le contenu de la page</p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Configuration de base */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug (URL) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 font-mono"
                  />
                  <button
                    type="button"
                    onClick={generateSlug}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Générer depuis titre FR
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  URL de la page: /{formData.slug}
                </p>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Page active</span>
                </label>
              </div>
            </div>
          </div>

          {/* Traductions */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Globe className="w-6 h-6" />
                Contenu multilingue
              </h2>
            </div>

            {/* Language Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              <button
                type="button"
                onClick={() => setActiveTab('fr')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'fr'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🇫🇷 Français
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('en')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'en'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🇬🇧 English
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ar')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'ar'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🇸🇦 العربية
              </button>
            </div>

            {/* Translation Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre de la page *
                </label>
                <input
                  type="text"
                  value={currentTranslation.title}
                  onChange={(e) => updateTranslation(activeTab, 'title', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contenu *
                </label>
                <textarea
                  value={currentTranslation.content}
                  onChange={(e) => updateTranslation(activeTab, 'content', e.target.value)}
                  rows={12}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Vous pouvez utiliser du HTML pour formater le contenu
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">SEO</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Titre SEO
                    </label>
                    <input
                      type="text"
                      value={currentTranslation.seoTitle}
                      onChange={(e) => updateTranslation(activeTab, 'seoTitle', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      maxLength={60}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {currentTranslation.seoTitle.length}/60 caractères
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description SEO
                    </label>
                    <textarea
                      value={currentTranslation.seoDescription}
                      onChange={(e) => updateTranslation(activeTab, 'seoDescription', e.target.value)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {currentTranslation.seoDescription.length}/160 caractères
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 flex items-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Supprimer
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.push(`/${locale}/admin/cms-pages/${pageId}`)}
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Enregistrer les modifications
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
