import useSWR from 'swr';
import axios from 'axios';
import { useState, useCallback } from 'react';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const usePaginatedEvents = (
  page: number,
  limit: number,
  filters: any = {},
  live: boolean = false,
  currentTotal: number | null = null
) => {
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const getQuery = useCallback(
    (page: number, total: number, useTotal: boolean) => {
      const params: any = {
        page: String(page),
        limit: String(limit),
        ...filters,
      };

      if (useTotal && total !== null) {
        params.currentTotal = String(total);
      }

      const query = new URLSearchParams(params).toString();
      console.log('Generated Query:', query);
      return query;
    },
    [filters, limit]
  );

  const { data, error, mutate } = useSWR(
    `/api/events?${getQuery(page, currentTotal, live)}`,
    fetcher,
    {
      refreshInterval: live ? 5000 : 0,
      revalidateOnFocus: live, // Only revalidate on focus if live view is on
      revalidateOnReconnect: live, // Only revalidate on reconnect if live view is on
      dedupingInterval: 5000,
    }
  );

  const fetchMore = useCallback(
    async (nextPage: number) => {
      setIsFetchingMore(true);
      try {
        console.log('Fetching more events for page:', nextPage);
        const response = await fetcher(
          `/api/events?${getQuery(nextPage, currentTotal, false)}`
        );
        setIsFetchingMore(false);
        return response;
      } catch (err) {
        setIsFetchingMore(false);
        throw err;
      }
    },
    [getQuery, currentTotal]
  );

  return {
    events: data?.events || [],
    total: data?.total || 0,
    isLoading: !error && !data,
    isError: error,
    mutate,
    fetchMore,
    isFetchingMore,
  };
};
