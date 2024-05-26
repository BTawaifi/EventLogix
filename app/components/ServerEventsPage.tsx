// components/ServerEventsPage.tsx
import React from 'react';
import ClientEventsPage from './ClientEventsPage';
import prisma from '@/lib/prisma';
import { Event } from '@/Interfaces/Interfaces';

const ServerEventsPage = async () => {
  const page = 1;
  const limit = 10;

  // Check if SKIP_DB_CALLS is set
  if (process.env.SKIP_DB_CALLS) {
    // Return an empty list of events if SKIP_DB_CALLS is set
    return <ClientEventsPage initialEvents={[]} initialTotal={0} />;
  }

  const events = await prisma.event.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { occurred_at: 'desc' },
    include: { actor: true, target: true, action: true },
  });
  const total = await prisma.event.count();

  return (
    <ClientEventsPage initialEvents={events as Event[]} initialTotal={total} />
  );
};

export default ServerEventsPage;
