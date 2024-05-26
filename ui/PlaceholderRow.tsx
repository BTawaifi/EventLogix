// components/PlaceholderRow.tsx
import React from 'react';

const PlaceholderRow = () => {
  return (
    <tr className="animate-pulse">
      <td className="py-4 px-4 bg-gray-200">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </td>
      <td className="py-4 px-4 bg-gray-200">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </td>
      <td className="py-4 px-4 bg-gray-200">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </td>
      <td className="py-4 px-4 bg-gray-200"></td>
    </tr>
  );
};

export default PlaceholderRow;
