// components/ServerEventsPage.tsx
import React from 'react';
import ClientEventsPage from './ClientEventsPage';
import prisma from '@/lib/prisma';
import { Event } from '@/Interfaces/Interfaces';

const ServerEventsPage = async () => {
  const page = 1;
  const limit = 10;
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
