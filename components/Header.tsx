import React from 'react';

const BoltIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BoltIcon />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            Eco Appliance Finder
          </h1>
        </div>
        <p className="hidden md:block text-gray-500">Smart comparisons for a greener home.</p>
      </div>
    </header>
  );
};