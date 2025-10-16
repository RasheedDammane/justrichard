'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', nativeName: '🇬🇧 English', flag: '🇬🇧' },
  { code: 'ar', name: 'Arabic', nativeName: '🇸🇦 العربية', flag: '🇸🇦' },
  { code: 'fr', name: 'French', nativeName: '🇫🇷 Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', nativeName: '🇪🇸 Español', flag: '🇪🇸' },
  { code: 'de', name: 'German', nativeName: '🇩🇪 Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Russian', nativeName: '🇷🇺 Русский', flag: '🇷🇺' },
  { code: 'th', name: 'Thai', nativeName: '🇹🇭 ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Vietnamese', nativeName: '🇻🇳 Tiếng Việt', flag: '🇻🇳' },
  { code: 'ko', name: 'Korean', nativeName: '🇰🇷 한국어', flag: '🇰🇷' },
];

interface LanguageSelectorProps {
  currentLocale: string;
  className?: string;
}

export default function LanguageSelector({
  currentLocale,
  className = '',
}: LanguageSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  const currentLanguage = languages.find(l => l.code === currentLocale);

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2">
        <Globe className="w-5 h-5 text-gray-600" />
        <select
          value={currentLocale}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.nativeName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
