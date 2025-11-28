'use client';

import { useEffect } from 'react';

export default function ApiDocsPage() {
  useEffect(() => {
    // Charger Swagger UI
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js';
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/swagger-ui-dist@5/swagger-ui.css';
    document.head.appendChild(link);

    script.onload = () => {
      (window as any).SwaggerUIBundle({
        url: '/api/swagger',
        dom_id: '#swagger-ui',
        presets: [
          (window as any).SwaggerUIBundle.presets.apis,
          (window as any).SwaggerUIBundle.SwaggerUIStandalonePreset,
        ],
        layout: 'BaseLayout',
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">📚 JustRichard API Documentation</h1>
          <p className="text-blue-100">API complète pour l'administration - Countries, Languages, Currencies, Cities</p>
        </div>
      </div>
      <div id="swagger-ui"></div>
    </div>
  );
}
