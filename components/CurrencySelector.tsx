'use client';

import { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';

interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  isDefault: boolean;
}

interface CurrencySelectorProps {
  selectedCurrency?: string;
  onCurrencyChange: (currency: Currency) => void;
  className?: string;
}

export default function CurrencySelector({
  selectedCurrency,
  onCurrencyChange,
  className = '',
}: CurrencySelectorProps) {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Currency | null>(null);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (currencies.length > 0 && !selected) {
      // Set default or first currency
      const defaultCurrency = currencies.find(c => c.isDefault) || currencies[0];
      setSelected(defaultCurrency);
      onCurrencyChange(defaultCurrency);
    }
  }, [currencies]);

  useEffect(() => {
    if (selectedCurrency && currencies.length > 0) {
      const currency = currencies.find(c => c.code === selectedCurrency);
      if (currency) {
        setSelected(currency);
      }
    }
  }, [selectedCurrency, currencies]);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch('/api/admin/currencies?activeOnly=true');
      const data = await response.json();
      if (response.ok) {
        setCurrencies(data.currencies || []);
      }
    } catch (error) {
      console.error('Error fetching currencies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (code: string) => {
    const currency = currencies.find(c => c.code === code);
    if (currency) {
      setSelected(currency);
      onCurrencyChange(currency);
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <DollarSign className="w-5 h-5 text-gray-400 animate-pulse" />
        <span className="text-sm text-gray-400">Chargement...</span>
      </div>
    );
  }

  if (currencies.length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <DollarSign className="w-5 h-5 text-gray-600" />
      <select
        value={selected?.code || ''}
        onChange={(e) => handleChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      >
        {currencies.map((currency) => (
          <option key={currency.id} value={currency.code}>
            {currency.code} ({currency.symbol}) - {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
}
