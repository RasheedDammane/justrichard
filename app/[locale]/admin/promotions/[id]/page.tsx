import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';
import {
  Tag,
  Percent,
  DollarSign,
  Calendar,
  Users,
  TrendingUp,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

export default async function PromotionDetailPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
    redirect(`/${locale}/auth/login`);
  }

  const promotion = await prisma.promotion.findUnique({
    where: { id },
  });

  if (!promotion) {
    notFound();
  }

  const now = new Date();
  
  const getStatus = () => {
    if (!promotion.isActive) return { 
      label: 'Inactif', 
      color: 'bg-gray-100 text-gray-800',
      icon: XCircle,
      description: 'Cette promotion est désactivée'
    };
    if (now < promotion.startsAt) return { 
      label: 'Programmé', 
      color: 'bg-blue-100 text-blue-800',
      icon: Clock,
      description: 'Cette promotion démarrera bientôt'
    };
    if (now > promotion.expiresAt) return { 
      label: 'Expiré', 
      color: 'bg-red-100 text-red-800',
      icon: XCircle,
      description: 'Cette promotion a expiré'
    };
    if (promotion.usageLimit && promotion.usageCount >= promotion.usageLimit) return { 
      label: 'Limite atteinte', 
      color: 'bg-orange-100 text-orange-800',
      icon: AlertCircle,
      description: 'La limite d\'utilisation a été atteinte'
    };
    return { 
      label: 'Actif', 
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle,
      description: 'Cette promotion est active et utilisable'
    };
  };

  const status = getStatus();
  const StatusIcon = status.icon;
  
  const daysRemaining = Math.ceil((promotion.expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const usagePercentage = promotion.usageLimit 
    ? Math.min((promotion.usageCount / promotion.usageLimit) * 100, 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Tag className="w-8 h-8" />
                <h1 className="text-4xl font-bold font-mono">{promotion.code}</h1>
              </div>
              <p className="text-primary-100 mt-1">{status.description}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status.color} flex items-center gap-1`}>
                  <StatusIcon className="w-4 h-4" />
                  {status.label}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-800">
                  {promotion.type === 'PERCENTAGE' ? 'Pourcentage' : 'Montant fixe'}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/${locale}/admin/promotions/${id}/edit`}
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
                <div className="text-gray-500 text-sm font-medium">Valeur</div>
                <div className="text-3xl font-bold text-primary-600 mt-2">
                  {promotion.type === 'PERCENTAGE' ? (
                    <span className="flex items-center gap-1">
                      {promotion.value}
                      <Percent className="w-6 h-6" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-6 h-6" />
                      {promotion.value}
                    </span>
                  )}
                </div>
              </div>
              {promotion.type === 'PERCENTAGE' ? (
                <Percent className="w-12 h-12 text-primary-200" />
              ) : (
                <DollarSign className="w-12 h-12 text-primary-200" />
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Utilisations</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">
                  {promotion.usageCount}
                  {promotion.usageLimit && <span className="text-lg text-gray-400"> / {promotion.usageLimit}</span>}
                </div>
              </div>
              <Users className="w-12 h-12 text-blue-200" />
            </div>
            {promotion.usageLimit && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all" 
                    style={{ width: `${usagePercentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Jours restants</div>
                <div className="text-3xl font-bold text-green-600 mt-2">
                  {daysRemaining > 0 ? daysRemaining : 0}
                </div>
              </div>
              <Calendar className="w-12 h-12 text-green-200" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Taux d'utilisation</div>
                <div className="text-3xl font-bold text-purple-600 mt-2">
                  {promotion.usageLimit 
                    ? `${usagePercentage.toFixed(0)}%`
                    : '∞'
                  }
                </div>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Détails de la réduction */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Détails de la réduction</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-primary-50 rounded-lg">
                  {promotion.type === 'PERCENTAGE' ? (
                    <Percent className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  ) : (
                    <DollarSign className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  )}
                  <div>
                    <div className="font-semibold text-gray-900">
                      {promotion.type === 'PERCENTAGE' 
                        ? `Réduction de ${promotion.value}%`
                        : `Réduction de $${promotion.value}`
                      }
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {promotion.type === 'PERCENTAGE' 
                        ? 'Pourcentage appliqué sur le montant total'
                        : 'Montant fixe déduit du total'
                      }
                    </div>
                  </div>
                </div>

                {promotion.minAmount && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">Montant minimum</div>
                      <div className="text-sm text-gray-600">${promotion.minAmount}</div>
                    </div>
                  </div>
                )}

                {promotion.maxDiscount && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">Réduction maximale</div>
                      <div className="text-sm text-gray-600">${promotion.maxDiscount}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Période de validité */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Période de validité</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">Date de début</div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">
                        {promotion.startsAt.toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">Date de fin</div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">
                        {promotion.expiresAt.toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Durée totale: <span className="font-medium">
                      {Math.ceil((promotion.expiresAt.getTime() - promotion.startsAt.getTime()) / (1000 * 60 * 60 * 24))} jours
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistiques d'utilisation */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Utilisation</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Utilisations actuelles</div>
                  <div className="text-2xl font-bold text-blue-600">{promotion.usageCount}</div>
                </div>
                {promotion.usageLimit && (
                  <>
                    <div>
                      <div className="text-sm text-gray-500">Limite d'utilisation</div>
                      <div className="text-2xl font-bold">{promotion.usageLimit}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Utilisations restantes</div>
                      <div className="text-2xl font-bold text-green-600">
                        {Math.max(0, promotion.usageLimit - promotion.usageCount)}
                      </div>
                    </div>
                  </>
                )}
                {!promotion.usageLimit && (
                  <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                    Aucune limite d'utilisation définie
                  </div>
                )}
              </div>
            </div>

            {/* Dates importantes */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Dates importantes</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Créé le</div>
                    <div className="font-medium">
                      {promotion.createdAt.toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Mis à jour le</div>
                    <div className="font-medium">
                      {promotion.updatedAt.toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link
            href={`/${locale}/admin/promotions`}
            className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-2"
          >
            ← Retour à la liste des promotions
          </Link>
        </div>
      </div>
    </div>
  );
}
