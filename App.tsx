import React, { useState, useCallback } from 'react';
import { ApplianceForm } from './components/ApplianceForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Header } from './components/Header';
import { fetchApplianceComparison } from './services/geminiService';
import type { ApplianceInput, ComparisonResult } from './types';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialInput, setInitialInput] = useState<ApplianceInput | null>(null);

  const handleCompare = useCallback(async (input: ApplianceInput) => {
    setIsLoading(true);
    setError(null);
    setComparisonResult(null);
    setInitialInput(input);

    try {
      const result = await fetchApplianceComparison(input);
      setComparisonResult(result);
    } catch (err) {
      setError('Failed to fetch appliance comparisons. Please check your input and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <ApplianceForm onCompare={handleCompare} isLoading={isLoading} />

          {isLoading && (
            <div className="mt-8 text-center">
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              </div>
              <p className="mt-4 text-lg text-gray-600">Finding the best appliances for you...</p>
            </div>
          )}

          {error && (
            <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg" role="alert">
              <strong className="font-bold">Oops! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {comparisonResult && initialInput && (
            <ResultsDisplay result={comparisonResult} initialInput={initialInput} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;