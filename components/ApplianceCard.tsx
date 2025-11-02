import React from 'react';
import type { RecommendedAppliance } from '../types';

interface ApplianceCardProps {
  appliance: RecommendedAppliance;
  oldConsumption: number;
}

const PerformanceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3" />
    </svg>
);
const InsightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

export const ApplianceCard: React.FC<ApplianceCardProps> = ({ appliance, oldConsumption }) => {
  const savingsKwh = oldConsumption - appliance.annualConsumptionKwh;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <div className="p-6 md:p-8">
        <div className="md:flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">{appliance.brand}</p>
            <h4 className="text-2xl font-bold text-gray-800 mt-1">{appliance.model}</h4>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right">
            <p className="text-lg font-semibold text-gray-700">{appliance.priceRange}</p>
            <p className="text-sm text-gray-500">Estimated Price (INR)</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center border-t border-b border-gray-200 py-4">
            <div>
                <p className="text-2xl font-bold text-indigo-600">{appliance.annualConsumptionKwh}</p>
                <p className="text-sm text-gray-500">kWh/year</p>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0">
                <p className="text-2xl font-bold text-orange-500">{Math.round(savingsKwh)}</p>
                <p className="text-sm text-gray-500">kWh Saved</p>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0">
                 <p className="text-2xl font-bold text-green-600">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(appliance.annualSavingsInr)}
                 </p>
                 <p className="text-sm text-gray-500">Annual Savings</p>
            </div>
        </div>

        <div className="mt-6 space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 text-indigo-500 pt-1"><PerformanceIcon/></div>
            <div>
              <h5 className="font-semibold text-gray-700">Performance Comparison</h5>
              <p className="text-gray-600">{appliance.performanceComparison}</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 text-indigo-500 pt-1"><InsightIcon/></div>
            <div>
              <h5 className="font-semibold text-gray-700">Energy Saving Insights</h5>
              <p className="text-gray-600">{appliance.energySavingInsights}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};