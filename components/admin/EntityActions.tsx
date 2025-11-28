'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import Link from 'next/link';

interface EntityActionsProps {
  entity: {
    id: string;
    slug: string;
    name: string;
    isActive?: boolean;
    available?: boolean;
  };
  entityType: 'yachts' | 'properties' | 'providers' | 'doctors' | 'lawyers' | 'coaches' | 'activities' | 'suppliers';
  locale: string;
  viewPath?: string; // Custom view path if different from default
}

export default function EntityActions({ entity, entityType, locale, viewPath }: EntityActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  // Determine the status field name
  const statusField = entity.isActive !== undefined ? 'isActive' : 'available';
  const currentStatus = entity.isActive !== undefined ? entity.isActive : entity.available;

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${entity.name}?`)) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/${entityType}/${entity.id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        router.refresh();
      } else {
        alert(`Error deleting ${entityType.slice(0, -1)}`);
      }
    } catch (error) {
      alert(`Error deleting ${entityType.slice(0, -1)}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleStatus = async () => {
    setIsToggling(true);
    try {
      const res = await fetch(`/api/admin/${entityType}/${entity.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [statusField]: !currentStatus }),
      });
      
      if (res.ok) {
        router.refresh();
      } else {
        alert('Error updating status');
      }
    } catch (error) {
      alert('Error updating status');
    } finally {
      setIsToggling(false);
    }
  };

  // Default view path using slug
  const defaultViewPath = `/${locale}/${entityType}/${entity.slug}`;
  const finalViewPath = viewPath || defaultViewPath;

  return (
    <div className="flex items-center gap-2">
      <Link
        href={finalViewPath}
        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        title="View"
      >
        <Eye className="w-4 h-4" />
      </Link>
      
      <Link
        href={`/${locale}/admin/${entityType}/${entity.id}`}
        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
        title="Edit"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </Link>
      
      <button
        onClick={handleToggleStatus}
        disabled={isToggling}
        className={`p-2 rounded-lg transition-colors ${
          currentStatus 
            ? 'text-green-600 hover:text-orange-600 hover:bg-orange-50' 
            : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
        }`}
        title={currentStatus ? 'Deactivate' : 'Activate'}
      >
        {currentStatus ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
      </button>
      
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
