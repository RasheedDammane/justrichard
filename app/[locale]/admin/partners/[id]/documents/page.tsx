'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FileText, Plus, CheckCircle, XCircle, Calendar, Trash2, Edit2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Document {
  id: string;
  type: string;
  name: string;
  url: string;
  isVerified: boolean;
  verifiedAt: string | null;
  expiresAt: string | null;
  uploadedAt: string;
}

export default function PartnerDocumentsPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const partnerId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [partner, setPartner] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'license',
    name: '',
    url: '',
    expiresAt: '',
  });

  useEffect(() => {
    fetchData();
  }, [partnerId]);

  const fetchData = async () => {
    try {
      const [partnerRes, docsRes] = await Promise.all([
        fetch(`/api/admin/partners/${partnerId}`),
        fetch(`/api/admin/partners/${partnerId}/documents`),
      ]);

      const partnerData = await partnerRes.json();
      const docsData = await docsRes.json();

      if (partnerRes.ok) setPartner(partnerData.partner);
      if (docsRes.ok) setDocuments(docsData.documents || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/admin/partners/${partnerId}/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowAddForm(false);
        setFormData({ type: 'license', name: '', url: '', expiresAt: '' });
        fetchData();
      } else {
        const error = await response.json();
        alert(error.error || 'Erreur lors de l\'ajout du document');
      }
    } catch (error) {
      console.error('Error adding document:', error);
      alert('Erreur lors de l\'ajout du document');
    }
  };

  const toggleVerification = async (docId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/partners/${partnerId}/documents/${docId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVerified: !currentStatus }),
      });

      if (response.ok) {
        fetchData();
      } else {
        alert('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const deleteDocument = async (docId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/partners/${partnerId}/documents/${docId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchData();
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      license: 'Licence',
      insurance: 'Assurance',
      contract: 'Contrat',
      id: 'Pièce d\'identité',
      certificate: 'Certificat',
      other: 'Autre',
    };
    return labels[type] || type;
  };

  const isExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  const isExpiringSoon = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    const daysUntilExpiry = Math.ceil((new Date(expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry > 0 && daysUntilExpiry <= 30;
  };

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

  const stats = {
    total: documents.length,
    verified: documents.filter(d => d.isVerified).length,
    expired: documents.filter(d => isExpired(d.expiresAt)).length,
    expiringSoon: documents.filter(d => isExpiringSoon(d.expiresAt)).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Documents - {partner?.name}</h1>
              <p className="text-primary-100 mt-1">Gestion des documents du partenaire</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/${locale}/admin/partners/${partnerId}`}
                className="bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                ← Retour
              </Link>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Ajouter un document
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Total Documents</div>
            <div className="text-3xl font-bold text-primary-600 mt-2">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Vérifiés</div>
            <div className="text-3xl font-bold text-green-600 mt-2">{stats.verified}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Expirés</div>
            <div className="text-3xl font-bold text-red-600 mt-2">{stats.expired}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Expire bientôt</div>
            <div className="text-3xl font-bold text-orange-600 mt-2">{stats.expiringSoon}</div>
          </div>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Ajouter un document</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de document *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="license">Licence</option>
                    <option value="insurance">Assurance</option>
                    <option value="contract">Contrat</option>
                    <option value="id">Pièce d'identité</option>
                    <option value="certificate">Certificat</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du document *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="Ex: Licence commerciale 2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL du document *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date d'expiration (optionnel)
                  </label>
                  <input
                    type="date"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Documents List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">Liste des documents</h2>
          </div>
          {documents.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun document</h3>
              <p className="text-gray-500 mb-6">Commencez par ajouter le premier document</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700"
              >
                <Plus className="w-5 h-5" />
                Ajouter un document
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {documents.map((doc) => (
                <div key={doc.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <FileText className="w-10 h-10 text-gray-400 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {getDocumentTypeLabel(doc.type)}
                          </span>
                          {doc.isVerified ? (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Vérifié
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 flex items-center gap-1">
                              <XCircle className="w-3 h-3" />
                              Non vérifié
                            </span>
                          )}
                          {doc.expiresAt && isExpired(doc.expiresAt) && (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                              Expiré
                            </span>
                          )}
                          {doc.expiresAt && isExpiringSoon(doc.expiresAt) && !isExpired(doc.expiresAt) && (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                              Expire bientôt
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Ajouté le {new Date(doc.uploadedAt).toLocaleDateString('fr-FR')}</span>
                          </div>
                          {doc.expiresAt && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>Expire le {new Date(doc.expiresAt).toLocaleDateString('fr-FR')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                        title="Voir le document"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                      <button
                        onClick={() => toggleVerification(doc.id, doc.isVerified)}
                        className={`p-2 rounded-lg ${
                          doc.isVerified 
                            ? 'text-yellow-600 hover:bg-yellow-50' 
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={doc.isVerified ? 'Marquer comme non vérifié' : 'Marquer comme vérifié'}
                      >
                        {doc.isVerified ? <XCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
