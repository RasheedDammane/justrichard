import { useTranslations } from 'next-intl';

/**
 * Hook for admin translations
 * Usage: const t = useAdminTranslation('dashboard');
 * Then: t('title'), t('welcome', { name: 'John' })
 */
export function useAdminTranslation(namespace?: string) {
  const baseKey = namespace ? `admin.${namespace}` : 'admin';
  return useTranslations(baseKey);
}

/**
 * Hook for common admin translations
 * Usage: const tc = useAdminCommon();
 * Then: tc('add'), tc('edit'), tc('delete')
 */
export function useAdminCommon() {
  return useTranslations('admin.common');
}

/**
 * Hook for admin navigation translations
 * Usage: const tn = useAdminNav();
 * Then: tn('dashboard'), tn('users')
 */
export function useAdminNav() {
  return useTranslations('admin.navigation');
}
