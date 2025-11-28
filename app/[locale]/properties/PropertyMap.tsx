'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  propertyName: string;
  address?: string;
}

export default function PropertyMap({ latitude, longitude, propertyName, address }: PropertyMapProps) {
  useEffect(() => {
    // Import Leaflet CSS
    import('leaflet/dist/leaflet.css');
    
    // Fix for default marker icon
    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    });
  }, []);

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            <div className="text-center">
              <strong>{propertyName}</strong>
              {address && <p className="text-sm mt-1">{address}</p>}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
