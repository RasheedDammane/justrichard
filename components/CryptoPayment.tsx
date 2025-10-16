'use client';

import { useState } from 'react';
import { Bitcoin, DollarSign, Copy, Check } from 'lucide-react';
import Image from 'next/image';

interface CryptoPaymentProps {
  amount: number;
  bookingId?: string;
  onPaymentInitiated?: (paymentId: string) => void;
}

const cryptocurrencies = [
  { code: 'BTC', name: 'Bitcoin', icon: '₿', color: 'text-orange-500' },
  { code: 'ETH', name: 'Ethereum', icon: 'Ξ', color: 'text-blue-500' },
  { code: 'USDT', name: 'Tether', icon: '₮', color: 'text-green-500' },
  { code: 'BNB', name: 'Binance Coin', icon: 'BNB', color: 'text-yellow-500' },
];

const networks = {
  BTC: ['Bitcoin Mainnet'],
  ETH: ['Ethereum Mainnet', 'Polygon'],
  USDT: ['Ethereum (ERC20)', 'Tron (TRC20)', 'BSC (BEP20)'],
  BNB: ['BSC (BEP20)'],
};

export default function CryptoPayment({
  amount,
  bookingId,
  onPaymentInitiated,
}: CryptoPaymentProps) {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [selectedNetwork, setSelectedNetwork] = useState('Bitcoin Mainnet');
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleInitiatePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/payments/crypto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          cryptocurrency: selectedCrypto,
          amount,
          walletAddress: walletAddress || 'platform-wallet-address',
          network: selectedNetwork,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setPaymentData(data.cryptoPayment);
        if (onPaymentInitiated) {
          onPaymentInitiated(data.cryptoPayment.id);
        }
      } else {
        alert(data.error || 'Erreur lors de l\'initiation du paiement');
      }
    } catch (error) {
      console.error('Error initiating crypto payment:', error);
      alert('Erreur lors de l\'initiation du paiement');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedCryptoData = cryptocurrencies.find(c => c.code === selectedCrypto);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Bitcoin className="w-8 h-8 text-orange-500" />
        <h2 className="text-2xl font-bold">Paiement Crypto</h2>
      </div>

      {!paymentData ? (
        <div className="space-y-6">
          {/* Amount Display */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Montant à payer</p>
            <p className="text-3xl font-bold text-gray-900">{amount.toFixed(2)} MAD</p>
          </div>

          {/* Cryptocurrency Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choisir la cryptomonnaie
            </label>
            <div className="grid grid-cols-2 gap-3">
              {cryptocurrencies.map((crypto) => (
                <button
                  key={crypto.code}
                  onClick={() => {
                    setSelectedCrypto(crypto.code);
                    setSelectedNetwork(networks[crypto.code as keyof typeof networks][0]);
                  }}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    selectedCrypto === crypto.code
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-bold ${crypto.color}`}>
                      {crypto.icon}
                    </span>
                    <div className="text-left">
                      <p className="font-semibold">{crypto.code}</p>
                      <p className="text-xs text-gray-500">{crypto.name}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Network Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Réseau
            </label>
            <select
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              {networks[selectedCrypto as keyof typeof networks].map((network) => (
                <option key={network} value={network}>
                  {network}
                </option>
              ))}
            </select>
          </div>

          {/* Initiate Payment Button */}
          <button
            onClick={handleInitiatePayment}
            disabled={loading}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Initialisation...
              </>
            ) : (
              <>
                <DollarSign className="w-5 h-5" />
                Initier le paiement
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Payment Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800 font-medium mb-2">
              Instructions de paiement
            </p>
            <p className="text-sm text-blue-700">
              Envoyez exactement <strong>{paymentData.amountCrypto.toFixed(8)} {selectedCrypto}</strong> à l'adresse ci-dessous.
            </p>
          </div>

          {/* Crypto Amount */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Montant en {selectedCrypto}</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-900">
                {paymentData.amountCrypto.toFixed(8)} {selectedCrypto}
              </p>
              <span className={`text-3xl ${selectedCryptoData?.color}`}>
                {selectedCryptoData?.icon}
              </span>
            </div>
          </div>

          {/* Wallet Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse du portefeuille
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={paymentData.walletAddress}
                readOnly
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 font-mono text-sm"
              />
              <button
                onClick={() => copyToClipboard(paymentData.walletAddress)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Copié!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span className="text-sm">Copier</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Network Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Réseau:</strong> {paymentData.network}
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Assurez-vous d'envoyer sur le bon réseau pour éviter la perte de fonds.
            </p>
          </div>

          {/* Status */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">En attente de confirmation</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Le paiement sera confirmé après réception de la transaction
            </p>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <p className="text-xs text-gray-600">
          <strong>Note:</strong> Les paiements en cryptomonnaie sont irréversibles. 
          Vérifiez soigneusement l'adresse et le réseau avant d'envoyer.
        </p>
      </div>
    </div>
  );
}
