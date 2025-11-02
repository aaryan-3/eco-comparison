import { GoogleGenAI, Type } from "@google/genai";
import type { ApplianceInput, ComparisonResult } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      brand: {
        type: Type.STRING,
        description: "The brand name of the appliance.",
      },
      model: {
        type: Type.STRING,
        description: "The specific model name or number of the appliance.",
      },
      annualConsumptionKwh: {
        type: Type.NUMBER,
        description: "The estimated annual energy consumption in kilowatt-hours (kWh).",
      },
      priceRange: {
        type: Type.STRING,
        description: "A general price range for the appliance in Indian Rupees (INR), e.g., '₹60,000 - ₹80,000'.",
      },
      performanceComparison: {
        type: Type.STRING,
        description: "A brief summary comparing its performance to a typical older model.",
      },
      energySavingInsights: {
        type: Type.STRING,
        description: "Detailed insights into the technologies or features that contribute to its energy savings.",
      },
      annualSavingsInr: {
          type: Type.NUMBER,
          description: "Estimated annual savings in Indian Rupees (INR), calculated based on kWh savings multiplied by an average electricity cost of ₹8 per kWh."
      }
    },
    required: ["brand", "model", "annualConsumptionKwh", "priceRange", "performanceComparison", "energySavingInsights", "annualSavingsInr"],
  },
};

export async function fetchApplianceComparison(input: ApplianceInput): Promise<ComparisonResult> {
  const pricePrefText = input.pricePreference === 'lower' ? 'a lower price range' : 'a similar or slightly higher price range';

  const prompt = `
    You are an expert on electrical appliances and energy efficiency. 
    A user wants to replace their old appliance.
    Their current appliance is a ${input.type} (model: ${input.model}) with an annual power consumption of ${input.consumption} kWh.
    They are looking for a modern replacement with similar or better performance that is significantly more energy-efficient.
    Their budget preference is '${pricePrefText}'.

    Please provide a list of 3 real, currently available appliance models in India that fit these criteria.
    For each model, provide the requested information in the specified JSON format. Ensure the data is realistic and based on real-world products.
    The insights should be factual and explain the technology clearly (e.g., 'inverter compressor', 'heat pump technology', 'improved insulation').
    
    IMPORTANT: All monetary values must be in Indian Rupees (INR). The priceRange should be in INR. 
    Calculate 'annualSavingsInr' by taking the kWh savings (user's consumption minus the new appliance's consumption) and multiplying it by an average electricity cost of ₹8 per kWh.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        throw new Error("Received an empty response from the API.");
    }
    const result = JSON.parse(jsonText);

    if (!Array.isArray(result) || result.length === 0) {
        throw new Error("API returned no valid appliance suggestions.");
    }
    
    return result as ComparisonResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get appliance data from the AI model.");
  }
}