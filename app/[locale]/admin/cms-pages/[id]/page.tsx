import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import {
  FileText,
  Globe,
  Calendar,
  CheckCircle,
  XCircle,
  Edit,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export default async function CMSPageDetailPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin


  const page = await prisma.cMSPage.findUnique({
    where: { id },
    include: {
      translations: true,
    },
  });

  if (!page) {
    notFound();
  }

  const frTranslation = page.translations.find((t) => t.locale === 'fr');
  const enTranslation = page.translations.find((t) => t.locale === 'en');
  const arTranslation = page.translations.find((t) => t.locale === 'ar');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-8 h-8" />
                <h1 className="text-3xl font-bold">
                  {frTranslation?.title || enTranslation?.title || 'Page CMS'}
                </h1>
              </div>
              <code className="text-primary-100 bg-white/10 px-3 py-1 rounded">
                /{page.slug}
              </code>
              <div className="flex items-center gap-3 mt-3">
                {page.isActive ? (
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Active
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    Inactive
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                  {page.translations.length} traduction(s)
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href={`/${locale}/${page.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                Voir la page
              </a>
              <Link
                href={`/${locale}/admin/cms-pages/${id}/edit`}
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 flex items-center gap-2"
              >
                <Edit className="w-5 h-5" />
                Modifier
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Traductions</div>
                <div className="text-3xl font-bold text-primary-600 mt-2">
                  {page.translations.length}
                </div>
              </div>
              <Globe className="w-12 h-12 text-primary-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Créée le</div>
                <div className="text-lg font-bold text-gray-900 mt-2">
                  {new Date(page.createdAt).toLocaleDateString('fr-FR')}
                </div>
              </div>
              <Calendar className="w-12 h-12 text-gray-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Mise à jour</div>
                <div className="text-lg font-bold text-gray-900 mt-2">
                  {new Date(page.updatedAt).toLocaleDateString('fr-FR')}
                </div>
              </div>
              <Calendar className="w-12 h-12 text-gray-200" />
            </div>
          </div>
        </div>

        {/* Translations */}
        <div className="space-y-6">
          {/* French Translation */}
          {frTranslation && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🇫🇷</span>
                <h2 className="text-xl font-bold">Version Française</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Titre</div>
                  <div className="text-lg font-semibold text-gray-900">{frTranslation.title}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Contenu</div>
                  <div className="prose max-w-none bg-gray-50 p-4 rounded-lg">
                    <div dangerouslySetInnerHTML={{ __html: frTranslation.content }} />
                  </div>
                </div>
                {frTranslation.seoTitle && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm font-medium text-gray-500 mb-1">SEO Titre</div>
                    <div className="text-gray-900">{frTranslation.seoTitle}</div>
                  </div>
                )}
                {frTranslation.seoDescription && (
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">SEO Description</div>
                    <div className="text-gray-700">{frTranslation.seoDescription}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* English Translation */}
          {enTranslation && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🇬🇧</span>
                <h2 className="text-xl font-bold">English Version</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Title</div>
                  <div className="text-lg font-semibold text-gray-900">{enTranslation.title}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Content</div>
                  <div className="prose max-w-none bg-gray-50 p-4 rounded-lg">
                    <div dangerouslySetInnerHTML={{ __html: enTranslation.content }} />
                  </div>
                </div>
                {enTranslation.seoTitle && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm font-medium text-gray-500 mb-1">SEO Title</div>
                    <div className="text-gray-900">{enTranslation.seoTitle}</div>
                  </div>
                )}
                {enTranslation.seoDescription && (
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">SEO Description</div>
                    <div className="text-gray-700">{enTranslation.seoDescription}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Arabic Translation */}
          {arTranslation && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🇸🇦</span>
                <h2 className="text-xl font-bold">النسخة العربية</h2>
              </div>
              <div className="space-y-4" dir="rtl">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">العنوان</div>
                  <div className="text-lg font-semibold text-gray-900">{arTranslation.title}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">المحتوى</div>
                  <div className="prose max-w-none bg-gray-50 p-4 rounded-lg">
                    <div dangerouslySetInnerHTML={{ __html: arTranslation.content }} />
                  </div>
                </div>
                {arTranslation.seoTitle && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm font-medium text-gray-500 mb-1">عنوان SEO</div>
                    <div className="text-gray-900">{arTranslation.seoTitle}</div>
                  </div>
                )}
                {arTranslation.seoDescription && (
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">وصف SEO</div>
                    <div className="text-gray-700">{arTranslation.seoDescription}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link
            href={`/${locale}/admin/cms-pages`}
            className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-2"
          >
            ← Retour à la liste des pages
          </Link>
        </div>
      </div>
    </div>
  );
}
