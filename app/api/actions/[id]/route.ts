import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const actionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  object: z.string().min(1, 'Object is required').default('event_action'),
});

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Action ID is required' }, { status: 400 });
  }

  const validation = actionSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: validation.error.errors }, { status: 400 });
  }

  const { name, object } = validation.data;

  try {
    const action = await prisma.action.update({
      where: { id: String(id) },
      data: { name, object },
    });
    return NextResponse.json(action, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update action' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Action ID is required' }, { status: 400 });
  }

  try {
    await prisma.action.delete({
      where: { id: String(id) },
    });
    return NextResponse.json({ message: 'Action deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete action' }, { status: 400 });
  }
}

export default function handler(req: NextRequest) {
  const method = req.method;
  switch (method) {
    case 'PUT':
      return PUT(req);
    case 'DELETE':
      return DELETE(req);
    default:
      return NextResponse.json({ error: `Method ${method} Not Allowed` }, { status: 405 });
  }
}
