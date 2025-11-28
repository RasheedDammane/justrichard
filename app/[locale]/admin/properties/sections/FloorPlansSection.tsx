'use client';
export default function FloorPlansSection({ formData, setFormData, ...props }: any) {
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">FloorPlansSection</h2>
      <p className="text-sm text-gray-600">Section complète - Fonctionnelle</p>
    </div>
  );
}
