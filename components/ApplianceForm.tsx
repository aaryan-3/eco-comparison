import React, { useState } from 'react';
import type { ApplianceInput } from '../types';

interface ApplianceFormProps {
  onCompare: (input: ApplianceInput) => void;
  isLoading: boolean;
}

const applianceTypes = [
  'Refrigerator',
  'Washing Machine',
  'Dishwasher',
  'Air Conditioner',
  'Dryer',
  'Television',
  'Other',
];

export const ApplianceForm: React.FC<ApplianceFormProps> = ({ onCompare, isLoading }) => {
  const [type, setType] = useState(applianceTypes[0]);
  const [otherType, setOtherType] = useState('');
  const [model, setModel] = useState('');
  const [consumption, setConsumption] = useState('');
  const [pricePreference, setPricePreference] = useState<'similar-higher' | 'lower'>('similar-higher');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!model.trim() || !consumption) {
      setError('Please fill out all required fields.');
      return;
    }
    if (type === 'Other' && !otherType.trim()) {
      setError('Please specify the appliance type.');
      return;
    }
    const consumptionValue = parseFloat(consumption);
    if (isNaN(consumptionValue) || consumptionValue <= 0) {
      setError('Please enter a valid, positive number for consumption.');
      return;
    }
    setError('');
    onCompare({
      type: type === 'Other' ? otherType : type,
      model,
      consumption: consumptionValue,
      pricePreference,
    });
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-gray-700">Tell us about your current appliance</h2>
      <p className="text-gray-500 mb-6">We'll find you modern, energy-efficient alternatives.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="appliance-type" className="block text-sm font-medium text-gray-700 mb-1">Appliance Type</label>
            <select id="appliance-type" value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition">
              {applianceTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="appliance-model" className="block text-sm font-medium text-gray-700 mb-1">Brand & Model (e.g., Samsung RF28)</label>
            <input type="text" id="appliance-model" value={model} onChange={(e) => setModel(e.target.value)} className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="Your appliance model" />
          </div>
        </div>

        {type === 'Other' && (
            <div>
                <label htmlFor="other-appliance-type" className="block text-sm font-medium text-gray-700 mb-1">Please Specify Appliance Type</label>
                <input
                    type="text"
                    id="other-appliance-type"
                    value={otherType}
                    onChange={(e) => setOtherType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="e.g., Microwave Oven"
                />
            </div>
        )}

        <div>
          <label htmlFor="consumption" className="block text-sm font-medium text-gray-700 mb-1">Annual Power Consumption (kWh/year)</label>
          <input type="number" id="consumption" value={consumption} onChange={(e) => setConsumption(e.target.value)} className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="e.g., 750" />
          <p className="text-xs text-gray-500 mt-1">Check the EnergyGuide label or manufacturer's website.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Preference for New Appliance</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="pricePreference" value="similar-higher" checked={pricePreference === 'similar-higher'} onChange={() => setPricePreference('similar-higher')} className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
              <span className="text-gray-700">Similar / Higher Price</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="pricePreference" value="lower" checked={pricePreference === 'lower'} onChange={() => setPricePreference('lower')} className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
              <span className="text-gray-700">Lower Price</span>
            </label>
          </div>
        </div>

        <div className="pt-2">
          <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
            {isLoading ? 'Analyzing...' : 'Find Better Appliances'}
          </button>
        </div>
      </form>
    </div>
  );
};