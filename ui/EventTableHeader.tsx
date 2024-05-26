import React from 'react';

const EventTableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="bg-gray-100">
        <th
          className="py-2 px-4 text-left text-gray-600"
          style={{ width: '15.5em' }}
        >
          ACTOR
        </th>
        <th
          className="py-2 px-4 text-left text-gray-600"
          style={{ width: '15em' }}
        >
          ACTION
        </th>
        <th
          className="py-2 px-4 text-left text-gray-600"
          style={{ width: '9.5em' }}
        >
          DATE
        </th>
        <th className="py-2 px-4 text-right" style={{ width: '1em' }}></th>
      </tr>
    </thead>
  );
};

export default EventTableHeader;
