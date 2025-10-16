'use client';

import { useState, useEffect } from 'react';

interface PriceDisplayProps {
  amount: number;
  fromCurrency?: string;
  toCurrency?: string;
  showOriginal?: boolean;
  className?: string;
}

export default function PriceDisplay({
  amount,
  fromCurrency = 'MAD',
  toCurrency,
  showOriginal = false,
  className = '',
}: PriceDisplayProps) {
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [currencySymbol, setCurrencySymbol] = useState('DH');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (toCurrency && toCurrency !== fromCurrency) {
      convertPrice();
    } else {
      setConvertedAmount(amount);
      fetchCurrencySymbol(fromCurrency);
    }
  }, [amount, fromCurrency, toCurrency]);

  const convertPrice = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/convert?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await response.json();
      
      if (response.ok) {
        setConvertedAmount(data.convertedAmount);
        fetchCurrencySymbol(toCurrency!);
      }
    } catch (error) {
      console.error('Error converting price:', error);
      setConvertedAmount(amount);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrencySymbol = async (code: string) => {
    try {
      const response = await fetch('/api/admin/currencies?activeOnly=true');
      const data = await response.json();
      
      if (response.ok) {
        const currency = data.currencies.find((c: any) => c.code === code);
        if (currency) {
          setCurrencySymbol(currency.symbol);
        }
      }
    } catch (error) {
      console.error('Error fetching currency symbol:', error);
    }
  };

  const formatPrice = (value: number, symbol: string) => {
    return `${value.toFixed(2)} ${symbol}`;
  };

  if (loading) {
    return (
      <span className={`animate-pulse ${className}`}>
        Chargement...
      </span>
    );
  }

  return (
    <div className={className}>
      {convertedAmount !== null && (
        <>
          <span className="font-bold">
            {formatPrice(convertedAmount, currencySymbol)}
          </span>
          {showOriginal && toCurrency && toCurrency !== fromCurrency && (
            <span className="text-sm text-gray-500 ml-2">
              ({formatPrice(amount, 'DH')})
            </span>
          )}
        </>
      )}
    </div>
  );
}
