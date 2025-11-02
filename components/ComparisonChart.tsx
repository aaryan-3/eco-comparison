import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ChartData } from '../types';

interface ComparisonChartProps {
  data: ChartData[];
}

export const ComparisonChart: React.FC<ComparisonChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 60, // Increased bottom margin for tilted labels
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            angle={-25} // Tilt labels
            textAnchor="end" // Anchor them at the end
            height={70} // Allocate more height for labels
            interval={0} // Ensure all labels are shown
            tick={{ fontSize: 12, fill: '#4A5568' }}
          />
          <YAxis 
            label={{ value: 'kWh / year', angle: -90, position: 'insideLeft', fill: '#4A5568' }}
            tick={{ fontSize: 12, fill: '#4A5568' }} 
          />
          <Tooltip
            cursor={{ fill: 'rgba(165, 180, 252, 0.5)' }}
            contentStyle={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
            }}
          />
          <Legend wrapperStyle={{paddingTop: '30px'}}/>
          <Bar dataKey="consumption" name="Annual Consumption (kWh)" fill="#6366F1" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};