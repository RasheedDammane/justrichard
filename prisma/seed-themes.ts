import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultTheme = {
  name: 'JustRichard Default',
  slug: 'justrichard-default',
  description: 'Thème par défaut de JustRichard avec les couleurs de la marque',
  isDefault: true,
  isActive: true,
  config: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      secondary: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      background: {
        light: '#ffffff',
        dark: '#111827',
      },
      text: {
        primary: '#111827',
        secondary: '#6b7280',
        light: '#ffffff',
      },
    },
    typography: {
      fontFamilyBase: 'Inter, system-ui, -apple-system, sans-serif',
      fontFamilyHeading: 'Inter, system-ui, -apple-system, sans-serif',
      fontFamilyMono: 'Menlo, Monaco, Courier New, monospace',
      baseFontSize: 16,
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
    },
    spacing: {
      baseUnit: 4,
      scale: {
        0: '0',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
      },
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      base: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      full: '9999px',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    components: {
      button: {
        paddingX: '1rem',
        paddingY: '0.5rem',
        borderRadius: '0.375rem',
        fontWeight: 500,
      },
      input: {
        paddingX: '0.75rem',
        paddingY: '0.5rem',
        borderRadius: '0.375rem',
        borderWidth: '1px',
      },
      card: {
        padding: '1.5rem',
        borderRadius: '0.5rem',
        shadow: 'base',
      },
    },
  },
};

const darkTheme = {
  name: 'Dark Mode',
  slug: 'dark-mode',
  description: 'Thème sombre pour une meilleure expérience nocturne',
  isDefault: false,
  isActive: true,
  config: {
    ...defaultTheme.config,
    colors: {
      ...defaultTheme.config.colors,
      background: {
        light: '#111827',
        dark: '#030712',
      },
      text: {
        primary: '#f9fafb',
        secondary: '#d1d5db',
        light: '#111827',
      },
    },
  },
};

async function seedThemes() {
  console.log('🎨 Seeding themes...\n');

  try {
    // Create default theme
    const existingDefault = await prisma.theme.findUnique({
      where: { slug: defaultTheme.slug },
    });

    if (!existingDefault) {
      await prisma.theme.create({
        data: defaultTheme,
      });
      console.log(`✅ Created theme: ${defaultTheme.name}`);
    } else {
      console.log(`⏭️  Theme already exists: ${defaultTheme.name}`);
    }

    // Create dark theme
    const existingDark = await prisma.theme.findUnique({
      where: { slug: darkTheme.slug },
    });

    if (!existingDark) {
      await prisma.theme.create({
        data: darkTheme,
      });
      console.log(`✅ Created theme: ${darkTheme.name}`);
    } else {
      console.log(`⏭️  Theme already exists: ${darkTheme.name}`);
    }

    console.log('\n✨ Theme seeding completed!');

    // Display statistics
    const stats = await prisma.theme.count();
    const activeStats = await prisma.theme.count({ where: { isActive: true } });
    console.log(`📊 Total themes: ${stats} (${activeStats} active)`);
  } catch (error) {
    console.error('❌ Error seeding themes:', error);
    throw error;
  }
}

seedThemes()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
