#!/usr/bin/env python3
"""
Générateur de formulaires admin multi-tabs
Génère des formulaires TypeScript/React complets pour chaque entité
"""

import os
import json

# Configuration des formulaires
FORMS_CONFIG = {
    'yacht': {
        'path': 'yachts',
        'model': 'Yacht',
        'api': '/api/admin/yachts',
        'title': 'Yacht',
        'tabs': [
            {
                'id': 'basic',
                'label': 'Informations',
                'icon': 'Ship',
                'fields': [
                    {'name': 'name', 'type': 'text', 'label': 'Nom du yacht', 'required': True},
                    {'name': 'slug', 'type': 'text', 'label': 'Slug (URL)', 'required': True, 'auto': True},
                    {'name': 'brand', 'type': 'text', 'label': 'Marque'},
                    {'name': 'model', 'type': 'text', 'label': 'Modèle'},
                    {'name': 'year', 'type': 'number', 'label': 'Année'},
                    {'name': 'manufacturer', 'type': 'text', 'label': 'Fabricant'},
                    {'name': 'countryId', 'type': 'select-country', 'label': 'Pays', 'required': True},
                    {'name': 'cityId', 'type': 'select-city', 'label': 'Ville', 'required': True},
                    {'name': 'location', 'type': 'text', 'label': 'Lieu précis'},
                    {'name': 'isActive', 'type': 'checkbox', 'label': 'Actif', 'default': True},
                    {'name': 'isFeatured', 'type': 'checkbox', 'label': 'Mis en avant'},
                    {'name': 'isAvailable', 'type': 'checkbox', 'label': 'Disponible', 'default': True},
                ]
            },
            # Autres onglets...
        ]
    },
    # Autres formulaires...
}

def generate_form_component(config):
    """Génère le composant React pour un formulaire"""
    form_name = config['model'] + 'Form'
    
    # Template de base
    template = f'''
'use client';

import {{ useState, useEffect }} from 'react';
import {{ useRouter }} from 'next/navigation';
import {{ Save, X, {', '.join([tab['icon'] for tab in config['tabs']])} }} from 'lucide-react';

interface {form_name}Props {{
  locale: string;
  {config['model'].lower()}?: any;
}}

export default function {form_name}({{ locale, {config['model'].lower()} }}: {form_name}Props) {{
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('{config['tabs'][0]['id']}');
  const [countries, setCountries] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  
  // TODO: Add formData state
  // TODO: Add fetch functions
  // TODO: Add handleSubmit
  // TODO: Add handleChange
  // TODO: Add tabs rendering
  // TODO: Add form fields rendering
  
  return (
    <form className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {/* Tabs */}
        </nav>
      </div>
      
      <div className="space-y-6">
        {/* Tab content */}
      </div>
      
      <div className="flex gap-4 pt-6 border-t">
        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg">
          <Save className="w-5 h-5 inline mr-2" />
          Enregistrer
        </button>
        <button type="button" onClick={{() => router.back()}} className="px-6 py-3 border rounded-lg">
          <X className="w-5 h-5 inline mr-2" />
          Annuler
        </button>
      </div>
    </form>
  );
}}
'''
    
    return template

def main():
    print("🚀 Générateur de formulaires admin")
    print("=" * 50)
    
    for form_key, config in FORMS_CONFIG.items():
        print(f"\n📝 Génération: {config['title']} Form")
        print(f"   - Modèle: {config['model']}")
        print(f"   - Onglets: {len(config['tabs'])}")
        print(f"   - Path: app/[locale]/admin/{config['path']}/{config['model']}Form.tsx")
        
        # Générer le composant
        component_code = generate_form_component(config)
        
        # TODO: Écrire le fichier
        # output_path = f"app/[locale]/admin/{config['path']}/{config['model']}Form.tsx"
        # with open(output_path, 'w') as f:
        #     f.write(component_code)
        
        print(f"   ✅ Template généré")
    
    print("\n" + "=" * 50)
    print("✅ Génération terminée!")
    print("\n📋 Prochaines étapes:")
    print("1. Compléter les templates avec les champs spécifiques")
    print("2. Ajouter la logique de soumission")
    print("3. Tester chaque formulaire")

if __name__ == '__main__':
    main()
