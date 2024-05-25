import React from 'react';
import { Event } from '@/Interfaces/Interfaces';
import ExpandableRow from './ExpandableRow';
import { ClipLoader } from 'react-spinners';

interface EventTableBodyProps {
  events: Event[];
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
  ITEMS_PER_PAGE: number;
}

const EventTableBody: React.FC<EventTableBodyProps> = ({
  events,
  isLoading,
  isError,
  currentPage,
  ITEMS_PER_PAGE,
}) => {
  return (
    <tbody>
      {isLoading && currentPage === 1 ? (
        <tr>
          <td colSpan={4} className="text-center py-4">
            <ClipLoader color="#F0F0F0" size={35} />
          </td>
        </tr>
      ) : isError ? (
        <tr>
          <td colSpan={4} className="text-center py-4 text-red-500">
            Error loading events.
          </td>
        </tr>
      ) : (
        events.map((event: Event) => (
          <ExpandableRow key={event.id} event={event} />
        ))
      )}
    </tbody>
  );
};

export default EventTableBody;
