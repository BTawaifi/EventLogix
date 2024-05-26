import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { parsePagination, parseDateFilters, parseSearchFilter, parseOtherFilters } from './filters';
import { z } from 'zod';

const eventSchema = z.object({
  actorId: z.string().min(1, 'actorId is required'),
  targetId: z.string().min(1, 'targetId is required'),
  actionId: z.string().min(1, 'actionId is required'),
  group: z.string().min(1, 'group is required'),
  location: z.string().min(1, 'location is required'),
  metadata: z.record(z.any()).optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = eventSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: validation.error.errors }, { status: 400 });
  }

  const { actorId, targetId, actionId, group, location, metadata } = validation.data;

  try {
    const event = await prisma.event.create({
      data: {
        actorId,
        targetId,
        actionId,
        group,
        location,
        metadata: metadata ?? {},
        occurred_at: new Date(),
      },
    });
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = url.searchParams.get('page') || '1';
  const limit = url.searchParams.get('limit') || '10';
  const search = url.searchParams.get('search');
  const actorId = url.searchParams.get('actorId');
  const targetId = url.searchParams.get('targetId');
  const actionId = url.searchParams.get('actionId');
  const currentTotal = url.searchParams.get('currentTotal') || '0';
  const startDate = url.searchParams.get('startDate');
  const endDate = url.searchParams.get('endDate');

  const { skip, take } = parsePagination(page, limit);
  const dateFilters = parseDateFilters(startDate, endDate);
  const searchFilter = parseSearchFilter(search);
  const otherFilters = parseOtherFilters(actorId, targetId, actionId);

  const filters = {
    AND: [
      dateFilters,
      otherFilters,
      ...(searchFilter ? [searchFilter] : []),
    ],
  };

  try {
    const totalEvents = await prisma.event.count({ where: filters });

    if (Number(currentTotal) === totalEvents) {
      return NextResponse.json({ events: [], total: totalEvents });
    }

    const newEventsCount = totalEvents - Number(currentTotal);

    const events = await prisma.event.findMany({
      where: filters,
      skip,
      take: newEventsCount > Number(limit) ? Number(limit) : newEventsCount,
      orderBy: {
        occurred_at: 'desc',
      },
      include: { actor: true, target: true, action: true },
    });

    return NextResponse.json({ events, total: totalEvents });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 400 });
  }
}
