export interface ApplianceInput {
  type: string;
  model: string;
  consumption: number;
  pricePreference: 'similar-higher' | 'lower';
}

export interface RecommendedAppliance {
  brand: string;
  model: string;
  annualConsumptionKwh: number;
  priceRange: string;
  performanceComparison: string;
  energySavingInsights: string;
  annualSavingsInr: number;
}

export type ComparisonResult = RecommendedAppliance[];

export interface ChartData {
  name: string;
  consumption: number;
}