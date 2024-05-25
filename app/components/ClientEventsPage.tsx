'use client';
import React, { useState, useCallback } from 'react';
import { usePaginatedEvents } from '../../hooks/usePaginatedEvents';
import EventTable from '../../ui/EventTable';
import LoadMoreButton from '../../ui/LoadMoreButton';
import { Event } from '@prisma/client';

interface ClientEventsPageProps {
  initialEvents: Event[];
  initialTotal: number;
}

const ITEMS_PER_PAGE = 10;

const ClientEventsPage: React.FC<ClientEventsPageProps> = ({
  initialEvents,
  initialTotal,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [liveView, setLiveView] = useState(false);
  const [allEvents, setAllEvents] = useState<Event[]>(initialEvents);
  const [totalEvents, setTotalEvents] = useState<number>(initialTotal);

  const {
    total,
    isLoading,
    isError,
    fetchMore,
    isFetchingMore,
  } = usePaginatedEvents(
    liveView ? 1 : currentPage,
    ITEMS_PER_PAGE,
    { search: searchQuery, ...filters },
    liveView,
    totalEvents
  );

  const eventExists = useCallback((newEvent: Event, currentEvents: Event[]) => {
    return currentEvents.some((event) => event.id === newEvent.id);
  }, []);

  const loadMore = useCallback(async () => {
    const nextPage = currentPage + 1;
    const newEvents = await fetchMore(nextPage);
    setCurrentPage(nextPage);
    setAllEvents((prevEvents) => {
      const newEventsList = newEvents.events.filter(
        (event) => !eventExists(event, prevEvents)
      );
      return [...prevEvents, ...newEventsList];
    });
  }, [currentPage, fetchMore, eventExists]);

  return (
    <div className="container mx-auto p-4">
      <EventTable
        events={allEvents}
        isLoading={isLoading}
        isError={isError}
        currentPage={currentPage}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
      />
      <LoadMoreButton
        isFetchingMore={isFetchingMore}
        loadMore={loadMore}
        hasMore={currentPage * ITEMS_PER_PAGE < total}
      />
    </div>
  );
};

export default ClientEventsPage;
