import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'JustRichard Admin API',
        version: '1.0.0',
        description: 'API complète pour l\'administration de JustRichard',
      },
      servers: [
        {
          url: 'http://localhost:3100',
          description: 'Development server',
        },
      ],
      tags: [
        { name: 'Admin - Countries', description: 'Gestion des pays' },
        { name: 'Admin - Languages', description: 'Gestion des langues' },
        { name: 'Admin - Currencies', description: 'Gestion des devises' },
        { name: 'Admin - Cities', description: 'Gestion des villes' },
      ],
      components: {
        schemas: {
          Country: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              code: { type: 'string' },
              name: { type: 'string' },
              nameAr: { type: 'string', nullable: true },
              nameFr: { type: 'string', nullable: true },
              nameTh: { type: 'string', nullable: true },
              flag: { type: 'string', nullable: true },
              dialCode: { type: 'string', nullable: true },
              currency: { type: 'string', nullable: true },
              slug: { type: 'string', nullable: true },
              latitude: { type: 'number', nullable: true },
              longitude: { type: 'number', nullable: true },
              isActive: { type: 'boolean' },
            },
          },
          Language: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              code: { type: 'string' },
              name: { type: 'string' },
              nativeName: { type: 'string' },
              isRTL: { type: 'boolean' },
              isActive: { type: 'boolean' },
              order: { type: 'integer' },
            },
          },
          Currency: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              code: { type: 'string' },
              name: { type: 'string' },
              symbol: { type: 'string' },
              exchangeRate: { type: 'number' },
              isActive: { type: 'boolean' },
              isDefault: { type: 'boolean' },
              decimalPlaces: { type: 'integer' },
            },
          },
          City: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              slug: { type: 'string' },
              countryId: { type: 'string' },
              latitude: { type: 'number', nullable: true },
              longitude: { type: 'number', nullable: true },
              isActive: { type: 'boolean' },
            },
          },
        },
      },
    },
  });
  return spec;
};
