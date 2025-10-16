'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Bot, Save, X, Plus, Trash2 } from 'lucide-react';

interface Intent {
  name: string;
  patterns: string[];
  responses: string[];
  action?: string;
  priority: number;
  isActive: boolean;
}

export default function NewChatbotPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [loading, setLoading] = useState(false);
  const [partners, setPartners] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    type: 'CUSTOMER_SUPPORT',
    industry: 'GENERAL',
    partnerId: '',
    description: '',
    avatar: '',
    welcomeMessage: '',
    language: 'fr',
    isActive: true,
  });
  const [intents, setIntents] = useState<Intent[]>([]);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await fetch('/api/admin/partners');
      const data = await response.json();
      setPartners(data.partners || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/chatbots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          partnerId: formData.partnerId || null,
          intents: intents.length > 0 ? intents : undefined,
        }),
      });

      if (response.ok) {
        router.push(`/${locale}/admin/chatbots`);
      } else {
        const error = await response.json();
        alert(error.error || 'Erreur lors de la création du chatbot');
      }
    } catch (error) {
      console.error('Error creating chatbot:', error);
      alert('Erreur lors de la création du chatbot');
    } finally {
      setLoading(false);
    }
  };

  const addIntent = () => {
    setIntents([
      ...intents,
      {
        name: '',
        patterns: [''],
        responses: [''],
        action: '',
        priority: 0,
        isActive: true,
      },
    ]);
  };

  const removeIntent = (index: number) => {
    setIntents(intents.filter((_, i) => i !== index));
  };

  const updateIntent = (index: number, field: keyof Intent, value: any) => {
    const updated = [...intents];
    updated[index] = { ...updated[index], [field]: value };
    setIntents(updated);
  };

  const addPattern = (intentIndex: number) => {
    const updated = [...intents];
    updated[intentIndex].patterns.push('');
    setIntents(updated);
  };

  const updatePattern = (intentIndex: number, patternIndex: number, value: string) => {
    const updated = [...intents];
    updated[intentIndex].patterns[patternIndex] = value;
    setIntents(updated);
  };

  const removePattern = (intentIndex: number, patternIndex: number) => {
    const updated = [...intents];
    updated[intentIndex].patterns = updated[intentIndex].patterns.filter((_, i) => i !== patternIndex);
    setIntents(updated);
  };

  const addResponse = (intentIndex: number) => {
    const updated = [...intents];
    updated[intentIndex].responses.push('');
    setIntents(updated);
  };

  const updateResponse = (intentIndex: number, responseIndex: number, value: string) => {
    const updated = [...intents];
    updated[intentIndex].responses[responseIndex] = value;
    setIntents(updated);
  };

  const removeResponse = (intentIndex: number, responseIndex: number) => {
    const updated = [...intents];
    updated[intentIndex].responses = updated[intentIndex].responses.filter((_, i) => i !== responseIndex);
    setIntents(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold">Nouveau Chatbot</h1>
          <p className="text-primary-100 mt-1">Créer un nouveau chatbot intelligent</p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Bot className="w-6 h-6" />
              Informations de base
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du chatbot *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Ex: Assistant Client"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="CUSTOMER_SUPPORT">Support Client</option>
                  <option value="BOOKING_ASSISTANT">Assistant Réservation</option>
                  <option value="FAQ">FAQ</option>
                  <option value="SALES">Ventes</option>
                  <option value="TECHNICAL">Technique</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industrie *
                </label>
                <select
                  required
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="GENERAL">Général</option>
                  <option value="CLEANING">Nettoyage</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="BEAUTY">Beauté</option>
                  <option value="HEALTHCARE">Santé</option>
                  <option value="EDUCATION">Éducation</option>
                  <option value="FOOD">Alimentation</option>
                  <option value="TRANSPORT">Transport</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Langue
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Partenaire (optionnel)
                </label>
                <select
                  value={formData.partnerId}
                  onChange={(e) => setFormData({ ...formData, partnerId: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">Aucun partenaire</option>
                  {partners.map((partner) => (
                    <option key={partner.id} value={partner.id}>
                      {partner.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Avatar URL
                </label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="https://..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Description du chatbot..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message de bienvenue
                </label>
                <textarea
                  value={formData.welcomeMessage}
                  onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Bonjour! Comment puis-je vous aider aujourd'hui?"
                />
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Chatbot actif</span>
                </label>
              </div>
            </div>
          </div>

          {/* Intents */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Intents (Intentions)</h2>
              <button
                type="button"
                onClick={addIntent}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Ajouter un Intent
              </button>
            </div>

            {intents.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Aucun intent défini. Cliquez sur "Ajouter un Intent" pour commencer.
              </p>
            ) : (
              <div className="space-y-4">
                {intents.map((intent, intentIndex) => (
                  <div key={intentIndex} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900">Intent #{intentIndex + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeIntent(intentIndex)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom de l'intent
                        </label>
                        <input
                          type="text"
                          value={intent.name}
                          onChange={(e) => updateIntent(intentIndex, 'name', e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                          placeholder="Ex: greeting, booking_help"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Priorité
                        </label>
                        <input
                          type="number"
                          value={intent.priority}
                          onChange={(e) => updateIntent(intentIndex, 'priority', parseInt(e.target.value))}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        />
                      </div>
                    </div>

                    {/* Patterns */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Patterns (mots-clés)
                        </label>
                        <button
                          type="button"
                          onClick={() => addPattern(intentIndex)}
                          className="text-primary-600 text-xs hover:text-primary-700"
                        >
                          + Ajouter
                        </button>
                      </div>
                      {intent.patterns.map((pattern, patternIndex) => (
                        <div key={patternIndex} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={pattern}
                            onChange={(e) => updatePattern(intentIndex, patternIndex, e.target.value)}
                            className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm"
                            placeholder="Ex: bonjour, salut, hello"
                          />
                          <button
                            type="button"
                            onClick={() => removePattern(intentIndex, patternIndex)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Responses */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Réponses
                        </label>
                        <button
                          type="button"
                          onClick={() => addResponse(intentIndex)}
                          className="text-primary-600 text-xs hover:text-primary-700"
                        >
                          + Ajouter
                        </button>
                      </div>
                      {intent.responses.map((response, responseIndex) => (
                        <div key={responseIndex} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={response}
                            onChange={(e) => updateResponse(intentIndex, responseIndex, e.target.value)}
                            className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm"
                            placeholder="Ex: Bonjour! Comment puis-je vous aider?"
                          />
                          <button
                            type="button"
                            onClick={() => removeResponse(intentIndex, responseIndex)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Action (optionnel)
                        </label>
                        <input
                          type="text"
                          value={intent.action || ''}
                          onChange={(e) => updateIntent(intentIndex, 'action', e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                          placeholder="Ex: redirect_to_booking"
                        />
                      </div>
                      <div className="flex items-end">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={intent.isActive}
                            onChange={(e) => updateIntent(intentIndex, 'isActive', e.target.checked)}
                            className="w-4 h-4 text-primary-600"
                          />
                          <span className="text-sm font-medium text-gray-700">Intent actif</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push(`/${locale}/admin/chatbots`)}
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
                  Création...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Créer le chatbot
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
