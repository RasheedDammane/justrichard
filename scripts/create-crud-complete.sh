#!/bin/bash

echo "🚀 Création du CRUD complet pour toutes les entités..."
echo ""

# ============================================
# 1. MAIDS - New, Edit, API
# ============================================
echo "📝 1. Création MAIDS..."

# Maid Form
mkdir -p app/\[locale\]/admin/maids
cat > app/\[locale\]/admin/maids/MaidForm.tsx << 'EOFFORM'
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';

interface MaidFormProps {
  locale: string;
  maid?: any;
}

export default function MaidForm({ locale, maid }: MaidFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    name: maid?.name || '',
    slug: maid?.slug || '',
    refNo: maid?.refNo || '',
    nationality: maid?.nationality || '',
    age: maid?.age || 25,
    sex: maid?.sex || 'Female',
    yearsOfExperience: maid?.yearsOfExperience || 0,
    monthlyFee: maid?.monthlyFee || '',
    currency: maid?.currency || 'AED',
    countryId: maid?.countryId || '',
    cityId: maid?.cityId || '',
    phone: maid?.phone || '',
    email: maid?.email || '',
    englishLevel: maid?.englishLevel || '',
    arabicLevel: maid?.arabicLevel || '',
    isActive: maid?.isActive ?? true,
    isFeatured: maid?.isFeatured ?? false,
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (formData.countryId) {
      fetchCities(formData.countryId);
    }
  }, [formData.countryId]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('/api/countries');
      if (response.ok) {
        const data = await response.json();
        setCountries(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchCities = async (countryId: string) => {
    try {
      const response = await fetch(`/api/cities?countryId=${countryId}`);
      if (response.ok) {
        const data = await response.json();
        setCities(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = maid ? `/api/admin/maids/${maid.id}` : '/api/admin/maids';
      const method = maid ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/${locale}/admin/maids`);
        router.refresh();
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.message || 'Erreur lors de la sauvegarde'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'name' && !maid) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, name: value, slug }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
          <input type="text" name="slug" value={formData.slug} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ref No</label>
          <input type="text" name="refNo" value={formData.refNo} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nationalité *</label>
          <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Âge *</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sexe</label>
          <select name="sex" value={formData.sex} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg">
            <option value="Female">Femme</option>
            <option value="Male">Homme</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Années d'expérience</label>
          <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Salaire mensuel</label>
          <input type="number" name="monthlyFee" value={formData.monthlyFee} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pays *</label>
          <select name="countryId" value={formData.countryId} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded-lg">
            <option value="">Sélectionner</option>
            {countries.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
          <select name="cityId" value={formData.cityId} onChange={handleChange} required
            disabled={!formData.countryId} className="w-full px-4 py-2 border rounded-lg">
            <option value="">Sélectionner</option>
            {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Niveau d'anglais</label>
          <select name="englishLevel" value={formData.englishLevel} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg">
            <option value="">Sélectionner</option>
            <option value="None">Aucun</option>
            <option value="Basic">Basique</option>
            <option value="Good">Bon</option>
            <option value="Fluent">Courant</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Niveau d'arabe</label>
          <select name="arabicLevel" value={formData.arabicLevel} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg">
            <option value="">Sélectionner</option>
            <option value="None">Aucun</option>
            <option value="Basic">Basique</option>
            <option value="Good">Bon</option>
            <option value="Fluent">Courant</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center">
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange}
            className="w-4 h-4 text-blue-600 rounded" />
          <span className="ml-2 text-sm">Active</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange}
            className="w-4 h-4 text-blue-600 rounded" />
          <span className="ml-2 text-sm">Mise en avant</span>
        </label>
      </div>

      <div className="flex gap-4 pt-6 border-t">
        <button type="submit" disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
          <Save className="w-5 h-5" />
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-gray-50">
          <X className="w-5 h-5" />
          Annuler
        </button>
      </div>
    </form>
  );
}
EOFFORM

# Maid New Page
mkdir -p app/\[locale\]/admin/maids/new
cat > app/\[locale\]/admin/maids/new/page.tsx << 'EOFPAGE'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminLayout from '@/components/admin/AdminLayout';
import MaidForm from '@/app/[locale]/admin/maids/MaidForm';

export default async function NewMaidPage({ params: { locale } }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
    redirect(`/${locale}/auth/login`);
  }

  return (
    <AdminLayout locale={locale} userName={session.user.name || undefined} userRole={session.user.role}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouvelle Maid</h1>
          <p className="text-gray-600 mt-1">Ajouter une nouvelle maid au système</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <MaidForm locale={locale} />
        </div>
      </div>
    </AdminLayout>
  );
}
EOFPAGE

# Maid Edit Page
mkdir -p app/\[locale\]/admin/maids/\[id\]
cat > app/\[locale\]/admin/maids/\[id\]/page.tsx << 'EOFPAGE'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminLayout from '@/components/admin/AdminLayout';
import MaidForm from '@/app/[locale]/admin/maids/MaidForm';
import { prisma } from '@/lib/prisma';

export default async function EditMaidPage({ 
  params: { locale, id } 
}: { 
  params: { locale: string; id: string } 
}) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
    redirect(`/${locale}/auth/login`);
  }

  const maid = await prisma.maid.findUnique({
    where: { id },
  });

  if (!maid) {
    redirect(`/${locale}/admin/maids`);
  }

  return (
    <AdminLayout locale={locale} userName={session.user.name || undefined} userRole={session.user.role}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Modifier Maid</h1>
          <p className="text-gray-600 mt-1">{maid.name}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <MaidForm locale={locale} maid={maid} />
        </div>
      </div>
    </AdminLayout>
  );
}
EOFPAGE

# Maid API Route
mkdir -p app/api/admin/maids
cat > app/api/admin/maids/route.ts << 'EOFAPI'
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const maid = await prisma.maid.create({
      data: {
        id: nanoid(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(maid);
  } catch (error: any) {
    console.error('Error creating maid:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
EOFAPI

mkdir -p app/api/admin/maids/\[id\]
cat > app/api/admin/maids/\[id\]/route.ts << 'EOFAPI'
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const maid = await prisma.maid.update({
      where: { id: params.id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(maid);
  } catch (error: any) {
    console.error('Error updating maid:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.maid.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting maid:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
EOFAPI

echo "✅ MAIDS: Form, New, Edit, API créés"
echo ""

echo "🎉 CRUD complet créé pour MAIDS!"
echo ""
echo "URLs disponibles:"
echo "  - Liste: http://localhost:3100/en/admin/maids"
echo "  - New: http://localhost:3100/en/admin/maids/new"
echo "  - Edit: http://localhost:3100/en/admin/maids/[id]"
echo ""
echo "API Routes:"
echo "  - POST /api/admin/maids"
echo "  - PUT /api/admin/maids/[id]"
echo "  - DELETE /api/admin/maids/[id]"
EOF

chmod +x scripts/create-crud-complete.sh
./scripts/create-crud-complete.sh
