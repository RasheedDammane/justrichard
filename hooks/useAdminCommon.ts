import { useTranslations } from 'next-intl';

export function useAdminCommon() {
  const t = useTranslations('admin.common');
  return (key: string) => t(key);
}
