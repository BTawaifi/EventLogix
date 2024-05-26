import React from 'react';
import { Event } from '@/Interfaces/Interfaces';
import EventTableHeader from './EventTableHeader';
import EventTableBody from './EventTableBody';

interface EventTableProps {
  events: Event[];
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
  liveView: boolean;
}

const EventTable: React.FC<EventTableProps> = ({
  events,
  isLoading,
  isError,
  currentPage,
  liveView,
}) => {
  return (
    <table
      className="min-w-full bg-white dark:bg-gray-800 shadow-md overflow-hidden text-black dark:text-white shadow-none"
      style={{ overflow: 'visible', tableLayout: 'fixed' }}
    >
      <EventTableHeader />
      <EventTableBody
        events={events}
        isLoading={isLoading}
        isError={isError}
        currentPage={currentPage}
        liveView={liveView}
      />
    </table>
  );
};

export default EventTable;
