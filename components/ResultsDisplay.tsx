import React from 'react';
import { ComparisonChart } from './ComparisonChart';
import { ApplianceCard } from './ApplianceCard';
import type { ComparisonResult, ApplianceInput } from '../types';

interface ResultsDisplayProps {
  result: ComparisonResult;
  initialInput: ApplianceInput;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, initialInput }) => {
  const chartData = [
    { name: 'Your Appliance', consumption: initialInput.consumption },
    ...result.map(appliance => ({
      name: `${appliance.brand} ${appliance.model}`,
      consumption: appliance.annualConsumptionKwh,
    })),
  ];

  return (
    <div className="mt-12 space-y-12">
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Comparison Results</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">Here are some energy-efficient alternatives we found for your {initialInput.type}.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-gray-700">Annual Energy Consumption</h3>
        <p className="text-gray-500 mb-6">A visual comparison of your current appliance versus modern, efficient models. Lower is better!</p>
        <ComparisonChart data={chartData} />
      </div>

      <div className="space-y-8">
         <h3 className="text-2xl font-bold text-gray-700 text-center">Recommended Appliances</h3>
        {result.map((appliance, index) => (
          <ApplianceCard key={index} appliance={appliance} oldConsumption={initialInput.consumption}/>
        ))}
      </div>
    </div>
  );
};
