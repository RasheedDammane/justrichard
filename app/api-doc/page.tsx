'use client';

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDoc() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">API Documentation</h1>
          <p className="text-primary-100 mt-1">
            Complete API reference for CommunityHub Platform
          </p>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl">
        <SwaggerUI url="/api/doc" />
      </div>
    </div>
  );
}
