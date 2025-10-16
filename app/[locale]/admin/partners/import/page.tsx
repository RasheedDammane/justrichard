'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Upload, FileJson, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function ImportPartnersPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  
  const [jsonData, setJsonData] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setJsonData(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleImport = async () => {
    try {
      setLoading(true);
      setResult(null);

      const data = JSON.parse(jsonData);
      
      const response = await fetch('/api/admin/partners/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setResult(result);

      if (response.ok && result.success > 0) {
        setTimeout(() => {
          router.push(`/${locale}/admin/partners`);
        }, 3000);
      }
    } catch (error: any) {
      setResult({
        error: error.message || 'Invalid JSON format',
        success: 0,
        failed: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const exampleJson = {
    partners: [
      {
        name: "Example Partner",
        email: "partner@example.com",
        phone: "+1234567890",
        companyName: "Example LLC",
        type: "COMPANY",
        description: "Professional services provider",
        city: "Dubai",
        country: "UAE",
        commissionRate: 15,
        services: ["deep-cleaning"]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold">Importer des Partenaires (JSON)</h1>
          <p className="text-primary-100 mt-1">Importez plusieurs partenaires en une seule fois</p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Format JSON Requis</h3>
              <p className="text-blue-800 text-sm mb-3">
                Le fichier JSON doit contenir un objet avec une clé "partners" contenant un tableau de partenaires.
              </p>
              <details className="text-sm">
                <summary className="cursor-pointer text-blue-600 font-medium mb-2">
                  Voir l'exemple de format
                </summary>
                <pre className="bg-white p-4 rounded border border-blue-200 overflow-x-auto text-xs">
                  {JSON.stringify(exampleJson, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">1. Charger le fichier JSON</h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
            <FileJson className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 inline-block">
                <Upload className="w-5 h-5 inline mr-2" />
                Choisir un fichier JSON
              </span>
            </label>
            <p className="text-gray-500 text-sm mt-2">ou coller le JSON ci-dessous</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              JSON Data
            </label>
            <textarea
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              className="w-full h-64 border border-gray-300 rounded-lg p-4 font-mono text-sm"
              placeholder="Collez votre JSON ici..."
            />
          </div>
        </div>

        {/* Import Button */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">2. Lancer l'import</h2>
          <button
            onClick={handleImport}
            disabled={!jsonData || loading}
            className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Import en cours...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Importer les Partenaires
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className={`rounded-lg shadow p-6 ${
            result.error ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
          }`}>
            <div className="flex items-start gap-3">
              {result.error ? (
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              )}
              <div className="flex-1">
                <h3 className={`font-semibold mb-2 ${result.error ? 'text-red-900' : 'text-green-900'}`}>
                  {result.error ? 'Erreur d\'import' : 'Import réussi !'}
                </h3>
                
                {result.message && (
                  <p className={`mb-3 ${result.error ? 'text-red-800' : 'text-green-800'}`}>
                    {result.message}
                  </p>
                )}

                {result.success > 0 && (
                  <div className="mb-3">
                    <p className="text-green-800 font-medium">
                      ✓ {result.success} partenaire(s) créé(s) avec succès
                    </p>
                    {result.created && result.created.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {result.created.map((p: any) => (
                          <li key={p.id} className="text-sm text-green-700">
                            • {p.name} ({p.email})
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {result.failed > 0 && (
                  <div className="mb-3">
                    <p className="text-red-800 font-medium">
                      ✗ {result.failed} échec(s)
                    </p>
                    {result.errors && result.errors.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {result.errors.map((error: string, index: number) => (
                          <li key={index} className="text-sm text-red-700">
                            • {error}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {result.success > 0 && !result.error && (
                  <p className="text-green-700 text-sm mt-3">
                    Redirection vers la liste des partenaires dans 3 secondes...
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-6">
          <button
            onClick={() => router.push(`/${locale}/admin/partners`)}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Retour à la liste des partenaires
          </button>
        </div>
      </div>
    </div>
  );
}
