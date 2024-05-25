import React from 'react';
import { Event } from '@/Interfaces/Interfaces';
import EventTableHeader from './EventTableHeader';
import EventTableBody from './EventTableBody';

interface EventTableProps {
  events: Event[];
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
}

const EventTable: React.FC<EventTableProps> = ({
  events,
  isLoading,
  isError,
  currentPage,
}) => {
  return (
    <table
      className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-b-lg overflow-hidden text-black dark:text-white shadow-none"
      style={{ overflow: 'visible', tableLayout: 'fixed' }}
    >
      <EventTableHeader />
      <EventTableBody
        events={events}
        isLoading={isLoading}
        isError={isError}
        currentPage={currentPage}
      />
    </table>
  );
};

export default EventTable;
