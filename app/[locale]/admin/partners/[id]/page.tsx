import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  FileText,
  MessageSquare,
  Package,
} from 'lucide-react';
import Link from 'next/link';

export default async function PartnerDetailPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin


  const partner = await prisma.partner.findUnique({
    where: { id },
    include: {
      services: {
        include: {
          service: {
            include: {
              translations: {
                where: { locale: 'fr' },
                take: 1,
              },
            },
          },
        },
      },
      documents: true,
      chatbots: true,
      _count: {
        select: {
          services: true,
          documents: true,
          chatbots: true,
        },
      },
    },
  });

  if (!partner) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'SUSPENDED':
        return 'bg-red-100 text-red-800';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              {partner.logo ? (
                <img src={partner.logo} alt={partner.name} className="w-20 h-20 rounded-lg bg-white" />
              ) : (
                <div className="w-20 h-20 rounded-lg bg-white flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-primary-600" />
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold">{partner.name}</h1>
                {partner.companyName && (
                  <p className="text-primary-100 mt-1">{partner.companyName}</p>
                )}
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      partner.status
                    )}`}
                  >
                    {partner.status}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                    {partner.type}
                  </span>
                  {partner.isVerified && (
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-800 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Vérifié
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/${locale}/admin/partners/${id}/documents`}
                className="bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 flex items-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Documents ({partner._count.documents})
              </Link>
              <Link
                href={`/${locale}/admin/partners/${id}/edit`}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Services</div>
                <div className="text-3xl font-bold text-primary-600 mt-2">
                  {partner._count.services}
                </div>
              </div>
              <Package className="w-12 h-12 text-primary-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Documents</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">
                  {partner._count.documents}
                </div>
              </div>
              <FileText className="w-12 h-12 text-blue-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Chatbots</div>
                <div className="text-3xl font-bold text-green-600 mt-2">
                  {partner._count.chatbots}
                </div>
              </div>
              <MessageSquare className="w-12 h-12 text-green-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Revenu Total</div>
                <div className="text-3xl font-bold text-purple-600 mt-2">
                  ${partner.totalRevenue.toFixed(0)}
                </div>
              </div>
              <DollarSign className="w-12 h-12 text-purple-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Informations de contact</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{partner.email}</div>
                  </div>
                </div>
                {partner.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Téléphone</div>
                      <div className="font-medium">{partner.phone}</div>
                    </div>
                  </div>
                )}
                {partner.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Site web</div>
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary-600 hover:underline"
                      >
                        {partner.website}
                      </a>
                    </div>
                  </div>
                )}
                {(partner.address || partner.city || partner.country) && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Adresse</div>
                      <div className="font-medium">
                        {partner.address && <div>{partner.address}</div>}
                        {(partner.city || partner.country) && (
                          <div>
                            {partner.city}
                            {partner.city && partner.country && ', '}
                            {partner.country}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {partner.description && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Description</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{partner.description}</p>
              </div>
            )}

            {/* Services */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Services proposés</h2>
              {partner.services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {partner.services.map((ps) => (
                    <div
                      key={ps.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary-300"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">
                            {ps.service.translations[0]?.name || ps.service.slug}
                          </h3>
                          {ps.customPrice && (
                            <p className="text-sm text-gray-500 mt-1">
                              Prix personnalisé: ${ps.customPrice}
                            </p>
                          )}
                        </div>
                        {ps.isActive ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Aucun service associé</p>
              )}
            </div>

            {/* Documents */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Documents</h2>
              {partner.documents.length > 0 ? (
                <div className="space-y-3">
                  {partner.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-gray-500">Type: {doc.type}</div>
                          {doc.expiresAt && (
                            <div className="text-sm text-gray-500">
                              Expire le: {new Date(doc.expiresAt).toLocaleDateString('fr-FR')}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.isVerified ? (
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                            Vérifié
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                            En attente
                          </span>
                        )}
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          Voir
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Aucun document</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Financial Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Informations financières</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Taux de commission</div>
                  <div className="text-2xl font-bold text-primary-600">
                    {partner.commissionRate}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Revenu total</div>
                  <div className="text-2xl font-bold">${partner.totalRevenue.toFixed(2)}</div>
                </div>
                {partner.taxId && (
                  <div>
                    <div className="text-sm text-gray-500">Numéro fiscal</div>
                    <div className="font-medium">{partner.taxId}</div>
                  </div>
                )}
                {partner.bankAccount && (
                  <div>
                    <div className="text-sm text-gray-500">Compte bancaire</div>
                    <div className="font-mono text-sm">{partner.bankAccount}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Dates */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Dates importantes</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Créé le</div>
                    <div className="font-medium">
                      {new Date(partner.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
                {partner.onboardedAt && (
                  <div className="flex items-start gap-2">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Onboardé le</div>
                      <div className="font-medium">
                        {new Date(partner.onboardedAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                )}
                {partner.verifiedAt && (
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Vérifié le</div>
                      <div className="font-medium">
                        {new Date(partner.verifiedAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Chatbots */}
            {partner.chatbots.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Chatbots</h2>
                <div className="space-y-2">
                  {partner.chatbots.map((chatbot) => (
                    <div key={chatbot.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="font-medium">{chatbot.name}</div>
                      <div className="text-sm text-gray-500">{chatbot.type}</div>
                      {chatbot.isActive ? (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full mt-2 inline-block">
                          Actif
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full mt-2 inline-block">
                          Inactif
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link
            href={`/${locale}/admin/partners`}
            className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-2"
          >
            ← Retour à la liste des partenaires
          </Link>
        </div>
      </div>
    </div>
  );
}
