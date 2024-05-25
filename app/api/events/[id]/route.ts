import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const eventSchema = z.object({
  actorId: z.string().min(1, 'actorId is required'),
  targetId: z.string().min(1, 'targetId is required'),
  actionId: z.string().min(1, 'actionId is required'),
  group: z.string().min(1, 'group is required'),
  location: z.string().min(1, 'location is required'),
  metadata: z.record(z.any()).optional(),
});

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'Event ID is required' },
      { status: 400 }
    );
  }

  const validation = eventSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  const { actorId, targetId, actionId, group, location, metadata } =
    validation.data;

  try {
    const event = await prisma.event.update({
      where: { id: String(id) },
      data: { actorId, targetId, actionId, group, location, metadata },
    });
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'Event ID is required' },
      { status: 400 }
    );
  }

  try {
    await prisma.event.delete({ where: { id: String(id) } });
    return NextResponse.json(
      { message: 'Event deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 400 }
    );
  }
}
