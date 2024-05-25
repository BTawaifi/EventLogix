import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const actionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  object: z.string().min(1, 'Object is required').default('event_action'),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = actionSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  const { name, object } = validation.data;

  try {
    const action = await prisma.action.create({
      data: { name, object },
    });
    return NextResponse.json(action, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create action' },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = url.searchParams.get('page') || '1';
  const limit = url.searchParams.get('limit') || '10';
  const search = url.searchParams.get('search');

  const skip = (Number(page) - 1) * Number(limit);

  const filters: any = {};
  if (search) {
    filters.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { object: { contains: search, mode: 'insensitive' } },
    ];
  }

  try {
    const actions = await prisma.action.findMany({
      where: filters,
      skip,
      take: Number(limit),
      orderBy: { name: 'asc' },
    });

    const totalActions = await prisma.action.count({ where: filters });

    return NextResponse.json({ actions, total: totalActions }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch actions' },
      { status: 400 }
    );
  }
}
