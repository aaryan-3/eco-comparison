import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-12">
      <div className="container mx-auto py-4 px-4 md:px-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Eco Appliance Finder. All rights reserved.</p>
        <p className="text-sm mt-1">Data provided for informational purposes. Verify details with manufacturers.</p>
      </div>
    </footer>
  );
};
