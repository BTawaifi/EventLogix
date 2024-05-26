import React from 'react';
import { Event } from '@/Interfaces/Interfaces';
import ExpandableRow from './ExpandableRow';
import PlaceholderRow from './PlaceholderRow';

interface EventTableBodyProps {
  events: Event[];
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
  liveView: boolean;
}

const EventTableBody: React.FC<EventTableBodyProps> = ({
  events,
  isLoading,
  isError,
  currentPage,
  liveView,
}) => {
  const placeholders = Array.from({ length: 10 }, (_, index) => (
    <PlaceholderRow key={index} />
  ));

  return (
    <tbody>
      {isLoading && currentPage === 1 && !liveView ? (
        placeholders
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
