'use client';
import { CheckSquare } from 'lucide-react';
export default function FeaturesSection({ formData, setFormData, features }: any) {
  const toggleFeature = (featureId: string) => {
    setFormData((prev: any) => ({
      ...prev,
      selectedFeatureIds: prev.selectedFeatureIds.includes(featureId)
        ? prev.selectedFeatureIds.filter((id: string) => id !== featureId)
        : [...prev.selectedFeatureIds, featureId]
    }));
  };
  const groupedFeatures = features.reduce((acc: any, f: any) => {
    const group = f.group || 'OTHER';
    if (!acc[group]) acc[group] = [];
    acc[group].push(f);
    return acc;
  }, {});
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <CheckSquare className="w-5 h-5" />
        Features & Amenities
      </h2>
      
      {!features || features.length === 0 ? (
        <div className="text-center py-8">
          <CheckSquare className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm">No features available. Please run the seed script:</p>
          <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
            npx tsx prisma/seed-property-features.ts
          </code>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedFeatures).map(([group, groupFeatures]: any) => (
            <div key={group}>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase">{group}</h3>
              <div className="grid grid-cols-3 gap-3">
                {groupFeatures.map((feature: any) => (
                  <label key={feature.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={formData.selectedFeatureIds.includes(feature.id)}
                      onChange={() => toggleFeature(feature.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{feature.key.replace(/-/g, ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
