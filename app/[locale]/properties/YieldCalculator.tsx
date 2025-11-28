'use client';

import { useState } from 'react';

interface YieldCalculatorProps {
  pricePerMonth?: number;
  propertyPrice?: number;
  currency: string;
}

export default function YieldCalculator({ pricePerMonth, propertyPrice, currency }: YieldCalculatorProps) {
  const [purchasePrice, setPurchasePrice] = useState(propertyPrice || 5000000);
  const [monthlyRent, setMonthlyRent] = useState(pricePerMonth || 50000);
  const [occupancyRate, setOccupancyRate] = useState(85);
  const [annualCharges, setAnnualCharges] = useState(50000);

  // Calculs
  const annualRent = monthlyRent * 12 * (occupancyRate / 100);
  const netAnnualRent = annualRent - annualCharges;
  const grossYield = (annualRent / purchasePrice) * 100;
  const netYield = (netAnnualRent / purchasePrice) * 100;
  const monthlyNetIncome = netAnnualRent / 12;
  const roi = purchasePrice / netAnnualRent; // Years to recover investment

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">💰 Simulateur de Rendement Locatif</h3>
      
      {/* Inputs */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prix d'achat ({currency})
          </label>
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loyer mensuel ({currency})
          </label>
          <input
            type="number"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Taux d'occupation (%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={occupancyRate}
            onChange={(e) => setOccupancyRate(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-600 mt-1">{occupancyRate}%</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Charges annuelles ({currency})
          </label>
          <input
            type="number"
            value={annualCharges}
            onChange={(e) => setAnnualCharges(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      {/* Results */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Résultats</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Rendement Brut</div>
            <div className="text-2xl font-bold text-orange-600">{grossYield.toFixed(2)}%</div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Rendement Net</div>
            <div className="text-2xl font-bold text-green-600">{netYield.toFixed(2)}%</div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Revenu Net Mensuel</div>
            <div className="text-xl font-bold text-blue-600">
              {currency === 'THB' ? '฿' : 'AED'} {monthlyNetIncome.toLocaleString()}
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Retour sur Investissement</div>
            <div className="text-xl font-bold text-purple-600">{roi.toFixed(1)} ans</div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Loyer annuel brut:</span>
              <span className="font-semibold">
                {currency === 'THB' ? '฿' : 'AED'} {annualRent.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Charges annuelles:</span>
              <span className="font-semibold text-red-600">
                - {currency === 'THB' ? '฿' : 'AED'} {annualCharges.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-300 pt-2">
              <span className="font-semibold">Revenu net annuel:</span>
              <span className="font-bold text-green-600">
                {currency === 'THB' ? '฿' : 'AED'} {netAnnualRent.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p>* Les calculs sont indicatifs et ne constituent pas un conseil en investissement.</p>
          <p>* Les charges incluent : taxes, assurance, entretien, gestion locative.</p>
        </div>
      </div>
    </div>
  );
}
