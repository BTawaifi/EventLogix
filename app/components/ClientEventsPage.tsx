'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { usePaginatedEvents } from '../../hooks/usePaginatedEvents';
import { Event } from '@/Interfaces/Interfaces';
import EventTable from '@/ui/EventTable';
import ExportButton from '@/ui/ExportButton';
import FilterButton from '@/ui/FilterButton';
import LiveViewToggle from '@/ui/LiveViewToggle';
import LoadMoreButton from '@/ui/LoadMoreButton';
import SearchField from '@/ui/SearchField';

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
    events,
    total,
    isLoading,
    isError,
    mutate,
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

  const updateAllEvents = useCallback(
    (newEvents: Event[]) => {
      setAllEvents((prevEvents) => {
        const filteredEvents = newEvents.filter(
          (event) => !eventExists(event, prevEvents)
        );
        return liveView
          ? [...filteredEvents, ...prevEvents]
          : [...prevEvents, ...filteredEvents];
      });
      setTotalEvents(total);
    },
    [eventExists, liveView, total]
  );

  useEffect(() => {
    if (events.length > 0) {
      if (searchQuery && currentPage === 1) {
        setAllEvents(events);
      } else {
        updateAllEvents(events);
      }
    }
  }, [events, searchQuery, currentPage, updateAllEvents]);

  useEffect(() => {
    if (liveView) {
      const interval = setInterval(() => {
        mutate();
      }, 5000);
      return () => clearInterval(interval);
    } else {
      return () => {};
    }
  }, [liveView, mutate]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setFilters({});
    if (query === '') {
      setAllEvents([]);
      setTotalEvents(0);
    }
  }, []);

  const handleApplyFilters = useCallback((newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setAllEvents([]);
  }, []);

  const loadMore = useCallback(async () => {
    const nextPage = currentPage + 1;
    const newEvents = await fetchMore(nextPage);
    setCurrentPage(nextPage);
    setAllEvents((prevEvents) => {
      const newEventsList = newEvents.events.filter(
        (event: Event) => !eventExists(event, prevEvents)
      );
      return [...prevEvents, ...newEventsList];
    });
  }, [currentPage, fetchMore, eventExists]);

  return (
    <div className="container mx-auto p-4">
      <div
        className="bg-gray-100 p-4 rounded-t-lg flex items-center justify-between space-x-4"
        style={{ backgroundColor: 'Whitesmoke' }}
      >
        <SearchField onSearch={handleSearch} />
        <div className="flex items-center space-x-2 m-0" style={{ margin: 0 }}>
          <FilterButton onApplyFilters={handleApplyFilters} />
          <ExportButton data={allEvents} />
          <LiveViewToggle isLive={liveView} onToggle={setLiveView} />
        </div>
      </div>
      <EventTable
        events={allEvents}
        isLoading={isLoading}
        isError={isError}
        liveView={liveView}
        currentPage={currentPage}
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
