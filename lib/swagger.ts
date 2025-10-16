import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'CommunityHub Platform API',
        version: '1.0.0',
        description: 'API documentation for CommunityHub home services platform',
        contact: {
          name: 'API Support',
          email: 'support@communityhub.com',
        },
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
        {
          url: 'https://communityhub.com',
          description: 'Production server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        schemas: {
          Error: {
            type: 'object',
            properties: {
              success: {
                type: 'boolean',
                example: false,
              },
              message: {
                type: 'string',
                example: 'An error occurred',
              },
              error: {
                type: 'string',
                example: 'Error details',
              },
            },
          },
          User: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: 'clx123abc',
              },
              email: {
                type: 'string',
                format: 'email',
                example: 'user@example.com',
              },
              name: {
                type: 'string',
                example: 'John Doe',
              },
              role: {
                type: 'string',
                enum: ['CUSTOMER', 'PROVIDER', 'ADMIN', 'MANAGER'],
                example: 'CUSTOMER',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
              },
            },
          },
          Service: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: 'clx456def',
              },
              slug: {
                type: 'string',
                example: 'home-cleaning',
              },
              basePrice: {
                type: 'number',
                format: 'float',
                example: 99.99,
              },
              duration: {
                type: 'integer',
                example: 120,
                description: 'Duration in minutes',
              },
              isActive: {
                type: 'boolean',
                example: true,
              },
              rating: {
                type: 'number',
                format: 'float',
                example: 4.5,
              },
            },
          },
          Booking: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: 'clx789ghi',
              },
              userId: {
                type: 'string',
                example: 'clx123abc',
              },
              serviceId: {
                type: 'string',
                example: 'clx456def',
              },
              scheduledDate: {
                type: 'string',
                format: 'date-time',
              },
              scheduledTime: {
                type: 'string',
                example: '14:00',
              },
              status: {
                type: 'string',
                enum: ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REFUNDED'],
                example: 'CONFIRMED',
              },
              total: {
                type: 'number',
                format: 'float',
                example: 104.99,
              },
            },
          },
          ErrorLog: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: 'clx999jkl',
              },
              level: {
                type: 'string',
                enum: ['INFO', 'WARN', 'ERROR', 'DEBUG'],
                example: 'ERROR',
              },
              message: {
                type: 'string',
                example: 'Database connection failed',
              },
              path: {
                type: 'string',
                example: '/api/bookings',
              },
              userId: {
                type: 'string',
                example: 'clx123abc',
              },
              resolved: {
                type: 'boolean',
                example: false,
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
              },
            },
          },
        },
      },
      tags: [
        {
          name: 'Authentication',
          description: 'Authentication endpoints',
        },
        {
          name: 'Services',
          description: 'Service management endpoints',
        },
        {
          name: 'Bookings',
          description: 'Booking management endpoints',
        },
        {
          name: 'Real Estate',
          description: 'Real estate agents and property services',
        },
        {
          name: 'Accounting',
          description: 'Accounting and tax services',
        },
        {
          name: 'Translation',
          description: 'Translation and interpretation services',
        },
        {
          name: 'Visa & Permits',
          description: 'Visa and permit application services',
        },
        {
          name: 'Business Setup',
          description: 'Company formation and business consulting',
        },
        {
          name: 'Architecture',
          description: 'Architecture and design services',
        },
        {
          name: 'Photography',
          description: 'Photography and videography services',
        },
        {
          name: 'Coaching',
          description: 'Professional coaching services',
        },
        {
          name: 'Medical',
          description: 'Doctors and medical services',
        },
        {
          name: 'Dental',
          description: 'Dental services',
        },
        {
          name: 'Legal',
          description: 'Legal and lawyer services',
        },
        {
          name: 'Domestic Services',
          description: 'Domestic workers and home care',
        },
        {
          name: 'Handyman',
          description: 'Handyman and repair services',
        },
        {
          name: 'Vehicles',
          description: 'Vehicle rental services',
        },
        {
          name: 'Transfers',
          description: 'Transfer and transportation services',
        },
        {
          name: 'Admin',
          description: 'Admin endpoints',
        },
        {
          name: 'Logging',
          description: 'Error logging and monitoring endpoints',
        },
      ],
    },
  });
  return spec;
};
