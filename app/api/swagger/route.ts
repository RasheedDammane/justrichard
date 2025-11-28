import { NextResponse } from 'next/server';

export async function GET() {
  const spec = {
    openapi: '3.0.0',
    info: {
      title: 'JustRichard Admin API',
      version: '1.0.0',
      description: 'API complète - Countries, Languages, Currencies, Cities avec traductions multilingues',
    },
    servers: [{ url: 'http://localhost:3100', description: 'Development' }],
    tags: [
      { name: 'Admin - Countries', description: 'CRUD Pays (16 traductions)' },
      { name: 'Admin - Languages', description: 'CRUD Langues' },
      { name: 'Admin - Currencies', description: 'CRUD Devises' },
      { name: 'Admin - Cities', description: 'CRUD Villes (16 traductions)' },
    ],
    paths: {
      '/api/admin/countries': {
        get: {
          tags: ['Admin - Countries'],
          summary: 'Liste tous les pays',
          parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
            { name: 'search', in: 'query', schema: { type: 'string' } },
          ],
          responses: { '200': { description: 'Liste des pays' } },
        },
        post: {
          tags: ['Admin - Countries'],
          summary: 'Créer un pays',
          responses: { '201': { description: 'Pays créé' } },
        },
      },
      '/api/admin/countries/{id}': {
        get: { tags: ['Admin - Countries'], summary: 'Détails pays' },
        put: { tags: ['Admin - Countries'], summary: 'Modifier pays' },
        delete: { tags: ['Admin - Countries'], summary: 'Supprimer pays' },
      },
      '/api/admin/languages': {
        get: { tags: ['Admin - Languages'], summary: 'Liste langues' },
        post: { tags: ['Admin - Languages'], summary: 'Créer langue' },
      },
      '/api/admin/languages/{id}': {
        get: { tags: ['Admin - Languages'], summary: 'Détails langue' },
        put: { tags: ['Admin - Languages'], summary: 'Modifier langue' },
        delete: { tags: ['Admin - Languages'], summary: 'Supprimer langue' },
      },
      '/api/admin/cities': {
        get: { tags: ['Admin - Cities'], summary: 'Liste villes' },
        post: { tags: ['Admin - Cities'], summary: 'Créer ville' },
      },
      '/api/admin/cities/{id}': {
        get: { tags: ['Admin - Cities'], summary: 'Détails ville' },
        put: { tags: ['Admin - Cities'], summary: 'Modifier ville' },
        delete: { tags: ['Admin - Cities'], summary: 'Supprimer ville' },
      },
    },
    components: {
      schemas: {
        Country: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'TH' },
            name: { type: 'string', example: 'Thailand' },
            flag: { type: 'string', example: '🇹🇭' },
            isActive: { type: 'boolean' },
          },
        },
      },
    },
  };

  return NextResponse.json(spec);
}
